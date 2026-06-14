async function preguntar() {
  console.log('🟢 Función preguntar iniciada');
  
  const inputElement = document.getElementById('pregunta');
  const pregunta = inputElement.value.trim();
  console.log('❓ Pregunta ingresada:', pregunta);
  
  if (!pregunta) {
    console.log('⚠️ Pregunta vacía');
    return;
  }
  
  // Agregar mensaje del usuario al chat
  agregarMensaje(pregunta, 'usuario');
  inputElement.value = '';
  inputElement.focus();
  
  console.log('⏳ Mostrando indicador de escritura...');
  agregarIndicadorEscritura();
  
  try {
    // Obtener el modelo seleccionado
    const modelSelector = document.getElementById('geminiModel');
    const modelo = modelSelector ? modelSelector.value : 'gemini-2.5-flash';
    console.log('🔧 Modelo seleccionado:', modelo);
    
    console.log('🌐 Enviando fetch a /.netlify/functions/ask');
    const res = await fetch('/.netlify/functions/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pregunta, modelo })
    });
    
    console.log('📡 Estado de respuesta:', res.status, res.statusText);
    
    // Remover indicador de escritura
    removerIndicadorEscritura();
    
    if (!res.ok) {
      console.log('❌ Error HTTP:', res.status);
      agregarMensaje(`❌ Error: ${res.status} - ${res.statusText}`, 'bot');
      return;
    }
    
    console.log('📦 Parseando JSON de respuesta...');
    const data = await res.json();
    console.log('✅ Datos recibidos:', data);
    
    let respuestaTexto = data.respuesta || "No se pudo obtener respuesta.";
    console.log('💬 Respuesta final (sin procesar):', respuestaTexto);
    
    // === CONVERTIR MARKDOWN A HTML ===
    respuestaTexto = convertirMarkdownAHTML(respuestaTexto);
    
    console.log('🎨 Agregando respuesta al chat...');
    agregarMensaje(respuestaTexto, 'bot', true); // true = es HTML
    
    console.log('🎉 Proceso completado exitosamente');
  } catch (error) {
    console.error('💥 Error en la función:', error);
    removerIndicadorEscritura();
    agregarMensaje(`❌ Error: ${error.message}`, 'bot');
  }
}

// === NUEVA FUNCIÓN: Convertir Markdown a HTML ===
function convertirMarkdownAHTML(texto) {
  // **texto** -> <strong>texto</strong>
  texto = texto.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // *texto* -> <em>texto</em>
  texto = texto.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // __texto__ -> <strong>texto</strong>
  texto = texto.replace(/__(.+?)__/g, '<strong>$1</strong>');
  
  // _texto_ -> <em>texto</em>
  texto = texto.replace(/_(.+?)_/g, <em>$1</em>');
  
  // # Título -> <h1>Título</h1>
  texto = texto.replace(/^# (.+)$/gm, '<h2 style="margin-top: 12px; color: #FFD700;">$1</h2>');
  texto = texto.replace(/^## (.+)$/gm, '<h3 style="color: #0FF;">$1</h3>');
  
  // Saltos de línea \n -> <br>
  texto = texto.replace(/\n/g, '<br>');
  
  return texto;
}

function agregarMensaje(texto, tipo, esHTML = false) {
  const chatMessages = document.getElementById('chatMessages');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${tipo === 'usuario' ? 'user-message' : 'bot-message'}`;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  
  const pElement = document.createElement('p');
  
  // Si es HTML, usa innerHTML; si no, usa innerText (seguro contra XSS)
  if (esHTML) {
    pElement.innerHTML = texto;
  } else {
    pElement.innerText = texto;
  }
  
  contentDiv.appendChild(pElement);
  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);
  
  // Scroll automático al último mensaje
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function agregarIndicadorEscritura() {
  const chatMessages = document.getElementById('chatMessages');
  
  const messageDiv = document.createElement('div');
  messageDiv.id = 'typing-indicator';
  messageDiv.className = 'message bot-message';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content typing-indicator';
  
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.className = 'typing-dot';
    contentDiv.appendChild(dot);
  }
  
  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);
  
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removerIndicadorEscritura() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) {
    indicator.remove();
  }
}

// Permitir enviar con Enter
document.addEventListener('DOMContentLoaded', function() {
  const inputElement = document.getElementById('pregunta');
  
  inputElement.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      preguntar();
    }
  });
});
