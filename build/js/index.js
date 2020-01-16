const searchForm = document.getElementById("search--form");
const searchInput = document.getElementById("search--input");
const sortSelectInput = document.getElementById("sortby");
const limitSelectInput = document.getElementById("limit");

///////////////////////////////////////////// FORM EVENT LISTENER
searchForm.addEventListener("submit", e => {
  e.preventDefault();
  // Get user input values
  const searchTerm = searchInput.value;
  const sortBy = sortSelectInput.value;
  const searchLimit = limitSelectInput.value;
  console.log(searchTerm, sortBy, searchLimit);

  ////// INPUT IF VALIDATION-- MIGHT DELETE
  if (searchTerm === "") {
    showMessage("Please add a search term");
  }
});
