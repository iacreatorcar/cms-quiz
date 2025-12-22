let language = "en";

const questions = {
  en: [
    ["What does CMS stand for?", ["Content Management System","Code Management Software","Central Media Server"], 0, "basics"],
    ["Main purpose of a CMS?", ["Manage hardware","Manage digital content","Replace developers"], 1, "basics"],
    ["Popular CMS?", ["MySQL","WordPress","Python"], 1, "basics"],
    ["Why companies use a CMS?", ["Reduce costs","Manage content efficiently","Remove marketing"], 1, "business"],
    ["Who benefits most?", ["Content editors","Network engineers","Accountants"], 0, "business"],
    ["Key advantage?", ["Fast updates","Fast internet","Free hardware"], 0, "business"],
    ["First implementation step?", ["Install plugins","Define business needs","Design logo"], 1, "security"],
    ["Security action?", ["Never update","Updates & backups","Share passwords"], 1, "security"],
    ["User role management?", ["Salary control","Assign permissions","Create servers"], 1, "security"],
    ["CMS helps marketing by?", ["Hardware control","SEO content","Replacing ads"], 1, "strategy"],
    ["CMS KPI?", ["Servers","Traffic & engagement","Rent cost"], 1, "strategy"],
    ["Long-term benefit?", ["Sustainable growth","No IT","No strategy"], 0, "strategy"]
  ],
  it: [
    ["Cosa significa CMS?", ["Content Management System","Software di codice","Server centrale"], 0, "basics"],
    ["Scopo principale di un CMS?", ["Gestire hardware","Gestire contenuti digitali","Sostituire sviluppatori"], 1, "basics"],
    ["CMS popolare?", ["MySQL","WordPress","Python"], 1, "basics"],
    ["Perché le aziende usano un CMS?", ["Ridurre costi","Gestire contenuti","Eliminare marketing"], 1, "business"],
    ["Chi ne beneficia di più?", ["Editor contenuti","Ingegneri di rete","Contabili"], 0, "business"],
    ["Vantaggio chiave?", ["Aggiornamenti rapidi","Internet veloce","Hardware gratis"], 0, "business"],
    ["Primo passo?", ["Installare plugin","Definire bisogni","Logo"], 1, "security"],
    ["Sicurezza CMS?", ["Mai aggiornare","Aggiornamenti e backup","Condividere password"], 1, "security"],
    ["Gestione ruoli?", ["Stipendi","Permessi","Server"], 1, "security"],
    ["Marketing CMS?", ["Hardware","SEO","Sostituisce ads"], 1, "strategy"],
    ["KPI CMS?", ["Server","Traffico","Affitto"], 1, "strategy"],
    ["Beneficio a lungo termine?", ["Crescita sostenibile","No IT","No strategia"], 0, "strategy"]
  ]
};

function loadQuiz() {
  const form = document.getElementById("quizForm");
  form.innerHTML = "";

  questions[language].forEach((q, i) => {
    let html = `<div class="question"><p>${i+1}. ${q[0]}</p>`;
    q[1].forEach((opt, j) => {
      html += `<input type="radio" name="q${i}" value="${j}"> ${opt}<br>`;
    });
    html += "</div>";
    form.innerHTML += html;
  });
}

function toggleLanguage() {
  language = language === "en" ? "it" : "en";
  document.getElementById("title").innerText =
    language === "en"
      ? "CMS Theory & Business Quiz"
      : "Quiz CMS Teoria e Business";
  loadQuiz();
}

function submitQuiz() {
  let score = 0;
  let skills = { basics:0, business:0, security:0, strategy:0 };
  let count = { basics:0, business:0, security:0, strategy:0 };
  let answersHtml = "<h2>Answers / Risposte</h2>";

  questions[language].forEach((q, i) => {
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    count[q[3]]++;

    if (sel && parseInt(sel.value) === q[2]) {
      score++;
      skills[q[3]]++;
      answersHtml += `<p class="correct">${i+1}: Correct ✔</p>`;
    } else {
      answersHtml += `<p class="wrong">${i+1}: Wrong ✘</p>`;
    }
  });

  localStorage.setItem("cmsQuizScore", score);

  document.getElementById("result").innerHTML =
    `<h2>Score: ${score}/12</h2>`;

  document.getElementById("answers").innerHTML = answersHtml;

  drawChart(skills, count);
}

function drawChart(skills, count) {
  new Chart(document.getElementById("skillChart"), {
    type: 'bar',
    data: {
      labels: ['Basics', 'Business', 'Security', 'Strategy'],
      datasets: [{
        label: 'Skill Level %',
        data: [
          (skills.basics/count.basics)*100,
          (skills.business/count.business)*100,
          (skills.security/count.security)*100,
          (skills.strategy/count.strategy)*100
        ],
        backgroundColor: ['#6c5ce7','#0984e3','#00b894','#fdcb6e'],
        borderRadius: 10
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
}

loadQuiz();
