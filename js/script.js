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

  const pets = data.pets
  // console.log(pets)
  pets.forEach(pet => {
    if ('category' in pet !== 'category'[0]) {
      document.getElementById("sort").addEventListener('click', function () {
        sortPetByPrice(data.pets);
      })
    }
  })

  // if (pets.every(pet => pet.category != pets[0].category)) {

  // }
  // 
}

const showSpinner = () => {
  document.getElementById("spin").classList.remove("hidden");
  document.getElementById("pet-card").classList.remove("grid")
  const petCardDiv = document.getElementById("pet-card");
  petCardDiv.append(document.getElementById('spin'));
  // const petCardContainer = document.getElementById("pet-card");
  // petCardContainer.innerHTML = "";
};
showSpinner();
setTimeout(function () {
  loadPet()
}, 3000)

const loadPetsCategory = async (petCategory) => {

  // console.log(petCategory)
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${petCategory}`)
  const data = await res.json();
  const petCardContainer = document.getElementById("pet-card");
  petCardContainer.innerHTML = "";
  showSpinner();
  const pets = data;

  // if (pets.every(pet => pet.category === pets[0].category)) {
  //   document.getElementById("sort").addEventListener('click', function () {
  //     sortPetByPrice(data.data);
  //   })

  // }



  setTimeout(function () {
    document.getElementById("spin").classList.add("hidden")
    document.getElementById("pet-card").classList.add("grid")
    showPets(data.data);
  }, 1000)

}
const showPets = (pets) => {
  const spiner = document.getElementById("spin");
  const spinContainer = document.getElementById("spin-container");
  spinContainer.append(spiner);
  const petCardContainer = document.getElementById("pet-card");
  petCardContainer.innerHTML = "";
  pets.forEach(pet => {
    // console.log(pet)
    const cardDiv = document.createElement("div")
    cardDiv.classList = " bg-base-100 shadow-xl border-gray-300 border pet-card-div"
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
    <p ><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price}</p>
    <hr>
    <div class=" flex justify-between card-actions ">
     <button onclick = "showLikedPic('${pet.image}')" class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
     <button id = "clickedAdoption" onclick="loadAdoptionModal('${pet.pet_name}')" class="btn openModal text-teal-600 text-lg font-semibold">Adopt</button>
     <button onclick="loadDetails('${pet.petId}')" class="btn text-teal-600 text-lg font-semibold">Details</button>
    </div>
   </div>
  `
    petCardContainer.appendChild(cardDiv)


  });
}

// sort cart function
function sortPetByPrice(pets) {
  console.log(pets)
  pets.sort((a, b) => a.price - b.price);
  showPets(pets);
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

const loadAdoptionModal = (name) => {

  makingAdoptionModal(name);
  my_modal_5.showModal();
  const closeModal = document.getElementById("close")
  setTimeout(function () {
    closeModal.click();
  }, 3000);
}

const makingAdoptionModal = (name) => {
  const adoptionModal = document.getElementById("my_modal_5");
  const messageDiv = document.createElement("div");
  messageDiv.classList = "modal-box flex flex-col gap-6 items-center justify-center";
  messageDiv.innerHTML = `
          <img src = "https://img.icons8.com/?size=48&id=TPAsV6Sqk7pu&format=gif" />
          <h3 class="text-lg font-bold">You are going to adopt ${name}</h3>
          <h1 class = "text-xl font-bold" id="countdown">3</h1>
         <div class="modal-action">
              <form method="dialog">
        <button id="close" class=""></button>
  </form>
</div>
`

  adoptionModal.appendChild(messageDiv);
  decreasing(3);
  // const adoptionButton = document.getElementById("clickedAdoption");
  // console.log(adoptionButton.innerText);
}
// decreasing();
const decreasing = (num) => {
  let count = num;
  const countdownElement = document.getElementById("countdown");

  const countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownElement.innerText = count;
    } else {
      countdownElement.innerText = "Done!";
      clearInterval(countdownInterval);
    }
  }, 1000);
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
    <div class="grid grid-cols-2">
      <div class="col-span-1">
        <p class=""><i class="fa-solid fa-qrcode"></i> Breed: ${pet.breed}</p>
        <p><i class="fa-solid fa-mars-and-venus"></i> Gender: ${pet.gender}</p>
        <p><i class="fa-solid fa-shield-virus"></i> Vaccinated Status: ${pet.vaccinated_status}</p>
      </div>
      <div class="col-span-1">
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

// document.getElementById("sort").addEventListener("click", function () {
//   const listItems = document.querySelectorAll('#pet-card .pet-card-div');
//   // const listItems = document.getElementsByClassName('pet-card-div');
//   const listStringifyed = JSON.stringify(listItems)
//   console.log(listStringifyed.json())
//   console.log(listStringifyed)
//   listItems.forEach((item) => {
//     console.log(item);  // Works in modern browsers
//   })
//   // console.log();
// })