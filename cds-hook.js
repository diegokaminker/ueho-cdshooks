const express = require('express');
const moment = require('moment');
const fetch = require('node-fetch');
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser');
const cors = require('cors');
const conocimiento = require ('./grundy');
const app = express();

console.log(process.cwd());

// Services
const services = {
  "services": [
    {
      "name": "Demo CDS Hook UEHO",
      "title": "Demo CDS Hook UEHO",
      "id": "ueho-cds-hooks",
      "description": "Calcula riesgo cardíaco de un paciente según Grundy et al, 1999",
      "hook": "patient-view"
    }
  ]
};

const CrearTarjeta = (recoms) =>
{

  if (recoms.rtr === undefined)
    return { "cards": [] };

  var rtrMessage = "El indice de Grundy para este paciente es " +recoms.rtr.score +" (" + recoms.rtr.status +") "+recoms.rtr.recommendation;
  
  var cards = {
    "cards": [
      {
        "summary": "Riesgo de Enfermedad Cardiaca según Grundy",
        "detail": rtrMessage,
        "source": {
          "label": "https://www.ahajournals.org/doi/10.1161/01.cir.100.13.1481"
        },
        "indicator": recoms.rtr.Indicador
        /*,
        Si quiero puedo agregar sugerencias y acciones, pero no quiero
        "suggestions": [
          

            {
              "summary": "Recomendación habitual para riesgo alto",
              "indicator": "warning",
              "detail": "Se recomienda medicación anticolesterol alto, profilaxis con aspirina (aunque ya no), y control de glucemia y presión arterial.",
              "suggestions": [
                {
                  "label": "Control de Glucemia, Dieta, Control de Colesterol y Presión Arterial",
                }
              ]
            }
          
        ]
        */
      }
    ]
  }

  return (cards);
};

const buildObsURL = (server,patientId, text) => `${server}/Observation?patient=${patientId}&code:text=${text}&_sort:desc=date&_count=1`;
const buildPatientURL = (server,patientId) => `${server}/Patient/${patientId}`;
const buildCondURL = (server,patientId, text) => `${server}/Condition?patient=${patientId}&code:text=${text}&_count=1`;

const getAsync = async (url) => await (await fetch(url)).json();

app.use(cors());
app.use(bodyParser.json());

app.get('/', asyncHandler(async (req, res, next) => {
  res.send('El servicio CDS Hooks está activo!');
}));

app.get('/cds-services', asyncHandler(async (req, res, next) => {
  res.send(services);
}));

/*
 * Logica del CDS Hook
 */
app.post('/cds-services/ueho-cds-hooks', asyncHandler(async (req, res, next) =>
{
  console.log("CDS Request: \n" + JSON.stringify(req.body, null, ' '));

  // Extracts useful information from the data sent from the Sandbox
  const hook = req.body.hook; // Type of hook
  const fhirServer = req.body.fhirServer; // URL for FHIR Server endpoint
  const patient = req.body.context.patientId; // Patient Identifier

  console.log("Useful parameters:");
  console.log("hook: " + hook);
  console.log("fhirServer: " + fhirServer);
  console.log("patient: " + patient);
  //Requerimientos para calcular Grundy
  //Edad
  //Diabetes
  //Status de Fumador/a
  //Colesterol Total
  //HDL Colesterol
  //Presion Arterial: Sistolica

  //Como se que lo que busco lo voy a encontrar, y que va a tener la forma que yo espero
  //Porque 'teoricamente' los recursos cumplen con terminologia y estructura de FHIR R4-Perfil US CORE
  
  const patientReq = await getAsync(buildPatientURL(fhirServer,patient));
  //Esta es la unica que es una Condition
  const DiabetesReq=await getAsync(buildCondURL(fhirServer,patient, 'diabetes'));
  const diab=(DiabetesReq.total>0);
  //Las demas son Observation (Colesterol, LDL, Presion Sist/Diast, Fumador)
  const HDLChol = await getAsync(buildObsURL(fhirServer,patient,'High Density Lipoprotein Cholesterol'));
  const TotChol = await getAsync(buildObsURL(fhirServer,patient,'Total Cholesterol'));
  const Fumador = await getAsync(buildObsURL(fhirServer,patient,'Tobacco Smoking Status NHIS'));
  const Presion = await getAsync(buildObsURL(fhirServer,patient,'Blood Pressure'));
 //Seguro que tiene sexo y fecha de nacimiento, calculo edad
  const sexo = patientReq.gender;
  const birthDate = patientReq.birthDate;
  const edad = moment().diff(birthDate, 'years');
  var valorHDL=0;
  if (HDLChol.entry)
  {
   valorHDL = HDLChol.entry[0].resource.valueQuantity.value;
  }
  var valorCOL=0
  if (TotChol.entry)
  {
    valorCOL=TotChol.entry[0].resource.valueQuantity.value;
  }
  var Sistolica=0;
  
  if (Presion.entry)
  {
    if (Presion.entry[0].resource.component[1])
    {
      Sistolica=Presion.entry[0].resource.component[1].valueQuantity.value;
    }
  }
  /*
  The following smoking status value set of SNOMED CT®  codes, using the preferred concept term, is only required in the context of using the Common Clinical Data Set (CCDS):
  Current every day smoker. 449868002
  Current some day smoker. 428041000124106
  Former smoker. 8517006
  Never smoker. 266919005
  Smoker, current status unknown. 77176002
  Unknown if ever smoked. 266927001
  Heavy tobacco smoker. 428071000124103
  Light tobacco smoker. 428061000124105

*/
  var fuma=false;
  if (Fumador.entry)
  {
    if (Fumador.entry[0].resource.valueCodeableConcept.coding[0].code =="449868002") {fuma=true};
    if (Fumador.entry[0].resource.valueCodeableConcept.coding[0].code =="428041000124106") {fuma=true};
    if (Fumador.entry[0].resource.valueCodeableConcept.coding[0].code =="428071000124103") {fuma=true};
    if (Fumador.entry[0].resource.valueCodeableConcept.coding[0].code =="428061000124105") {fuma=true};
  }
  
  console.log('Edad: ', edad);
  console.log('Sexo: ', sexo);
  console.log('Diabetes: ', diab);
  console.log('Col HDL',valorHDL);
  console.log('Col TOT',valorCOL);
  console.log('Sistolica',Sistolica);
  
  console.log('Fuma',fuma);
  
  scorePaciente=conocimiento.CalcularScore(edad,sexo,diab,valorHDL,valorCOL,Sistolica,fuma);
  scoreData=conocimiento.InterpretarScore(scorePaciente);

   res.send(CrearTarjeta(scoreData));
}));

app.listen(3003, () => console.log('Servicio UEHO CDS Hooks activo en puerto 3003!'))
