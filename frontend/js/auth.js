document.addEventListener("DOMContentLoaded", () => {
  const registroForm = document.getElementById("registro-form");
  const loginForm = document.getElementById("login-form");
  const logoutButton = document.getElementById("logout");
  const protectedPages = [
    "encuesta.html",
    "tomar-encuesta.html",
    "responder-encuesta.html",
    "contacto.html",
    "buscar.html",
  ];
  const authPages = ["login.html", "registro.html"];

  // Redirigir a login si no está autenticado
  if (protectedPages.includes(window.location.pathname.split("/").pop())) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debe iniciar sesión para acceder a esta página");
      window.location.href = "login.html";
    }
  }

  // Redirigir a la página principal si ya está autenticado
  if (authPages.includes(window.location.pathname.split("/").pop())) {
    const token = localStorage.getItem("token");
    if (token) {
      alert(
        "Ya tienes una sesión iniciada. No es necesario iniciar sesión o registrarse nuevamente."
      );
      window.location.href = "index.html";
    }
  }

  if (registroForm) {
    registroForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, email, password }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          alert("Registro exitoso");
          localStorage.setItem("token", data.token);
          window.location.href = "login.html";
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error en el registro");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Inicio de sesión exitoso");
          localStorage.setItem("token", data.token);
          window.location.href = "index.html";
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error en el inicio de sesión");
      }
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      alert("Sesión cerrada");
      window.location.href = "login.html";
    });
  }
});
