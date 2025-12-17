document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // YEAR
  // document.getElementById("year").textContent = new Date().getFullYear();
  // Atualiza o ano automaticamente
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
                            <a href="${
                              p.liveLink
                            }" class="text-slate-300 hover:text-white">Demo</a>
                            <a href="${
                              p.repoLink
                            }" class="text-slate-300 hover:text-white">Código</a>
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
  const mobileMenu    = document.getElementById("mobile-menu");

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenuBtn.innerHTML = mobileMenu.classList.contains("hidden")
      ? '<i data-lucide="menu"></i>'
      : '<i data-lucide="x"></i>';

    lucide.createIcons();
  });

  // FORMS
  const form      = document.getElementById("contact-form");
  const success   = document.getElementById("success-message");
  const submitBtn = document.getElementById("submit-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name    = document.getElementById("name").value;
    const email   = document.getElementById("email").value;
    const message = document.getElementById("message").value

    submitBtn.disabled  = true;
    submitBtn.innerHTML = "Enviando...";
    
    // setTimeout(() => {
    //   success.classList.remove("hidden");
    //   form.reset();
    //   submitBtn.disabled  = false;
    //   submitBtn.innerHTML = '<i data-lucide="send"></i> Enviar Mensagem';
    //   lucide.createIcons();
    //   setTimeout(() => success.classList.add("hidden"), 3000);
    // }, 1500);

    try {
      const response = await fetch("https://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      
      if (response.ok) {
        success.classicList.remove("hidden");
        form.requestFullscreen();
        submitBtn.innerHTML = '<i data-lucide="send"></i> Enviar Mensagem';
        lucide.createIcons();
 
        setTimeout(() => success.classList.add("hidden"), 3000);
      } else {
        alert("Erro ao enviar mensagem, Tente novamente!");
      }
    } catch (error) {
      console.error("Erro", arror);
      alert("Erro de conexão. Verifique a URL do bankend");
    } finally {
      submitBtn.disabled = false;
    }

});

  // VIEW COUNTER
  function updateViewCounter() {
    // Usamos o seu nome de usuário do GitHub para criar uma chave única para o contador.
    const namespace = "d-shebarro-portfolio";
    const key = "site-views";
    const counterElement = document.getElementById("view-counter");

    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
      .then((res) => res.json())
      .then((data) => {
        counterElement.textContent = data.value;
      })
      .catch(() => (counterElement.textContent = "N/A"));
  }
  updateViewCounter();
});
