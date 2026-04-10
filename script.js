const API_KEY = "COLOQUE_SUA_NOVA_API_KEY_AQUI";
const BASE_URL = "https://v3.football.api-sports.io";

function fetchData(url) {
  return fetch(url, {
    headers: {
      "x-apisports-key": API_KEY
    }
  })
  .then(res => res.json())
  .then(data => data.response);
}

// 🔴 Jogos ao vivo
function loadLive() {
  document.getElementById("content").innerHTML = "Carregando...";

  fetchData(`${BASE_URL}/fixtures?live=all`)
    .then(matches => renderMatches(matches));
}

// 📅 Jogos de hoje
function loadToday() {
  document.getElementById("content").innerHTML = "Carregando...";

  const today = new Date().toISOString().split("T")[0];

  fetchData(`${BASE_URL}/fixtures?date=${today}`)
    .then(matches => renderMatches(matches));
}

// 🎯 Renderizar jogos
function renderMatches(matches) {
  if (matches.length === 0) {
    document.getElementById("content").innerHTML = "Nenhum jogo encontrado.";
    return;
  }

  let html = "";

  matches.forEach(match => {
    html += `
      <div class="match">
        <strong>${match.teams.home.name}</strong>
        ${match.goals.home ?? 0} - ${match.goals.away ?? 0}
        <strong>${match.teams.away.name}</strong>
        <br>
        <small>${match.league.name}</small>
        <br>
        Status: ${match.fixture.status.short}
      </div>
    `;
  });

  document.getElementById("content").innerHTML = html;
}

// 🚀 Carregar automaticamente ao abrir
loadLive();

// 🔄 Atualizar a cada 30s (tipo Flashscore)
setInterval(loadLive, 30000);
