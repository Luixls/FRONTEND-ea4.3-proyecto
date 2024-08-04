document.addEventListener('DOMContentLoaded', async () => {
    const encuestasContainer = document.getElementById('encuestas');
    const buscarInput = document.getElementById('buscar');
  
    async function cargarEncuestas() {
      try {
        const response = await fetch('http://localhost:3000/api/encuestas', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const encuestas = await response.json();
  
        encuestasContainer.innerHTML = encuestas.map(encuesta => `
          <div class="encuesta">
            <h3>${encuesta.titulo}</h3>
            <p>${encuesta.descripcion}</p>
            <button onclick="tomarEncuesta('${encuesta._id}')">Tomar Encuesta</button>
          </div>
        `).join('');
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema cargando las encuestas');
      }
    }
  
    cargarEncuestas();
  
    buscarInput.addEventListener('input', async () => {
      const busqueda = buscarInput.value.toLowerCase();
      const encuestas = document.querySelectorAll('.encuesta');
      encuestas.forEach(encuesta => {
        const titulo = encuesta.querySelector('h3').textContent.toLowerCase();
        if (titulo.includes(busqueda)) {
          encuesta.style.display = '';
        } else {
          encuesta.style.display = 'none';
        }
      });
    });
  });
  
  function tomarEncuesta(id) {
    window.location.href = `responder-encuesta.html?id=${id}`;
  }
  