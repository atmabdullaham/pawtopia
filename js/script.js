// load category
const loadCategory = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
  const data = await res.json();
  showCategory(data.categories);
}
loadCategory();

// show category 
const showCategory = (category) => {
  // console.log(category)
  const categoryDiv = document.getElementById("categories");
  category.forEach(element => {
    // const category = element.category.toLowerCase();
    // console.log(category);
    // console.log(element.category)
    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.classList = "py-6"
    buttonContainer.innerHTML = `
    <button onclick = "loadPetsCategory('${element.category.toLowerCase()}')" class = "flex gap-4 my-6  btn border bg-slate-100 px-10 font-bold text-xl"> <img class = "w-[30px]" src ="${element.category_icon}" />  ${element.category} </button>
    `
    //  add button to the category container
    categoryDiv.append(buttonContainer);
  });
}

const loadPet = async () => {
  document.getElementById("spin").classList.add("hidden")
  document.getElementById("pet-card").classList.add("grid")

  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
  const data = await res.json();
  showPets(data.pets)
  // console.log(data)
}

const showSpinner = () => {
  document.getElementById("spin").classList.remove("hidden");
  document.getElementById("pet-card").classList.remove("grid")
}
showSpinner();

setTimeout(function () {
  loadPet()
}, 1000)

const loadPetsCategory = async (petCategory) => {
  // console.log(petCategory)
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${petCategory}`)
  const data = await res.json();
  showPets(data.data);
}
const showPets = (pets) => {
  const petCardContainer = document.getElementById("pet-card");
  petCardContainer.innerHTML = "";
  pets.forEach(pet => {
    // console.log(pet)
    const cardDiv = document.createElement("div")
    cardDiv.classList = " bg-base-100  shadow-xl border-gray-300 border"
    cardDiv.innerHTML = `
    <figure class="px-5 pt-5">
    <img
     src= ${pet.image}
     alt="Pet"
     class="rounded-xl" />
   </figure>
   <div class=" p-5 flex flex-col gap-3">
    <h2 class="text-2xl font-bold">${pet.pet_name}</h2>
    <p class = ""><i class="fa-solid fa-qrcode"></i> Breed: ${pet.breed}</p>
    <p><i class="fa-solid fa-calendar-days"></i> Birth: ${pet.date_of_birth}</p>
    <p><i class="fa-solid fa-mars-and-venus"></i> Gender: ${pet.gender}</p>
    <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price}</p>
    <hr>
    <div class=" flex justify-between card-actions ">
     <button onclick = "showLikedPic('${pet.image}')" class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
     <button onclick = "openCloseModal()" class="btn openModal text-teal-600 text-lg font-semibold">Adopt</button>
     <button onclick="loadDetails('${pet.petId}')" class="btn text-teal-600 text-lg font-semibold">Details</button>
    </div>
   </div>
  `
    petCardContainer.appendChild(cardDiv)


  });
}

const showLikedPic = (image) => {
  // console.log(image)
  const likedPetsContainer = document.getElementById("liked-pets")
  const picContainer = document.createElement("div")
  picContainer.classList = "bg-base-100 border rounded-xl max-h-fit"
  picContainer.innerHTML = `
     <figure class="p-2 rounded-xl">
    <img
     src= ${image}
     alt="Pet"
     class="rounded-xl" />
   </figure>
  `
  likedPetsContainer.appendChild(picContainer)
}

const loadDetails = async (id = "1") => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
  const data = await res.json();
  my_modal_4.showModal()
  makingDetailsModal(data.petData)
}


const makingDetailsModal = (pet) => {
  console.log(pet)
  modalDataContainer = document.getElementById("my_modal_4");
  modalData = document.createElement("div");
  modalData.classList = "modal-box w-11/12 max-w-5xl";
  modalData.innerHTML = `
     <figure class="px-3 pt-3 w-full">
    <img
     src= ${pet.image}
     alt="Pet"
     class="rounded-xl h-full w-full object-cover" />
   </figure>
   <div class=" p-3 flex flex-col gap-3">
    <h2 class="text-2xl font-bold">${pet.pet_name}</h2>
    <div class = "grid grid-cols-2">
       <div class = "col-span-1">
        <p class = ""><i class="fa-solid fa-qrcode"></i> Breed: ${pet.breed}</p>
        <p><i class="fa-solid fa-mars-and-venus"></i> Gender: ${pet.gender}</p>
        <p><i class="fa-solid fa-shield-virus"></i> Vaccinated Status: ${pet.vaccinated_status}</p>
       </div>
      <div class = "col-span-1">  
        <p><i class="fa-solid fa-calendar-days"></i> Birth: ${pet.date_of_birth}</p>
        <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price}</p>  
       </div>
    </div>
       <hr>
     <h2 class="text-xl text-justify font-semibold">Details Information</h2>
    <p> ${pet.pet_details}</p>
      <hr>  
    </div>
            <div >
              <form method="dialog" class="flex">
                <button class="btn flex-grow">Close</button>
              </form>
            </div>
  `
  modalDataContainer.appendChild(modalData)
}

// Modal
// const openModalBtn = document.getElementsByClassName("openModal");
// const modal = document.getElementById("my_modal_5");
// const closeModalBtn = document.getElementById("close-btn");

// const openCloseModal = () => {
//   openModalBtn.addEventListener("click", function () {
//     modal.showModal();

//     setTimeout(function () {
//       closeModalBtn.click();
//     }, 3000);
//   });
// }


