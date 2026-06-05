exports.handler = async function(event, context) {
  console.log('📨 Solicitud recibida:', event);
  
  const { pregunta } = JSON.parse(event.body || '{}');
  console.log('❓ Pregunta del usuario:', pregunta);
  
  const GEMINI_API_KEY = process.env.GEMINI_API_KEYY;
  console.log('🔑 API Key cargada:', GEMINI_API_KEY ? '✓ Disponible' : '✗ No disponible');

  const prompt = pregunta || "Dame una respuesta útil para la comunidad.";
  console.log('💬 Prompt a enviar:', prompt);

  console.log('🌐 Enviando solicitud a Gemini API...');
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

  console.log('📡 Estado de respuesta:', response.status, response.statusText);
  
  const result = await response.json();
  console.log('📦 Respuesta completa de Gemini:', JSON.stringify(result, null, 2));
  
  const respuesta = result.candidates?.[0]?.content?.parts?.[0]?.text || "No tengo respuesta.";
  console.log('✅ Respuesta final:', respuesta);
  
  console.log('🎯 Enviando respuesta al cliente...');
  return {
    statusCode: 200,
    body: JSON.stringify({ respuesta })
  };
};
