exports.handler = async function(event, context) {
  console.log('📨 Solicitud recibida:', event);
  
  const { pregunta, modelo } = JSON.parse(event.body || '{}');
  console.log('❓ Pregunta del usuario:', pregunta);
  console.log('🔧 Modelo seleccionado:', modelo);
  
  const GEMINI_API_KEY = process.env.GEMINI_API_KEYY;
  console.log('🔑 API Key cargada:', GEMINI_API_KEY ? '✓ Disponible' : '✗ No disponible');

  if (!GEMINI_API_KEY) {
    console.error('❌ ERROR: API Key no disponible');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API Key no configurada", respuesta: "No tengo respuesta." })
    };
  }

  // Validar modelo
  const modeloValido = modelo || 'gemini-2.5-flash';
  const modelosPermitidos = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
  
  if (!modelosPermitidos.includes(modeloValido)) {
    console.error('❌ ERROR: Modelo no permitido:', modeloValido);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Modelo no permitido", respuesta: "El modelo seleccionado no es válido." })
    };
  }

  const prompt = pregunta || "Dame una respuesta útil para la comunidad.";
  console.log('💬 Prompt a enviar:', prompt);

  try {
    console.log(`🌐 Enviando solicitud a Gemini API v1beta con modelo ${modeloValido}...`);
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modeloValido}:generateContent?key=${GEMINI_API_KEY}`, {
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

    // Validar si hay error en la respuesta
    if (result.error) {
      console.error('❌ Error de Gemini:', result.error);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: result.error.message, respuesta: "Error de API: " + result.error.message })
      };
    }

    // Validar que haya candidatos
    if (!result.candidates || result.candidates.length === 0) {
      console.error('❌ No hay candidatos en la respuesta');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No hay respuesta de Gemini", respuesta: "La API no devolvió respuesta." })
      };
    }

    const respuesta = result.candidates?.[0]?.content?.parts?.[0]?.text || "No tengo respuesta.";
    console.log('✅ Respuesta final:', respuesta);
    
    console.log('🎯 Enviando respuesta al cliente...');
    return {
      statusCode: 200,
      body: JSON.stringify({ respuesta, modelo: modeloValido })
    };
  } catch (error) {
    console.error('💥 Error en la función:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, respuesta: "Error del servidor: " + error.message })
    };
  }
};
