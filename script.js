var accordion = (function(){
  
  var $accordion = $('.js-accordion');
  var $accordion_header = $accordion.find('.js-accordion-header');
  var $accordion_item = $('.js-accordion-item');
 
  // default settings 
  var settings = {
    // animation speed
    speed: 400,
    
    // close all other accordion items if true
    oneOpen: false
  };
    
  return {
    // pass configurable object literal
    init: function($settings) {
      $accordion_header.on('click', function() {
        accordion.toggle($(this));
      });
      
      $.extend(settings, $settings); 
      
      // ensure only one accordion is active if oneOpen is true
      if(settings.oneOpen && $('.js-accordion-item.active').length > 1) {
        $('.js-accordion-item.active:not(:first)').removeClass('active');
      }
      
      // reveal the active accordion bodies
      $('.js-accordion-item.active').find('> .js-accordion-body').show();
    },
    toggle: function($this) {
            
      if(settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
        $this.closest('.js-accordion')
               .find('> .js-accordion-item') 
               .removeClass('active')
               .find('.js-accordion-body')
               .slideUp()
      }
      
      // show/hide the clicked accordion item
      $this.closest('.js-accordion-item').toggleClass('active');
      $this.next().stop().slideToggle(settings.speed);
    }
  }
})();

$(document).ready(function(){
  accordion.init({ speed: 300, oneOpen: true });
});

document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("language-select");
  const contentParagraphs = document.querySelectorAll("[data-lang]");
  const languageTitle = document.getElementById("language-title");
  const siteTitle = document.getElementById("site-title");

  languageSelect.addEventListener("change", function () {
      const selectedLanguage = languageSelect.value;
      contentParagraphs.forEach(function (paragraph) {
          const lang = paragraph.getAttribute("data-lang");
          if (lang === selectedLanguage) {
              paragraph.style.display = "block";
          } else {
              paragraph.style.display = "none";
          }
      });

      // Update the title and language title based on the selected language
      if (selectedLanguage === "am") {
          languageTitle.textContent = "የፋውንዴሽን ትምህርት";
          siteTitle.textContent = "የፋውንዴሽን ትምህርት";
      } else {
          languageTitle.textContent = "Foundation Notes";
          siteTitle.textContent = "Foundation Notes";
      }
  });

  // Set the initial language and title based on the dropdown selection
  languageSelect.dispatchEvent(new Event("change"));

});

// Disable right-click
window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Disable right-click on iframe
document.oncontextmenu = function(e) {
  var target = e.target || e.srcElement;

  // Check if the target is within an iframe
  while (target != null) {
      if (target.nodeName === "responsive-iframe") {
          return false; // Disable right-click if the target is inside an iframe
      }
      target = target.parentNode;
  }

};
