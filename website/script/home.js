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

