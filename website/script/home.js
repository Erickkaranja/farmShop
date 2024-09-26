function toggleMenu() {
      var menu = document.getElementById("dropdownMenu");
      if (menu.style.display === "block") {
        menu.style.display = "none"; // Hide the menu if it's visible
      } else {
        menu.style.display = "block"; // Show the menu if it's hidden
      }
    }

    // Close the menu if clicked outside
    window.onclick = function(event) {
      var menu = document.getElementById("dropdownMenu");
      var icon = document.querySelector('.menu-icon');
      if (!menu.contains(event.target) && !icon.contains(event.target)) {
        menu.style.display = "none";
      }
    };
/**
  farmer json data format
  {
   ['farmName': 'farm-name', 'products': '[roduct-1, product-2]', 'description': 'this farm 1',
     'location': 'Kajiado, Kenya', 'farm-images': '[image-1, image-2, image-3]', 'contact': '0123456'
]
}
**/
function createFarmerDetails(data) {
   let currentIndex = 0;
   const farmerDetailsDiv = document.querySelector('.category');
   const farmerSection = document.createElement('div');
   farmSection.classList.add('exa');
   farmSection.style.backgroundImage = data.images[currentIndex];
   const farmName = document.createElement('h2');
   farmName.setAttribute('id', 'farmName');
   farmName.textContent = data.farmName;
   farmName.style.position = 'absolute';

   farmSection.appendChild('farmName');
   // creating next and previous button
   const prevButton = document.createElement('button');
     prevButton.classList.add('prev');
     prevButton.setAttribute('id', 'buttonItem');
     prevButton.innerHTML = '❮';
     prevButton.onclick = prevImage;

   const nextButton = document.createElement('button');
     nextButton.classList.add('next');
     nextButton.setAttribute('id', 'buttonItem');
     nextButton.innerHTML = '❯';
     nextButton.onclick = nextImage;

   farmerSection.appendChild(prevButton);
   farmSection.appendChild(nextButton);

   farmerDetailsDiv.appendChild(farmSection);
}
function prevImage() {
     currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
     imageBox.style.backgroundImage = images[currentIndex];
}

function nextImage() {
     currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
     imageBox.style.backgroundImage = images[currentIndex];
  }
