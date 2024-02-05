const nodemailer = require("nodemailer")

const getDefaultResponse = (req, res) => {
  res.status(200).json({ message: "Respuesta satisfactoria desde send-email" });
};

const sendEmail = async (req, res) => {
  const data = req.body
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD,
    },
  })

  let mailOptions = {
    from: process.env.EMAIL,
    to: ["cataelectronic@hotmail.com", "alquilerpiamonte1@outlook.es", "alquilerpiamonte2@outlook.es"],
    subject: `Alerta cliente reportado!`,
    html: `
      <div>
        <p>Se ha generado un reporte negativo para el siguiente delincuente:</p>
        <ul>
          <li>Fecha: ${data.createdAt}</li>
          <li>ID Cliente: ${data.IdCliente}</li>
          <li>Cedula: ${data.cedula}</li>
          <li>Nombre: ${data.name} ${data.lastName}</li>
          <li>Descripcion: ${data.description}</li>
        </ul>
      </div>
    `,
  }
  try {
    const resEmail = await transporter.sendMail(mailOptions)
    if (resEmail) {
      res.status(200).json({ message: "Email enviado con éxito" });
    } else {
      res.status(500).json({ message: "Algo ocurrio en el envío del email" });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error,
      }),
      { status: 500 }
    )
  }

}


module.exports = {
  getDefaultResponse,
  sendEmail,
};