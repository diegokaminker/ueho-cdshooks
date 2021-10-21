## Ejemplo de CDS Hooks
Derivado de Pascal Brandt, Piotr Mankowski, et al (original en https://github.com/uw-fhir/CDS-Hooks-Tutorial)
## Pre-Requisitos
1. Vamos a usar el sandbox oficial de cds hooks. Puede jugar un poco [aquí](https://sandbox.cds-hooks.org). 
2. Para que su computadora pueda ser un servidor CDS-Hooks por un rato, hay que instalar algunas cosas.

    a. **Node.js, npm, y ssh**: Vamos a levantar un servidor sencillo que va a escuchar solicitudes CDS y va a responder con las tarjetas apropiadas. 
    El servidor corre sobre  `Node.js`; `npm` es el gestor de paquetes de Node.js, y el cliente  `ssh` se usa para escuchar solicitudes del sandbox. 
    Seguir las instrucciones de [aqui](readme.md) para instalarlos  

    b. **Algun editor de texto capaz**: Si no tiene uno, descargarlo
    
      * [Atom](https://atom.io/)
      * [Sublime Text](https://www.sublimetext.com/)
      * [Notepad++](https://notepad-plus-plus.org/download/) (Solo Windows)
      * [VS Code](https://code.visualstudio.com/) (mas avanzado y recomendado)


## El Escenario
Trabaja en un proyecto cuyo objetivo es reducir el riesgo cardíaco permitiendo a profesionales o pacientes calcularlo a partir de los datos pre-existentes en las HCE.
Su trabajo incluye diseñar un CDS Hook que soporte este cálculo

1. Informar a paciente o profesional sobre su riesgo
2. Permitir a los pacientes ingresar a un programa de reducción del riesgo

In este escenario queremos que se calcule el riesgo al seleccionar al paciente (hook)
    
Queremos que el médico y/o paciente reciban dos **Cards** luego de calcular su riesgo

1. Una **informational card** informando el riesgo
2. En caso de un riesgo mayor al 20%, una **app card** que permite ingresar a otra aplicación que provee servicios educacionales o plan de cuidado

## Parte 1 - Como empezar
Descargar de este github el proyecto

Instale las dependencias
```
npm install
```

Corra la aplicación
```
npm start
```

Abra `http://localhost:3003`. Deberia obtener el siguiente mensaje

```
UEHO CDS Hook activo!
```

Perfecto! Su **Servicio** está activo!
