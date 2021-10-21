
const CalcularScore=(edad, sexo, diab, valorHDL, valorCOL, Sistolica, fuma) =>
{

    GrundyScore = 0;

    GrundyScore = GrundyScore + ScoreEdad(edad, sexo);
    GrundyScore = GrundyScore + ScoreHDL(valorHDL, sexo);
    GrundyScore = GrundyScore + ScoreCOL(valorCOL, sexo);
    GrundyScore = GrundyScore + ScoreSIS(Sistolica, sexo);
    GrundyScore = GrundyScore + ScoreDIAB(diab, sexo);
    GrundyScore = GrundyScore + ScoreFUMA(fuma, sexo);



    return GrundyScore;

}
const InterpretarScore= (ScorePaciente)=>
{
    var SuStatus="bajo";
    var SuRecomendacion="Siga viviendo su vida como hasta ahora, que anda muy bien";
    var SuIndicador="information";
    if (ScorePaciente>20)  
    {
            var SuStatus="alto";
            var SuRecomendacion="Recomendamos tratamiento: dieta, medicacion para bajar colesterol, control presión arterial y glucosa";
            var SuIndicador="critical";
  
    }
    var scoreData =
    {
    "rtr":
    {
      "status": SuStatus,
      "recommendation": SuRecomendacion,
      "indicador":SuIndicador,
      "score":ScorePaciente
    } }
  ;
    return scoreData;
}
const ScoreFUMA=(fuma,sexo) =>
{
  var RiesgoFUMA = 0;
  if (fuma)
  {
    if (sexo=='female') {RiesgoFUMA=2}
    if (sexo=='male')   {RiesgoFUMA=2}
  }
  return RiesgoFUMA;
}

const ScoreDIAB=(diab,sexo) =>
{
  var RiesgoDIAB = 0;
  if (diab)
  {
    if (sexo=='female') {RiesgoDIAB=4}
    if (sexo=='male')   {RiesgoDIAB=2}
  }
  return RiesgoDIAB;
}
 
const ScoreSIS=(valorSIS,sexo) =>
{
  var RiesgoSIS = 0;
  if (valorSIS<120 && valorSIS>0)
  {
    if (sexo=='female') {RiesgoSIS=-3}
    if (sexo=='male')   {RiesgoSIS=-0}
  }
  ;
  if (valorSIS<130 && valorSIS>=120)
  {
    if (sexo=='female') {RiesgoSIS=0}
    if (sexo=='male')   {RiesgoSIS=0}
  }
  if (valorSIS<140 && valorSIS>=130)
  {
    if (sexo=='female') {RiesgoSIS=1}
    if (sexo=='male')   {RiesgoSIS=1}
  }
  if (valorSIS<160 && valorSIS>=140)
  {
    if (sexo=='female') {RiesgoSIS=2}
    if (sexo=='male')   {RiesgoSIS=2}
  }

  if (valorSIS>=160)
  {
    if (sexo=='female') {RiesgoSIS=3}
    if (sexo=='male')   {RiesgoSIS=3}
  }
 return RiesgoSIS;
}

const ScoreCOL=(valorCOL,sexo) =>
{
  var RiesgoCOL = 0;
  if (valorCOL<160 && valorCOL>0)
  {
    if (sexo=='female') {RiesgoCOL=-2}
    if (sexo=='male')   {RiesgoCOL=-3}
  }
  ;
  if (valorCOL<200 && valorCOL>=160)
  {
    if (sexo=='female') {RiesgoCOL=0}
    if (sexo=='male')   {RiesgoCOL=0}
  }
  if (valorCOL<240 && valorCOL>=200)
  {
    if (sexo=='female') {RiesgoCOL=1}
    if (sexo=='male')   {RiesgoCOL=1}
  }
  if (valorCOL<280 && valorCOL>=240)
  {
    if (sexo=='female') {RiesgoCOL=2}
    if (sexo=='male')   {RiesgoCOL=2}
  }

  if (valorCOL>=280)
  {
    if (sexo=='female') {RiesgoCOL=3}
    if (sexo=='male')   {RiesgoCOL=3}
  }
 return RiesgoCOL;
}
const ScoreHDL=(valorHDL,sexo) =>
{
  var RiesgoHDL = 0;
  if (valorHDL<35 && valorHDL>0)
  {
    if (sexo=='female') {RiesgoHDL=5}
    if (sexo=='male')   {RiesgoHDL=2}
  }
  if (valorHDL<45 && valorHDL>=35)
  {
    if (sexo=='female') {RiesgoHDL=2}
    if (sexo=='male')   {RiesgoHDL=1}
  }
  if (valorHDL<50 && valorHDL>=45)
  {
    if (sexo=='female') {RiesgoHDL=1}
    if (sexo=='male')   {RiesgoHDL=0}
  }
  if (valorHDL<60 && valorHDL>=50)
  {
    if (sexo=='female') {RiesgoHDL=0}
    if (sexo=='male')   {RiesgoHDL=0}
  }
  if (valorHDL>=60)
  {
    if (sexo=='female') {RiesgoHDL=-3}
    if (sexo=='male')   {RiesgoHDL=-2}
  }
  return RiesgoHDL;
  
}
const ScoreEdad = (edad, sexo) =>
{
  var RiesgoPorEdad=0;
  if (edad<34) 
    {
      if (sexo=='female') {RiesgoPorEdad=-9}
      if (sexo=='male')   {RiesgoPorEdad=-1}
    }
    if (edad>=35 && edad<=39) 
    {
      if (sexo=='female') {RiesgoPorEdad=-4}
      if (sexo=='male')   {RiesgoPorEdad=0}
    }
    if (edad>=40 && edad<=44) 
    {
      if (sexo=='female') {RiesgoPorEdad=1}
      if (sexo=='male')   {RiesgoPorEdad=0}
    }
    if (edad>=45 && edad<=49) 
    {
      if (sexo=='female') {RiesgoPorEdad=2}
      if (sexo=='male')   {RiesgoPorEdad=3}
    }
    if (edad>=50 && edad<=54) 
    {
      if (sexo=='female') {RiesgoPorEdad=3}
      if (sexo=='male')   {RiesgoPorEdad=6}
    }
    if (edad>=55 && edad<=59) 
    {
      if (sexo=='female') {RiesgoPorEdad=4}
      if (sexo=='male')   {RiesgoPorEdad=7}
    }
    if (edad>=60 && edad<=64) 
    {
      if (sexo=='female') {RiesgoPorEdad=5}
      if (sexo=='male')   {RiesgoPorEdad=8}
    }
    if (edad>=65 && edad<=69) 
    {
      if (sexo=='female') {RiesgoPorEdad=6}
      if (sexo=='male')   {RiesgoPorEdad=8}
    }
    if (edad>=70 && edad<=74) 
    {
      if (sexo=='female') {RiesgoPorEdad=7}
      if (sexo=='male')   {RiesgoPorEdad=8}
    }
    return RiesgoPorEdad;
  
}

module.exports={CalcularScore,InterpretarScore};
