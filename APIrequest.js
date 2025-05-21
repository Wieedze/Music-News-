import { apiKey } from './config.js';

const newsContainer = document.getElementById('news-container');
const topicsContainer = document.getElementById('topics-container');
const historyContainer = document.querySelector('aside.right');

const topics = {
    pluginsVST: [
        "Virtual synths",
        "Reverb plugins",
        "Delay plugins",
        "EQ plugins",
        "Compression plugins",
        "Mastering plugins",
        "Free plugins",
        "Vintage plugins",
        "Creative effects",
        "AI plugins"
    ],
    mao: [
        "Music production",
        "Sound design",
        "Beatmaking",
        "Audio mixing",
        "Audio mastering",
        "Sampling techniques",
        "Home studio recording",
        "Vocal processing",
        "Automation",
        "MAO templates"
    ],
    daw: [
        "Ableton Live",
        "FL Studio",
        "Logic Pro",
        "Cubase",
        "Pro Tools",
        "Reaper",
        "Studio One",
        "Bitwig Studio",
        "DAW comparison",
        "DAW for beginners"
    ],
    musicTech: [
        "AI-generated music",
        "Spatialized music",
        "3D audio",
        "Blockchain & music",
        "Music NFTs",
        "Virtual reality & music",
        "Music streaming",
        "Recommendation algorithms",
        "Granular synthesis",
        "MIDI controllers"
    ],
    Brands : [
        "Waves Audio",
        "Native Instruments",
        "FabFilter",
        "Spectrasonics",
        "iZotope",
        "Plugin Alliance",
        "U-He",
        "Arturia",
        "Softube",
        "Valhalla DSP"
    ],
};

function displayTopics() {
    topicsContainer.innerHTML = '';

    const themeLabels = {
        pluginsVST: 'Plugins VST',
        mao: 'MAO',
        daw: 'DAW',
        musicTech: 'Music Tech'
    };

    for (const theme in topics) {
        const themeTitle = document.createElement('h2');
        themeTitle.textContent = themeLabels[theme] || theme;
        topicsContainer.appendChild(themeTitle);

        const ul = document.createElement('ul');
        ul.style.listStyle = 'none';
        ul.style.paddingLeft = '0';

        topics[theme].forEach(topic => {
            const li = document.createElement('li');
            li.textContent = topic;
            li.style.cursor = 'pointer';
            li.style.marginBottom = '6px';
            li.style.color = '#D69F7E';

            li.addEventListener('click', () => {
                fetchNews(topic);
                addToHistory(topic);
            });

            ul.appendChild(li);
        });

        topicsContainer.appendChild(ul);
    }
}

function fetchNews(keyword) {
    const searchTerm = `music ${keyword}`;
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&apiKey=${apiKey}`;

    newsContainer.innerHTML = '<p>Chargement des actualités...</p>';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur HTTP: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            newsContainer.innerHTML = '';
            if (data.articles.length === 0) {
                newsContainer.innerHTML = '<p>Aucun article trouvé.</p>';
                return;
            }

            data.articles.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.className = 'article';

                articleDiv.innerHTML = `
                    <h3>${article.title || "Pas de titre"}</h3>
                    <p>${article.description || "Pas de description"}</p>
                    ${article.urlToImage ? `<img src="${article.urlToImage}" alt="Image article">` : ''}
                    <p>${article.content || ""}</p>
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer">Lire l'article complet</a>
                `;

                newsContainer.appendChild(articleDiv);
            });
        })
        .catch(error => {
            newsContainer.innerHTML = `<p style="color:red;">Erreur lors de la récupération des données : ${error.message}</p>`;
            console.error(error);
        });
}

function addToHistory(keyword) {
    const existingItems = Array.from(historyContainer.querySelectorAll('li'))
        .map(li => li.textContent);

    if (existingItems.includes(keyword)) return;

    let historyTitle = historyContainer.querySelector('h3');
    if (!historyTitle) {
        historyTitle = document.createElement('h3');
        historyTitle.textContent = 'Historique des filtres';
        historyContainer.appendChild(historyTitle);
    }

    let ul = historyContainer.querySelector('ul');
    if (!ul) {
        ul = document.createElement('ul');
        ul.style.listStyle = 'none';
        ul.style.paddingLeft = '0';
        historyContainer.appendChild(ul);
    }

    const li = document.createElement('li');
    li.textContent = keyword;
    li.style.cursor = 'pointer';
    li.style.marginBottom = '6px';
    li.style.color = '#D69F7E';

    li.addEventListener('click', () => {
        fetchNews(keyword);
    });

    ul.appendChild(li);


    if (!historyContainer.querySelector('#clear-history-btn')) {
        const clearBtn = document.createElement('button');
        clearBtn.id = 'clear-history-btn';
        clearBtn.textContent = 'Vider l’historique';
        clearBtn.style.marginTop = '10px';
        clearBtn.style.padding = '6px 10px';
        clearBtn.style.backgroundColor = '#774936';
        clearBtn.style.color = 'white';
        clearBtn.style.border = 'none';
        clearBtn.style.cursor = 'pointer';
        clearBtn.style.borderRadius = '6px';

        clearBtn.addEventListener('click', () => {
            const ul = historyContainer.querySelector('ul');
            if (ul) ul.remove(); 
            const h3 = historyContainer.querySelector('h3');
            if (h3) h3.remove();
            clearBtn.remove();   
        });

    historyContainer.appendChild(clearBtn);
}

}

document.addEventListener('DOMContentLoaded', () => {
    displayTopics();
});
