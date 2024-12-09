let loading = document.getElementById("spinner");
let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");

function oneSearch(oneResult) {
  let { title, link, description } = oneResult;

  //result container
  let resultContainer = document.createElement("div");
  resultContainer.classList.add("result-item");
  searchResults.appendChild(resultContainer);
  //create title
  let head = document.createElement("a");
  head.textContent = title;
  head.classList.add("result-title");
  head.href = link;
  head.target = "_blank";
  resultContainer.appendChild(head);
  //break
  let breakEl = document.createElement("br");
  resultContainer.appendChild(breakEl);
  //HTMLAnchorElement
  let anchor = document.createElement("a");
  anchor.href = link;
  anchor.textContent = link;
  anchor.target = "_blank";
  anchor.classList.add("result-url");
  resultContainer.appendChild(anchor);
  //description
  let para = document.createElement("p");
  para.textContent = description;
  para.classList.add("link-description");
  resultContainer.appendChild(para);
  //break
  let breakEl2 = document.createElement("br");
  resultContainer.appendChild(breakEl2);
}

function createAndAppend(jsonData) {
  let { search_results } = jsonData;
  loading.classList.toggle("d-none");

  for (let eachItem of search_results) {
    oneSearch(eachItem);
  }
}

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    let searchKey = searchInput.value;
    loading.classList.toggle("d-none");

    searchResults.textContent = "";

    let url = "https://apis.ccbp.in/wiki-search?search=" + searchKey;
    let options = {
      method: "GET",
    };
    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        createAndAppend(jsonData);
      });
  }
});
