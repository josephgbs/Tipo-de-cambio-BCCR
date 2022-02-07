# Tipo-de-cambio-BCCR
Un proyecto simple utilizando la consola en Node.js el cual nos ayuda a conectarnos a la API del BCCR para obtener el tipo de cambio de colon a dolar en Costa Rica y enviarlo por correo utilizando una conexion SMTP.


## ¿Cómo usarlo?
Primero descarga las dependencias/node-modules utilizando
``` bash
npm install
```

Luego que hayas descargado las dependencias, pueden correr el código utilizando
``` bash
node index.js
```


## Configuración

### Indicadores
Debes utilizar el indicador para la información que se quiere consultar.
Por defecto los indicadores de compra y venta son los siguientes:
``` javaScript
const indicador = {
    compra: 317,
    venta: 318
}
```
### BCCR API Credenciales
Los credenciales deben ser creados desde la página del BCCR
[Crear Credenciales](https://www.bccr.fi.cr/indicadores-economicos/servicio-web)
``` javaScript
const token = 'TOKEN';
const nombre = 'Name';
const fecha = (new Date()).toLocaleDateString("es-CR");
const subNiveles = 'N';
const correoElectronico = 'test@gmail.com';
```


### Envío de correo
El método enviarCorreo cuenta con 3 parámetros: object, fromEmail, toEmail
``` JavaScript
# object, fromEmail, toEmail
await enviarCorreo(cambio, "test@gmail.com", correoElectronico);
```

Credenciales de "fromEmail"
``` JavaScript
auth: {
    user: fromEmail, // generated ethereal user
    pass: "example132", // generated ethereal password
    }
```

