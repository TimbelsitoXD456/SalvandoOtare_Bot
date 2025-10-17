async function preguntar() {
  const pregunta = document.getElementById('pregunta').value;
  document.getElementById('respuesta').innerText = "Pensando...";
  const res = await fetch('/.netlify/functions/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pregunta })
  });
  const data = await res.json();
  document.getElementById('respuesta').innerText = data.respuesta || "No se pudo obtener respuesta.";
}