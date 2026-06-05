async function preguntar() {
  console.log('🟢 Función preguntar iniciada');
  
  const pregunta = document.getElementById('pregunta').value;
  console.log('❓ Pregunta ingresada:', pregunta);
  
  if (!pregunta.trim()) {
    console.log('⚠️ Pregunta vacía');
    document.getElementById('respuesta').innerText = "Por favor, escribe una pregunta.";
    return;
  }
  
  console.log('⏳ Mostrando estado "Pensando..."');
  document.getElementById('respuesta').innerText = "Pensando...";
  
  try {
    console.log('🌐 Enviando fetch a /.netlify/functions/ask');
    const res = await fetch('/.netlify/functions/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pregunta })
    });
    
    console.log('📡 Estado de respuesta:', res.status, res.statusText);
    
    if (!res.ok) {
      console.log('❌ Error HTTP:', res.status);
      document.getElementById('respuesta').innerText = `Error: ${res.status} - ${res.statusText}`;
      return;
    }
    
    console.log('📦 Parseando JSON de respuesta...');
    const data = await res.json();
    console.log('✅ Datos recibidos:', data);
    
    const respuestaTexto = data.respuesta || "No se pudo obtener respuesta.";
    console.log('💬 Respuesta final:', respuestaTexto);
    
    console.log('🎨 Mostrando respuesta en pantalla...');
    document.getElementById('respuesta').innerText = respuestaTexto;
    
    console.log('🎉 Proceso completado exitosamente');
  } catch (error) {
    console.error('💥 Error en la función:', error);
    document.getElementById('respuesta').innerText = `Error: ${error.message}`;
  }
}
