const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search--input");
const sortSelectInput = document.getElementById("sortby");
const limitSelectInput = document.getElementById("limit");

///////////////////////////////////////////// Form Event Listener
searchForm.addEventListener("submit", e => {
  // Get user input values
  const searchTerm = searchInput.value;
  const sortBy = sortSelectInput.value;
  const searchLimit = limitSelectInput.value;
  console.log(searchTerm, sortBy, searchLimit);

  // Clear Input
  searchInput.value = "";

  // Search Reddit
  getRedditData(searchTerm, sortBy, searchLimit).then(results => {
    // TESTING
    console.log(results);

    // Inject into UI
    let output = `<div class="card-wrapper">`;
    results.forEach(post => {
      // Check for Image
      const image = post.preview
        ? post.preview.images[0].source.url
        : "http://www.listoid.com/image/162/list_1_162_20110112_084040_387.png";
      // Loop through posts
      output += `
      <div class="card">
      <img
        src="${image}"
        alt="Person"
        class="card--img"
      />
      <h1>${truncateText(post.title, 100)}</h1>
     <p class="job-title">by: ${post.author}</p>
      <p class="about">
        ${truncateText(post.selftext, 100)}...
      </p>
      <a href="${post.url}" class="btn" target="_blank">Read More</a>
      <ul class="card-footer">
        <div class="card-footer--left">
          <p>Jan 19 2018 &nbsp; &#8226; &nbsp;</p>

          <span> <i class="fas fa-star icon--star">&nbsp;</i>${post.ups} </span>
        </div>
        <div class="card-footer--right">
          <i class="fas fa-th-list icon--list"></i>
          <i class="fas fa-heart icon--heart"></i>
        </div>
      </ul>
    </div>
      `;
    });
    output += `</div>`;

    document.getElementById("results").innerHTML = output;
  });

  e.preventDefault();
});

///////////////////////////////////////////// Truncate Text

const truncateText = (string, stringLimit) => {
  const shortened = string.indexOf(" ", stringLimit);
  if (shortened == -1) return string;
  return string.substring(0, shortened);
};

///////////////////////////////////////////// Get Reddit Data

const getRedditData = (searchTerm, sortBy, searchLimit) => {
  return fetch(
    `http://www.reddit.com/search.json?q=${searchTerm}&sor${sortBy}&limit=${searchLimit}`
  )
    .then(res => res.json()) // parse into json format
    .then(data => data.data.children.map(data => data.data)) // store data in json object
    .catch(err => alert(err));
};
