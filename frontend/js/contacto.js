document.getElementById('contacto-form').addEventListener('submit', async function(e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const numero = document.getElementById('numero').value;
    const fecha = document.getElementById('fecha').value;
    const telefono = document.getElementById('telefono').value;
    const comentarios = document.getElementById('comentarios').value;
  
    try {
      const response = await fetch('http://localhost:3000/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, numero, fecha, telefono, comentarios })
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Formulario enviado exitosamente');
        document.getElementById('contacto-form').reset();  // Limpiar el formulario después del envío
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el formulario');
    }
  });
  