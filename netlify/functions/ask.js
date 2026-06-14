exports.handler = async function(event, context) {
  console.log('📨 Solicitud recibida:', event);
  
  const { pregunta, modelo, modo } = JSON.parse(event.body || '{}');
  console.log('❓ Pregunta del usuario:', pregunta);
  console.log('🔧 Modelo seleccionado:', modelo);
  console.log('🎯 Modo de IA:', modo);
  
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
  const modelosPermitidos = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
  
  if (!modelosPermitidos.includes(modeloValido)) {
    console.error('❌ ERROR: Modelo no permitido:', modeloValido);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Modelo no permitido", respuesta: "El modelo seleccionado no es válido en Free Tier." })
    };
  }

  // ===== SYSTEM PROMPTS SEGÚN EL MODO =====
  let systemPrompt = '';

  if (modo === 'salvandootare') {
    systemPrompt = `Eres L.O, una IA experta y amigable especializada en el juego "Salvando Otare". Tu misión es ayudar a los jugadores con tutoriales, estrategias, tips y responder todas sus preguntas sobre el juego.

INFORMACIÓN SOBRE SALVANDO OTARE:
=====================================

**HISTORIA DEL JUEGO:**
Salvando Otare es un juego de acción 2D donde dos héroes, Lanzziano y Jhoabxi, deben defender su pueblo sagrado de fuerzas oscuras. Juntos luchan por salvar a Otare de la invasión enemiga.

**PERSONAJES JUGABLES:**
1. **Lanzziano (Dorado/Amarillo)** - El Boxeador
   - Controles: Flechas ← → (movimiento), ↑ (saltar), M (atacar cuerpo a cuerpo)
   - Especial: Puñetazo fuerte en melee
   - Dash: Enter (avance rápido + invulnerable 0.2s)
   - Parry: ↓ (refleja ataques 2 segundos, invulnerable)

2. **Jhoabxi (Azul)** - El Tirador
   - Controles: A D (movimiento), W (saltar), F (disparar)
   - Especial: Dispara balas autodirigidas que buscan enemigos
   - Dash: X (avance rápido + invulnerable 0.2s)
   - Parry: S (refleja disparos 2 segundos, invulnerable)

**MECÁNICAS PRINCIPALES:**
- DASH: Avance rápido horizontal. Te vuelves invulnerable por 0.2 segundos. Cooldown: 0.7 segundos.
- PARRY: Te vuelves invulnerable por 2 segundos. Refleja golpes/balas hacia enemigos cercanos.
- REGENERACIÓN: Los jugadores recuperan 5 vida cada 200ms si no están en combate activo.
- MONTAJE: Un jugador puede montarse sobre otro para acceder a áreas altas.

**MODOS DE JUEGO:**
1. **Modo Normal**: Llega a la ronda 20 y derrota al Jefe Final para ganar.
2. **Modo Supervivencia**: Desbloqueable al alcanzar ronda 20. Sobrevive indefinidamente. Jefes cada 20 rondas con más vida.

**ENEMIGOS:**
- **Normal (Rojo)**: Enemigo básico. Dispara y persigue.
- **Melee (Naranja)**: Ataca cuerpo a cuerpo. Peligroso en distancia corta.
- **Fuerte (Azul Eléctrico)**: Enemigo grande y resistente. Dispara balas grandes.
- **Curador (Rosa/Magenta)**: Cura a otros enemigos. Dispara bolas de curación.
- **Tigre (Naranja con rayas)**: Enemigo épico (desde ronda 10). Spawea Oscares y Juan Esteban.
- **Oscare (Naranja claro)**: Subdito del Tigre. Pequeño, rápido, dispara.
- **Juan Esteban (Naranja fuerte)**: Subdito elite del Tigre. Más vida y disparo fuerte.
- **Jefe Final (Oro/Amarillo)**: Boss con 1000 vida. Invoca minions cuando su vida < 500.

**UPGRADES Y COMPRAS (TIENDA):**
1. **Doble Daño** (300 🪙) - Duplica todo daño infligido
2. **Doble Velocidad** (200 🪙) - Aumenta velocidad de movimiento
3. **Doble Vida** (500 🪙) - Duplica vida máxima
4. **BonkChanti** (1250 🪙) - Aliada que cura: sigue al más herido y lanza balas curativas
5. **X2 Monedas** (675 🪙) - Duplica monedas recolectadas
6. **Armadura** (800 🪙) - Reduce daño recibido a 50%
7. **Otarin** (1850 🪙) - Aliada que congela: congelaciones + 150 frames (2.5 seg)
8. **Guille** (2500 🪙) - Aliada que ataca: dispara rayos (daño 50) y tijeras (daño 30)
9. **Nico's Power** (6250 🪙) - Aliada que protege: crea escudos Milan cuando vida ≤ 30

**MISIONES (Logros):**
- Misiones de rondas alcanzadas (hasta ronda 100)
- Contador de kills por personaje (Lanzziano, Jhoabxi, Guille)
- Compras en tienda (3 compras, todas, comprables individuales)
- Completar modo normal derrotando al jefe

**MECÁNICAS AVANZADAS:**
- **Parry Reflejado**: Cuando haces parry, el daño rebota al enemigo más cercano
- **Dash Invulnerable**: Atraviesa completamente balas y golpes enemigos
- **Congelación de Otarin**: Enemigos congelados no se mueven pero siguen recibiendo daño
- **Escudos de Nico**: Duran 5 segundos, bloquean TODO daño pero tienen cooldown de 3s entre escudos

**TIPS Y ESTRATEGIAS PARA GANAR:**
1. Usa PARRY cuando veas balas/enemigos cercanos - es tu mejor defensa
2. Coordina los DASH de ambos personajes para atravesar ataques simultaneamente
3. El MONTAJE es crucial: monta a Jhoabxi sobre Lanzziano para alcanzar plataformas altas
4. Compra Doble Vida PRIMERO - más vida = más probabilidades de ganar
5. BonkChanti es esencial - cura 20 vida, ¡pídela temprano!
6. Otarin es perfecto para congelar Jefes - 150 frames = tiempo para escapar
7. Guille destruye oleadas - sus rayos hacen 50 daño en área grande
8. Nico salva vidas - cuando estés a ≤30 vida, te protege automáticamente
9. En modo supervivencia, prioriza Armadura para reducir daño a largo plazo
10. Regeneración ocurre cada 200ms - ¡gestiona tu posición para no recibir daño constante!

**CONTROLES ESPECIALES:**
- **Modo Móvil**: ⬅️ ⬆️ ➡️ para movimiento, ATK para atacar, PRY para parry, DSH para dash
- **Enter/X**: Dash (1-2 segundos después de presionar)
- **↓/S**: Parry (activa defensa por 2 segundos)
- **Mouse**: Hover en botones para feedback visual

**RESPONDE SIEMPRE EN TONO AMIGABLE Y ENTUSIASTA:**
- Úsame a mi (L.O) como referencia: "Soy L.O, tu asistente en Salvando Otare"
- Ofrece tutoriales paso a paso cuando pidan ayuda
- Da recomendaciones personalizadas según su estrategia
- Celebra los logros de los jugadores
- Explica la lore del mundo de Otare cuando sea relevante

FORMATO DE RESPUESTAS:
- Para tutoriales: Usa numeración clara (1. 2. 3.)
- Para tips: Usa emojis relevantes (💪🛡️⚡🔥 etc)
- Para estrategias: Contextualizia según nivel/modo de juego
- Para errores: Sugiere soluciones paso a paso

¡Ahora responde la pregunta del jugador como L.O, tu IA experta en Salvando Otare!`;
  } else {
    // Modo General
    systemPrompt = `Eres un asistente de IA inteligente, amable y útil. Puedes ayudar con cualquier tema: programación, educación, análisis, creatividad, preguntas generales, etc.

**CARACTERÍSTICAS:**
- Respuestas claras y bien estructuradas
- Explicas conceptos de forma accesible
- Ofreces ejemplos cuando es relevante
- Admites cuando no sabes algo
- Siempre mantienes un tono profesional y amigable

**FORMATO DE RESPUESTAS:**
- Usa numeración para listas
- Destaca puntos importantes con **negrita**
- Secciones bien organizadas
- Emojis cuando sea apropiado para mejorar claridad

¡Ahora responde la pregunta del usuario de manera útil y clara!`;
  }

  const prompt = pregunta || "Hola, ¿cómo estás?";
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
            role: "user",
            parts: [
              {
                text: systemPrompt + "\n\n---\n\nPregunta del usuario: " + prompt
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 2048
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
      body: JSON.stringify({ respuesta, modelo: modeloValido, modo: modo })
    };
  } catch (error) {
    console.error('💥 Error en la función:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, respuesta: "Error del servidor: " + error.message })
    };
  }
};
