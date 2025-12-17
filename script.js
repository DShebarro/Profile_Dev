// Em DEV: backend local. Em produção troque pela URL do Render.
const API_BASE_URL = "https://portifolio-backend-t5w2.onrender.com/";
// ex. produção: const API_BASE_URL = "https://seu-backend.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // YEAR
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // PROFILE
  document.getElementById("profile-name").textContent = profile.name;
  document.getElementById(
    "profile-tagline"
  ).textContent = `${profile.role}. ${profile.tagline}`;
  document.getElementById("profile-description").textContent =
    profile.description;

  document.getElementById("github").href = profile.social.github;
  document.getElementById("linkedin").href = profile.social.linkedin;
  document.getElementById("mail").href = profile.social.email;
  document.getElementById("instagram").href = profile.social.instagram;

  // SKILLS
  function renderSkills() {
    const container = document.getElementById("skills-container");

    container.innerHTML = skills
      .map(
        (s) => `
          <div class="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-400 transition">
            <div class="flex items-center gap-3 text-emerald-400 mb-4">
              <i data-lucide="${s.icon}"></i>
              <h3 class="text-xl font-semibold">${s.category}</h3>
            </div>

            <div class="flex flex-wrap gap-2">
              ${s.items
                .map(
                  (item) =>
                    `<span class="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-sm">${item}</span>`
                )
                .join("")}
            </div>
          </div>
        `
      )
      .join("");

    lucide.createIcons();
  }

  renderSkills();

  // PROJECTS
  function renderProjects() {
    const container = document.getElementById("projects-container");

    container.innerHTML = projects
      .map(
        (p) => `
          <div class="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-400 transition">
            <img src="${p.image}" class="w-full h-48 object-cover">

            <div class="p-6">
              <h3 class="text-xl font-bold">${p.title}</h3>
              <p class="text-slate-400 text-sm mt-2">${p.desc}</p>

              <div class="flex flex-wrap gap-2 mt-4">
                ${p.techs
                  .map(
                    (t) =>
                      `<span class="text-xs px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded">${t}</span>`
                  )
                  .join("")}
              </div>

              <div class="flex gap-4 mt-4">
                <a href="${p.liveLink}" class="text-slate-300 hover:text-white">Demo</a>
                <a href="${p.repoLink}" class="text-slate-300 hover:text-white">Código</a>
              </div>
            </div>
          </div>
        `
      )
      .join("");

    lucide.createIcons();
  }

  renderProjects();

  // MOBILE MENU
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenuBtn.innerHTML = mobileMenu.classList.contains("hidden")
      ? '<i data-lucide="menu"></i>'
      : '<i data-lucide="x"></i>';

    lucide.createIcons();
  });

  // FORM CONTATO + BACKEND
  const form = document.getElementById("contact-form");
  const success = document.getElementById("success-message");
  const submitBtn = document.getElementById("submit-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i data-lucide="loader"></i> Enviando...';
    lucide.createIcons();

    try {
      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        success.classList.remove("hidden");
        form.reset();
        console.log("Mensagem salva:", data);
        setTimeout(() => success.classList.add("hidden"), 3000);
      } else {
        alert(data.error || "Erro ao enviar mensagem.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i data-lucide="send"></i> Enviar Mensagem';
      lucide.createIcons();
    }
  });

  // VIEW COUNTER
  // function updateViewCounter() {
  //   const namespace = "d-shebarro-portfolio";
  //   const key = "site-views";
  //   const counterElement = document.getElementById("view-counter");

  //   fetch(`https://api.simplecounter.co/v1/hit/${namespace}/${key}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       counterElement.textContent = data.value;
  //     })
  //     .catch(() => {
  //       counterElement.textContent = "N/A";
  //     });
  // }

  // updateViewCounter();
});
