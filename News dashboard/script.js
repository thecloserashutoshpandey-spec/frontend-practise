const searchBtn = document.getElementById("searchBtn");
const newsInput = document.getElementById("newsInput");
const newsContainer = document.getElementById("newsContainer");
const errorMsg = document.getElementById("errorMsg");
const loader = document.getElementById("loader");

async function fetchNews(topic) {
    errorMsg.innerText = "";
    newsContainer.innerHTML = "";
    loader.classList.remove("hidden");

    try {
        // Using the teacher's API URL
        const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${topic}`);
        const data = await response.json();

        loader.classList.add("hidden");

        if (!data.hits || data.hits.length === 0) {
            throw new Error("No news found for this topic.");
        }

        displayNews(data.hits);
    } catch (err) {
        loader.classList.add("hidden");
        errorMsg.innerText = "Error: " + err.message;
    }
}

function displayNews(stories) {
    stories.forEach(story => {
        // Some HN items don't have titles or URLs, skip them
        if (!story.title || !story.url) return;

        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
            <h3>${story.title}</h3>
            <p>By: <strong>${story.author}</strong> | Points: ${story.points || 0}</p>
            <a href="${story.url}" target="_blank">Read Article →</a>
        `;
        newsContainer.appendChild(card);
    });
}


searchBtn.addEventListener("click", () => {
    const query = newsInput.value.trim();
    if (query) fetchNews(query);
});

newsInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchBtn.click();
});


window.addEventListener("load", () => {
    fetchNews("popular");
});