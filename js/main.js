// Add JavaScript to toggle the hamburger menu and overlay
function toggleMenu() {
  var overlay = document.getElementById("menuOverlay");
  var overlayWidth = overlay.style.width;
  if (overlayWidth === "100%") {
    overlay.style.width = "0";
  } else {
    overlay.style.width = "100%";
  }
  overlay.style.transition = "width 0.3s ease-in-out";
}

// Add event listener to navigation links
var navLinks = document.querySelectorAll('#menuOverlay a');
navLinks.forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    toggleMenu(); // close the menu overlay
    var href = link.getAttribute('href');
    if (href === window.location.pathname) {
      return; // do not reload the current page
    }
    // Delay navigation until the overlay transition is complete
    var delay = parseFloat(getComputedStyle(document.getElementById("menuOverlay")).transitionDuration) * 1000;
    setTimeout(function() {
      window.location.href = href;
    }, delay);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('myForm');
  const responseMessage = document.getElementById('responseMessage');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();  // Prevent the default form submission

    const email = document.getElementById('emailField').value;

    const formData = new FormData();
    formData.append('email', email);

    try {
      const response = await fetch('https://form-api-production.up.railway.app/form', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      // Update the message
      if (result.message) {
        responseMessage.textContent = result.message;
      } else {
        responseMessage.textContent = 'An unknown error occurred.';
      }
    } catch (error) {
      // Update the message in case of an error
      responseMessage.textContent = 'An error occurred while submitting the form.';
    }
  });
});

