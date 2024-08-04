document.addEventListener('DOMContentLoaded', () => {
    const agregarPreguntaBtn = document.getElementById('agregar-pregunta');
    const preguntasContainer = document.getElementById('preguntas');
    let preguntaIndex = 0;
  
    agregarPreguntaBtn.addEventListener('click', () => {
      preguntaIndex++;
      const preguntaDiv = document.createElement('div');
      preguntaDiv.innerHTML = `
        <label for="pregunta_${preguntaIndex}">Título de la pregunta:</label>
        <input type="text" id="pregunta_${preguntaIndex}" name="pregunta_${preguntaIndex}" required>
      `;
      preguntasContainer.appendChild(preguntaDiv);
    });
  
    const encuestaForm = document.getElementById('encuesta-form');
    encuestaForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const titulo = document.getElementById('titulo').value;
      const descripcion = document.getElementById('descripcion').value;
      const preguntas = [];
  
      for (let i = 1; i <= preguntaIndex; i++) {
        const preguntaTitulo = document.getElementById(`pregunta_${i}`).value;
        preguntas.push({ titulo: preguntaTitulo });
      }
  
      try {
        const response = await fetch('http://localhost:3000/api/encuestas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ titulo, descripcion, preguntas })
        });
  
        if (response.ok) {
          alert('Encuesta creada exitosamente');
          window.location.href = 'tomar-encuesta.html';
        } else {
          const data = await response.json();
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema creando la encuesta');
      }
    });
  });
  