// Variable global para almacenar el prompt generado
let promptActual = '';

async function generarPrompt() {
  console.log('🟢 Función generarPrompt iniciada');
  
  // Obtener valores del formulario
  const modelo = document.getElementById('modeloSelector').value;
  const plan = document.querySelector('input[name="plan"]:checked').value;
  const tipoTarea = document.getElementById('tipoTarea').value;
  const descripcion = document.getElementById('descripcionTarea').value.trim();
  
  console.log('📋 Configuración:', { modelo, plan, tipoTarea, descripcion });
  
  // Validar inputs
  if (!modelo) {
    mostrarError('Por favor selecciona un modelo de IA');
    return;
  }
  
  if (!tipoTarea) {
    mostrarError('Por favor selecciona el tipo de tarea');
    return;
  }
  
  if (!descripcion) {
    mostrarError('Por favor describe tu tarea');
    return;
  }
  
  console.log('✅ Validación completada');
  
  // Mostrar loading
  mostrarLoading(true);
  limpiarError();
  
  try {
    console.log('🌐 Enviando solicitud a /.netlify/functions/ask');
    const response = await fetch('/.netlify/functions/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        modelo,
        plan,
        tipoTarea,
        descripcion,
        esGenerador: true
      })
    });
    
    console.log('📡 Estado de respuesta:', response.status);
    
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Datos recibidos:', data);
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    // Almacenar prompt generado
    promptActual = data.prompt || data.respuesta || 'No se generó prompt.';
    
    // Mostrar prompt en el panel de resultado
    mostrarResultado(promptActual);
    
    // Mostrar botón de copiar
    document.getElementById('btnCopy').style.display = 'flex';
    
    console.log('🎉 Prompt generado exitosamente');
  } catch (error) {
    console.error('💥 Error:', error);
    mostrarError(`Error al generar prompt: ${error.message}`);
  } finally {
    mostrarLoading(false);
  }
}

function mostrarResultado(prompt) {
  const container = document.getElementById('resultContainer');
  
  container.innerHTML = `
    <div class="prompt-result">${escaparHTML(prompt)}</div>
  `;
  
  console.log('📝 Resultado mostrado');
}

function mostrarLoading(show) {
  const loading = document.getElementById('loadingIndicator');
  const btn = document.querySelector('.btn-generate');
  
  if (show) {
    loading.style.display = 'flex';
    btn.disabled = true;
  } else {
    loading.style.display = 'none';
    btn.disabled = false;
  }
}

function mostrarError(mensaje) {
  const errorDiv = document.getElementById('errorMessage');
  errorDiv.textContent = `❌ ${mensaje}`;
  errorDiv.style.display = 'block';
  console.error('⚠️ Error mostrado:', mensaje);
}

function limpiarError() {
  document.getElementById('errorMessage').style.display = 'none';
}

function copiarPrompt() {
  if (!promptActual) {
    mostrarError('No hay prompt para copiar');
    return;
  }
  
  console.log('📋 Copiando prompt al portapapeles');
  
  navigator.clipboard.writeText(promptActual)
    .then(() => {
      console.log('✅ Prompt copiado');
      
      // Feedback visual
      const btn = document.getElementById('btnCopy');
      const originalText = btn.innerHTML;
      
      btn.classList.add('copied');
      btn.querySelector('.copy-text').textContent = '✅ ¡Copiado!';
      
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.querySelector('.copy-text').textContent = 'Copiar al portapapeles';
      }, 2000);
    })
    .catch(err => {
      console.error('❌ Error al copiar:', err);
      mostrarError('Error al copiar al portapapeles');
    });
}

function escaparHTML(texto) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return texto.replace(/[&<>"']/g, m => map[m]);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  console.log('✨ Aplicación cargada');
  
  // Permitir Enter en textarea para generar (Ctrl+Enter)
  const textarea = document.getElementById('descripcionTarea');
  textarea.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      generarPrompt();
    }
  });
  
  // Limpiar error al escribir
  document.getElementById('modeloSelector').addEventListener('change', limpiarError);
  document.getElementById('tipoTarea').addEventListener('change', limpiarError);
  textarea.addEventListener('input', limpiarError);
  
  document.querySelectorAll('input[name="plan"]').forEach(radio => {
    radio.addEventListener('change', limpiarError);
  });
});
