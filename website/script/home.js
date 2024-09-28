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

function createFarmerDetails(data) {
   let currentIndex = 0;
   const farmerDetailsDiv = document.querySelector('.category');
   const farmerSection = document.createElement('div');
   farmerSection.classList.add('exa');
   farmerSection.style.backgroundImage = data.images[currentIndex];

   const farmDescription = document.createElement('div');
   farmDescription.classList.add('description');
   const farmName = document.createElement('p');
   farmName.textContent = data.farmName;
   farmName.style.testSize = '20px';
   farmName.style.color = '#0d0d0d';
   farmName.style.fontWeight = 'bold';
   const farmLocation = document.createElement('p');
   farmLocation.textContent = data.farmLocation;
 
   let content = "";
   data.produce.forEach(product => {
     content += product + ', ';
   })
   const produce = document.createElement('p');
     produce.style.textSize = '10px';
     produce.style.color = '#808080';
     produce.textContent = content;

   farmDescription.appendChild(farmName);
   farmDescription.appendChild(produce);
   farmDescription.appendChild(farmLocation);
   farmDescription.style.position = 'relative';
   farmerSection.appendChild(farmDescription);

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
   farmerSection.appendChild(nextButton);

   farmerDetailsDiv.appendChild(farmerSection);
}
function prevImage() {
     currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
     imageBox.style.backgroundImage = images[currentIndex];
}

function nextImage() {
     currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
     imageBox.style.backgroundImage = images[currentIndex];
  }
const data = {'farmName': 'Wingo beef farm', 'produce': ['roduct-1', 'product-2'], 'description': 'this farm 1',
     'farmLocation': 'Kajiado, Kenya', 'images': '[image-1, image-2, image-3]', 'contact': '0123456'}

createFarmerDetails(data);

const newData = {'farmName': 'farm-name', 'produce': ['roduct-1', 'product-2'], 'description': 'this farm 1',
     'farmLocation': 'Kajiado, Kenya', 'images': '[image-1, image-2, image-3]', 'contact': '0123456'}
for(let i=0; i < 14; i++) {
 createFarmerDetails(newData);
}
