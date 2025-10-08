// Accesibilidad y UX progresiva
document.addEventListener("DOMContentLoaded", () => {
  // ===== Menú hamburguesa accesible =====
  const burger = document.getElementById("menuButton");
  const nav = document.getElementById("primary-nav");
  if (burger && nav) {
    const toggleMenu = () => {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("nav-open");
      burger.classList.toggle("open");
      if (!expanded) {
        // Mover foco al primer enlace cuando se abre
        const firstLink = nav.querySelector("a");
        if (firstLink) firstLink.focus();
      } else {
        burger.focus();
      }
    };
    burger.addEventListener("click", toggleMenu);

    // Cerrar con ESC
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        burger.getAttribute("aria-expanded") === "true"
      ) {
        toggleMenu();
      }
    });

    // Cerrar al hacer click en un enlace
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (burger.getAttribute("aria-expanded") === "true") toggleMenu();
      });
    });
  }

  // ===== Navegación con desplazamiento (respeta reduce motion) =====
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: prefersReduced ? "auto" : "smooth",
          });
          target.classList.add("section-highlight");
          setTimeout(() => target.classList.remove("section-highlight"), 1200);
        }
      }
    });
  });

  // ===== Formulario accesible =====
  const form = document.getElementById("formContacto");
  if (form) {
    const notificaciones = document.getElementById("form-notificaciones");
    const campos = [
      {
        id: "nombre",
        errorId: "error-nombre",
        validator: (v) => v.trim().length >= 2,
        msg: "Escribe tu nombre (mínimo 2 caracteres).",
      },
      {
        id: "correo",
        errorId: "error-correo",
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        msg: "Escribe un correo válido (ej. usuario@dominio.com).",
      },
      {
        id: "mensaje",
        errorId: "error-mensaje",
        validator: (v) => v.trim().length >= 10,
        msg: "Escribe un mensaje (mínimo 10 caracteres).",
      },
    ];

    const setError = (input, errorEl, message) => {
      input.setAttribute("aria-invalid", "true");
      errorEl.textContent = message;
    };

    const clearError = (input, errorEl) => {
      input.removeAttribute("aria-invalid");
      errorEl.textContent = "";
    };

    campos.forEach(({ id, errorId, validator, msg }) => {
      const input = document.getElementById(id);
      const errorEl = document.getElementById(errorId);
      if (!input || !errorEl) return;
      input.addEventListener("input", () => {
        validator(input.value)
          ? clearError(input, errorEl)
          : setError(input, errorEl, msg);
      });
      input.addEventListener("blur", () => {
        if (!validator(input.value)) setError(input, errorEl, msg);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valido = true;
      campos.forEach(({ id, errorId, validator, msg }) => {
        const input = document.getElementById(id);
        const errorEl = document.getElementById(errorId);
        if (!validator(input.value)) {
          setError(input, errorEl, msg);
          if (valido) input.focus();
          valido = false;
        } else {
          clearError(input, errorEl);
        }
      });

      if (!valido) {
        notificaciones.textContent = "Revisa los errores del formulario.";
        return;
      }

      const nombre = document.getElementById("nombre").value.trim();
      form.reset();
      notificaciones.textContent = `¡Gracias, ${nombre}! Tu mensaje ha sido enviado con éxito.`;
    });
  }
});
