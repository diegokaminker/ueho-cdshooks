# UEHO Demo

Este proyecto esta basado en https://github.com/uwbhi/phi533-cdshook.git y es una demo
de como invocar CDS-Hooks para un propósito de CDS Determinado
Puede ser invocado desde la Sandbox [sandbox](http://sandbox.cds-hooks.org/).

# Instrucciones

Instalar los pre-requisitos y luego correr la aplicación y exponerla
## Prerequisitos

Instalar [NodeJS](https://nodejs.org/en/download/)


## Correrlo

Clonear este repo

```
git clone https://github.com/diegokaminker/ueho-cdshooks.git && cd ueho-cdshook
```

Instalar las dependencias

```
npm install
```

Correr la aplicacion

```
npm start
```

## Probar

### Chequeo Básico

Navigar a `http://localhost:3003/` y asegurarse de ver un mensaje de que el servicio funciona

### Configurar el Sandbox

Navegar al [CDS Hooks sandbox](http://sandbox.cds-hooks.org/). Seleccionar **CDS Services** l
y elegir  **ADD CDS Service**.

1. En la pregunta sobre el discovery endpoint, ingresar `http://localhost:3003/cds-services`
Luego probar la configuracion
2. Ver si se muestra el mensaje con la evaluacion del paciente
3. ¡Listo!