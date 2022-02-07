const token = 'TOKEN';
const nombre = 'Name';
const fecha = (new Date()).toLocaleDateString("es-CR");
const subNiveles = 'N';
const correoElectronico = 'test@gmail.com';
const indicador = {
    compra: 317,
    venta: 318
}

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const req = new XMLHttpRequest();
const parseString = require('xml2js').parseString;
const nodemailer = require("nodemailer");

/**
 * Esta Funcion sirve para hacer un XMLHTTPRequest
 * @param {Number} ind Es el numero del indicador, para saber si es de compra o venta
 * @returns Retorna un XML
 */
const getXML = async (ind) => {
    req.open('GET', `https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicosXML?Indicador=${ind}&FechaInicio=${fecha}&FechaFinal=${fecha}&Nombre=${nombre}&SubNiveles=${subNiveles}&CorreoElectronico=${correoElectronico}&Token=${token}`, false);
    req.send(null);
    if (req.status == 200){
        return req.responseText;
    }
    return undefined
}

/**
 * Transforma un XML a objeto y obtiene el resultado buscado
 * @param {String} xmlResultado Es un string con formato XML, que va a ser transformado a objeto
 * @returns {Number}
 */
 const parser = function (xmlResultado) {
    if (xmlResultado != undefined){
        let resultadoCambio;
    parseString(xmlResultado, function (err, result) {
        parseString(result.string._, function(err, result2) {
            resultadoCambio = (result2.Datos_de_INGC011_CAT_INDICADORECONOMIC.INGC011_CAT_INDICADORECONOMIC[0].NUM_VALOR[0]).toString();
        });
    });
    return resultadoCambio;
    }
    return undefined;
}

/**
 * Funcion principal, se utiliza como un main
 */
const main = async () => {
    const cambio = {
        compra: 0,
        venta: 0
    }
    let xmlCompra = await getXML(indicador.compra)
    let xmlVenta = await getXML(indicador.venta)
    cambio.compra = parser(xmlCompra);
    cambio.venta = parser(xmlVenta);
    console.log('Compra: ', cambio.compra)
    console.log('Venta: ', cambio.venta)
    if (cambio.compra != undefined && cambio.venta != undefined){
        // object, fromEmail, toEmail
        // replace emails
        await enviarCorreo(cambio, "test@gmail.com", correoElectronico);
    }else {
        console.log("Error consiguiendo la informacion de la API")
        console.log("Se debe de hacer de forma manual")
    }
}

const enviarCorreo = async (cambio, fromEmail, toEmail) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: fromEmail, // generated ethereal user
        pass: "example132", // generated ethereal password
      },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${fromEmail}`, // sender address
    to: `${toEmail}`, // list of receivers
    subject: `Tipo de cambio ${fecha}`, // Subject line
    html: `<p><b>Compra: </b> ${cambio.compra}</p> <p><b>Venta: </b> ${cambio.venta}</p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);

}

//Se llama el main
main();