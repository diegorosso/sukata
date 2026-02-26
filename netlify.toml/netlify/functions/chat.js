exports.handler = async function (event) {
  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { message } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Mensaje requerido' }),
      };
    }

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 200,
        messages: [
          {
            role: 'system',
            content: `Sos el asistente virtual de Sukata BJJ, academia de Jiu Jitsu Brasileño en Hipólito Yrigoyen 1980, Martínez, Buenos Aires.
Respondé de forma motivadora, amigable y concisa (máximo 3 oraciones).
Usá términos de BJJ cuando sea apropiado.
Clases disponibles: Kimono, No-Gi, Femenino y Pro.
Instructor principal: Adrián Cabrera, Cinturón Negro 4to Grado, 20 años de experiencia.
Instagram: @sukatamartinez | WhatsApp: +54 9 11 5614-2680.
Terminá con "¡Oss!" cuando sea apropiado.`,
          },
          { role: 'user', content: message },
        ],
      }),
    });

    if (!groqResponse.ok) {
      throw new Error(`Groq error: ${groqResponse.status}`);
    }

    const data = await groqResponse.json();
    const text = data.choices?.[0]?.message?.content ?? '¡Perdón, tuve un problema técnico! ¡Oss!';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};