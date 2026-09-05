const repositoryList = document.querySelector("#repository-list");

function formatStars(stars) {
  return new Intl.NumberFormat("pt-BR").format(stars);
}

function renderRepositories(repositories) {
  repositoryList.innerHTML = repositories
    .map(
      (repository) => `
        <li class="repository">
          <h2>
            <a href="${repository.url}" target="_blank" rel="noopener noreferrer">
              ${repository.name}
            </a>
          </h2>
          <p>${repository.description}</p>
          <div class="repository-meta">
            <span>Linguagem: ${repository.language}</span>
            <span>${formatStars(repository.stars)} estrelas</span>
          </div>
        </li>
      `
    )
    .join("");
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Falha ao carregar events.json: ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    repositoryList.innerHTML =
      '<li class="status error">Não foi possível carregar os repositórios favoritos.</li>';
    console.error(error);
  }
}

loadRepositories();
