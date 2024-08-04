document.addEventListener('DOMContentLoaded', async () => {
  const encuestaContainer = document.getElementById('encuesta');
  const urlParams = new URLSearchParams(window.location.search);
  const encuestaId = urlParams.get('id');

  if (!encuestaId) {
    alert('Encuesta no encontrada');
    window.location.href = 'tomar-encuesta.html';
  }

  try {
    const response = await fetch(`http://localhost:3000/api/encuestas/${encuestaId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const encuesta = await response.json();
    encuestaContainer.innerHTML = `
      <h3>${encuesta.titulo}</h3>
      <p>${encuesta.descripcion}</p>
      ${encuesta.preguntas.map((pregunta, index) => `
        <div class="pregunta">
          <label for="respuesta_${index}">${pregunta.titulo}</label>
          <input type="text" id="respuesta_${index}" name="respuesta_${index}" required>
        </div>
      `).join('')}
    `;
  } catch (error) {
    console.error('Error:', error);
    alert('Hubo un problema cargando la encuesta');
  }
});

async function finalizarEncuesta() {
  const urlParams = new URLSearchParams(window.location.search);
  const encuestaId = urlParams.get('id');
  const respuestas = [];

  let validacionExitosa = true;

  document.querySelectorAll('.pregunta input[type="text"]').forEach((input, index) => {
    const respuesta = input.value.trim();
    if (!respuesta) {
      validacionExitosa = false;
    }
    respuestas.push({
      pregunta: input.getAttribute('name'),
      respuesta
    });
  });

  if (!validacionExitosa) {
    alert('Todas las preguntas deben ser respondidas.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/encuestas/${encuestaId}/responder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ respuestas })
    });

    if (response.ok) {
      alert('Encuesta finalizada exitosamente');
      window.location.href = 'tomar-encuesta.html';
    } else {
      const data = await response.json();
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Hubo un problema al finalizar la encuesta');
  }
}
