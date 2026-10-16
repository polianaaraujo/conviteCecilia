const API_URL = "https://script.google.com/macros/s/AKfycbzn9npigbZ00dd5jCej2wLYnDYZnSqN7iwKqZGN21uuTIhEU32R4VhAwP5_47BDOOixWA/exec";
const SENHA_CORRETA = "C0411";

document.addEventListener("DOMContentLoaded", () => {
  if (typeof ScrollReveal === "function") {
    ScrollReveal().reveal(".card", {
      duration: 1200,
      origin: "bottom",
      distance: "60px",
      easing: "ease-out"
    });
  }

  const form = document.getElementById("rsvp-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Verifica a senha antes de enviar
    const campoSenha = document.getElementById("senha");
    const senhaDigitada = campoSenha.value.trim().toUpperCase();

    if (senhaDigitada !== SENHA_CORRETA) {
      alert("Senha incorreta. Confira a senha que você recebeu no convite.");
      campoSenha.value = "";
      campoSenha.focus();
      return;
    }

    const dados = {
      nome: document.getElementById("nome").value,
      acompanhantes: document.getElementById("convidados").value,
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors", // Evita bloqueios de CORS do Google Apps Script
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });

      alert("Presença confirmada com sucesso!");
      form.reset();
    } catch (err) {
      alert("Erro ao enviar confirmação. Tente novamente.");
      console.error(err);
    }
  });
});