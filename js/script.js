// load category
const loadCategory = async () => {
 const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
 const data = await res.json();
 showCategory(data.categories);
}
loadCategory();

// show category 
const showCategory = (category) => {
 console.log(category)
 const categoryDiv = document.getElementById("categories");
 category.forEach(element => {
  console.log(element.category)
  // create a button
  const buttonContainer = document.createElement("div");
  buttonContainer.innerHTML = `
    <button id = "btn-${element.category}" onclick = "loadCategoryVideo(${element.category})" class = "btn category-btn" >${element.category} </button>
    `
  //  add button to the category container
  categoryDiv.append(buttonContainer);
 });
}