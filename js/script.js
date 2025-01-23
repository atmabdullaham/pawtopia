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
    console.log(element)
    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.classList = "py-6"
    buttonContainer.innerHTML = `
    <button id = button-${element.id} onclick = "loadPetsCategory('${element.category.toLowerCase()}')" class = "flex gap-4 my-6  btn border bg-slate-100 px-10 font-bold text-xl"> <img class = "w-[30px]" src ="${element.category_icon}" />  ${element.category} </button>
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
  let arrayOfCategory = []
  pets.forEach(pet => {
    arrayOfCategory.push(pet.category)
    if (arrayOfCategory.every(value => value !== arrayOfCategory[1])) {
      document.getElementById("sort").addEventListener('click', function () {
        sortPetByPrice(data.pets);
      })
    }
  })
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
  const pets = data.data
  let arrayOfCategory = []
  pets.forEach(pet => {
    arrayOfCategory.push(pet.category)
    if (arrayOfCategory.every(value => value === arrayOfCategory[1])) {
      document.getElementById("sort").addEventListener('click', function () {
        sortPetByPrice(data.data);
      })
    }
  })


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
  if (pets.length == 0) {
    petCardContainer.classList.remove("grid")
    petCardContainer.innerHTML = `
    <div class ="min-h-[300px] flex flex-col gap-8 justify-center items-center"  > 
       <img 
       src ="../images/error.webp" />
       <h2 class ="text-center text-xl font-bold px-4" >"We currently don't have this category available. However, we offer a variety of other wonderful pets that you might love! Feel free to explore our collection and find the perfect companion for you." </h2>
    </div>
    `
    return;
  } else {
    petCardContainer.classList.add("grid");
  }
  pets.forEach((pet, index) => {
    // console.log(pet)
    const cardDiv = document.createElement("div")
    cardDiv.classList = " bg-base-100 rounded-xl  border-gray-300 border pet-card-div"
    cardDiv.innerHTML = `
    <figure class="px-5 pt-5">
    <img
     src= ${pet.image}
     alt="Pet"
     class="rounded-xl" />
   </figure>
   <div class=" p-5 flex flex-col gap-3">
    <h2 class="text-2xl font-bold">${pet.pet_name}</h2>
    <p class = ""><i class="fa-solid fa-qrcode"></i> Breed: ${pet.breed ? pet.breed : "Not Available"}</p>
    <p><i class="fa-solid fa-calendar-days"></i> Birth: ${pet.date_of_birth ? pet.date_of_birth : "Not Available"}</p>
    <p><i class="fa-solid fa-mars-and-venus"></i> Gender: ${pet.gender ? pet.gender : "Not Available"}</p>
    <p ><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price ? pet.price : "Not Available"}</p>
    <hr>
    <div class=" flex justify-between card-actions ">
     <button onclick = "showLikedPic('${pet.image}')" class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
      <button 
           id = "clickedAdoption-${index}" 
           onclick="loadAdoptionModal('${pet.pet_name}', 'clickedAdoption-${index}')" 
           class="btn openModal text-teal-600 text-lg font-semibold ">
         Adopt
      </button>
     <button 
           onclick="loadDetails('${pet.petId}')" 
           class="btn text-teal-600 text-lg font-semibold">
        Details
     </button>
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


const loadAdoptionModal = (name, buttonId) => {
  makingAdoptionModal(name);
  my_modal_5.showModal();

  const closeModal = document.getElementById("close")
  setTimeout(function () {

    closeModal.click();
    // document.getElementById("clickedAdoption").classList.add("btn-disabled")
    // document.getElementById("clickedAdoption").innerText = "Adopted"
    const button = document.getElementById(buttonId);
    if (button) {
      console.log("Button clicked:", button);
      console.log("Pet selected:", name); j
      button.innerText = "Adopted";
      button.classList.add('btn-disabled')
    }

  }, 3000);
  decreasing();
}

const makingAdoptionModal = (name) => {
  const adoptionModal = document.getElementById("my_modal_5");
  adoptionModal.innerHTML = "";
  const messageDiv = document.createElement("div");
  messageDiv.classList = "modal-box flex flex-col gap-6 border border-gray-300 items-center justify-center max-w-[350px] max-h-[300px]";
  messageDiv.innerHTML = `
          <img src = "https://img.icons8.com/?size=48&id=TPAsV6Sqk7pu&format=gif" />
          <h3 class="text-xl font-bold">Congrats!!</h3>
          <h3 class="text-lg font-bold">You are going to adopt <span class = "text-xl font-bold" >"${name}"</span> </h3>
          <h1 class = "text-xl font-bold" id="countdown">3</h1>
         <div class="modal-action hidden">
              <form method="dialog">
        <button id="close" class=""></button>
  </form>
</div>
`

  adoptionModal.appendChild(messageDiv);
  // const adoptionButton = document.getElementById("clickedAdoption");
  // console.log(adoptionButton.innerText);
}
// decreasing();
const decreasing = () => {
  console.log()
  let count = 3;
  // console.log(count)
  const countdownElement = document.getElementById("countdown");

  const countdownInterval = setInterval(() => {
    count--;
    // console.log(count)
    if (count > 0) {
      // console.log(count)
      const countdownElement = document.getElementById("countdown")
      countdownElement.innerText = count;
      console.log(countdownElement.innerText);
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
        <p class=""><i class="fa-solid fa-qrcode"></i> Breed: ${pet.breed ? pet.breed : "Not Available"}</p>
        <p><i class="fa-solid fa-mars-and-venus"></i> Gender: ${pet.gender ? pet.gender : "Not Available"}</p>
        <p><i class="fa-solid fa-shield-virus"></i> Vaccinated Status: ${pet.vaccinated_status ? pet.vaccinated_status : "Not Available"}</p>
      </div>
      <div class="col-span-1">
        <p><i class="fa-solid fa-calendar-days"></i> Birth: ${pet.date_of_birth ? pet.date_of_birth : "Not Available"}</p>
        <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price ? pet.price : "Not Available"}</p>
      </div>
    </div>
    <hr>
      <h2 class="text-xl text-justify font-semibold">Details Information</h2>
      <p> ${pet.pet_details ? pet.pet_details : "Not Available"}</p>
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

