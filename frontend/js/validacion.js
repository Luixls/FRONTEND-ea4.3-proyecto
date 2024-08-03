document.getElementById('contacto-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const numero = document.getElementById('numero').value;
    const fecha = document.getElementById('fecha').value;
    const telefono = document.getElementById('telefono').value;
    const archivo = document.getElementById('archivo').files[0];
  
    if (!email || !numero || !fecha || !telefono || !archivo) {
      alert('Por favor, complete todos los campos');
      return;
    }
  
    // Más validaciones pueden ser desarrolladas aquí
  
    // Si la validación es exitosa, enviar los datos al backend
    enviarDatos({ email, numero, fecha, telefono, archivo });
  });
  
  function enviarDatos(datos) {
    // Lógica para enviar los datos al backend por aquí
    console.log(datos);
  }
  