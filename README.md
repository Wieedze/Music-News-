# 🎧 Music News Explorer

**Music News Explorer** is a web app that lets users explore the latest music technology news using the [NewsAPI](https://newsapi.org/). It offers curated filters by topic—such as DAWs, VST plugins, sound design, and music tech—and displays relevant news articles. Selected filters are stored in a history sidebar for easy access.

---

## 🔍 Features

- Categorized music-related topics (VST Plugins, DAWs, Music Production, etc.)
- Fetches real-time news from NewsAPI
- Filter history sidebar to revisit previously selected topics
- Clean and responsive UI
- Topics and filters dynamically generated from JS object

---

## 📂 Project Structure

📁 /project-root
│
├── index.html # Main HTML layout
├── styles.css # UI styles
└── script.js # All JavaScript logic (topics, API calls, history)

yaml
Copier
Modifier

---

## ⚙️ Technologies Used

- HTML5 / CSS3
- Vanilla JavaScript (ES6+)
- [NewsAPI](https://newsapi.org/) for fetching articles

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/music-news-explorer.git
cd music-news-explorer
2. Open in your browser
Just open index.html in your browser.

🔐 Note: You need a valid NewsAPI key. Replace the placeholder in script.js:

js
Copier
Modifier
const apiKey = 'your-api-key-here';
🧠 Ideas for Future Features
Save history in localStorage

Add pagination for news results

Allow multi-topic filtering

Switch between light/dark mode

📸 Preview

📄 License
This project is licensed under the MIT License. Feel free to use, modify, and share it.

🙌 Acknowledgments
NewsAPI.org – for providing news data

Your feedback and contributions are welcome!