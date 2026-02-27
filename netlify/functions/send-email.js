export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Todos los campos son requeridos' }),
      };
    }

    // Log para debug — verificar que la key está llegando
    console.log('RESEND_API_KEY existe:', !!process.env.RESEND_API_KEY);

    const resendBody = {
      from: 'Sukata BJJ <onboarding@resend.dev>',
      to: ['diegorosso1988@gmail.com'],   // ← tu mail registrado en Resend
      reply_to: email,
      subject: `Nuevo mensaje de ${name} — Sukata BJJ`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #09090b; color: #ffffff; padding: 40px; border-radius: 8px;">
          <div style="border-bottom: 2px solid #b91c1c; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #b91c1c; font-size: 24px; margin: 0; text-transform: uppercase; letter-spacing: 4px;">SUKATA BJJ</h1>
            <p style="color: #71717a; margin: 5px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Nuevo mensaje de contacto</p>
          </div>
          
          <div style="background: #18181b; border: 1px solid #27272a; border-radius: 6px; padding: 24px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px; color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Nombre</p>
            <p style="margin: 0; font-size: 18px; font-weight: bold;">${name}</p>
          </div>

          <div style="background: #18181b; border: 1px solid #27272a; border-radius: 6px; padding: 24px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px; color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Email</p>
            <p style="margin: 0; font-size: 18px; font-weight: bold; color: #b91c1c;">${email}</p>
          </div>

          <div style="background: #18181b; border: 1px solid #27272a; border-radius: 6px; padding: 24px; margin-bottom: 32px;">
            <p style="margin: 0 0 8px; color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Mensaje</p>
            <p style="margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <a href="mailto:${email}" style="display: inline-block; background: #b91c1c; color: #ffffff; padding: 14px 28px; border-radius: 4px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; font-size: 13px;">
            Responder a ${name}
          </a>

          <p style="margin-top: 32px; color: #3f3f46; font-size: 11px; text-align: center;">
            Mensaje enviado desde sukata.netlify.app
          </p>
        </div>
      `,
    };

    console.log('Enviando a Resend...', resendBody.to);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(resendBody),
    });

    const responseData = await response.json();
    console.log('Respuesta de Resend:', response.status, responseData);

    if (!response.ok) {
      throw new Error(`Resend error ${response.status}: ${JSON.stringify(responseData)}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (error) {
    console.error('Error enviando email:', error.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message }),
    };
  }
};