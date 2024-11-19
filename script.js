const API_KEY ="45e030d7c4044fb1b5d9d4980f07d455";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load" , () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {

    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
         if(!article.urlToImage) return; //only the ones with images are displayed
         const cardClone = newsCardTemplate.content.cloneNode(true); //the content/ entire divs in template-news-card is cloned
         fillDataInCard(cardClone,article);
         cardsContainer.appendChild(cardClone); //all the articles will be clonedd
    });

}

function fillDataInCard(cardClone,article) {

    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} • ${date}`

    cardClone.firstElementChild.addEventListener("click",() => {
        window.open(article.url,"_blank");
    });
}

let currentSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove("active"); //the previous active link will be removed
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add("active");

}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove("active"); //when search is didplayed current nav-item active is removed
    currentSelectedNav = null;

});