exports.handler = async function(event, context) {
  const { pregunta } = JSON.parse(event.body || '{}');
  const GEMINI_API_KEY = process.env.GEMINI_API_KEYY;

  const prompt = pregunta || "Dame una respuesta útil para la comunidad.";

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 150
      }
    })
  });

  const result = await response.json();
  console.log(result); // Debug
  
  const respuesta = result.candidates?.[0]?.content?.parts?.[0]?.text || "No tengo respuesta.";
  return {
    statusCode: 200,
    body: JSON.stringify({ respuesta })
  };
};
