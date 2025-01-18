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
}