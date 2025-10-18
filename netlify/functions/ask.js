exports.handler = async function(event, context) {
  const { pregunta } = JSON.parse(event.body || '{}');
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const prompt = pregunta || "Dame una respuesta útil para la comunidad.";

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150
    })
  });

  const result = await response.json();
  console.log(result); // <-- AGREGA ESTA LINEA
  const respuesta = result.choices?.[0]?.message?.content || "No tengo respuesta.";
  return {
    statusCode: 200,
    body: JSON.stringify({ respuesta })
  };
};
