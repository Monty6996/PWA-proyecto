const nodemailer = require("nodemailer");

const send = async ({ to, subject = "default", html }) => {
	try {
		const transporter = nodemailer.createTransport({
			service: process.env.CORREO_SERVICE,
			auth: {
				user: process.env.CORREO_USER,
				pass: process.env.CORREO_PASSWORD,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});
		const mail = {
			from: "remitente",
			to,
			subject,
			html,
		};

		const envio = await transporter.sendMail(mail);
		return envio.messageId;
	} catch (e) {
		console.error(e);
	}
};

module.exports = { send };
