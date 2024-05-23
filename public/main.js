let API_KEY = '6a0cfcfcd64b4f91bcd61b3acb9a0c4f';
let newsList = [];
const menu = document.querySelectorAll(".menu button");
menu.forEach(menuItem => menuItem.addEventListener("click", (event) => getNewsByCategory(event)));
document.getElementById('search-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    getNewsByKeyword();
  }
});

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;
let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&pageSize=${pageSize}`);

const getNews = async () => {
  try {
    url.searchParams.set("page", page)
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No results found");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestnews = async () => {
  url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&pageSize=${pageSize}`);
  try {
    url.searchParams.set("page", page)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("ddd", data)
  } catch (error) {
    errorRender(error.message);
  }
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  page = 1
  url = new URL(`https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${API_KEY}&pageSize=${pageSize}`);
  getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(`https://newsapi.org/v2/top-headlines?q=${keyword}&country=us&apiKey=${API_KEY}&pageSize=${pageSize}`);
  getNews();
};

const render = () => {
  const newsHTML = newsList.map(news => `
    <a style=" text-decoration: none;" href="${news.url}" target="_blank">
    <div class="row news">
    
      <div class="col-lg-4">
        <img class="news-img-size" src="${news.urlToImage}" alt="Image not available"/>
      </div>
      <div class="col-lg-8">
<h2>${news.title}</h2>
        <p>${news.description}</p>
        <div>${news.source.name} • ${new Date(news.publishedAt).toLocaleString()}</div>
      </div>
      
    </div>
    </a>
  `).join('');
  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-warning"  role="alert"> ${errorMessage} </div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};


const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const halfGroupSize = Math.floor(groupSize / 2);

  let firstPage = Math.max(1, page - halfGroupSize);
  let lastPage = firstPage + groupSize - 1;

  if (lastPage > totalPages) {
    lastPage = totalPages;
    firstPage = Math.max(1, lastPage - groupSize + 1);
  }

  let paginationHTML = `<a class="page-link" onclick="moveToPage(${page - 1})" href="#">Previous</a>`;
  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${i === page ? `active` : ``}" onclick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`;
  }
  paginationHTML += `<a class="page-link" onclick="moveToPage(${page + 1})" href="#">Next</a>`;

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  console.log("movetopage", pageNum)
  page = pageNum
  getNews()
}

getLatestnews();