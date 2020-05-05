const loadScripts = () => {
(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict
}


const externalContent = [
  {
    class: ".sideBarExternal",
    url: "/static/html/sideBar.html"
  },
  {
    class: ".navExternal",
    url: "/static/html/nav.html"
  },
  {
    class: ".footerExternal",
    url: "/static/html/footer.html"
  },
  {
    class: ".logoutModalExternal",
    url: "/static/html/logoutModal.html"
  }
]

const loadhtml = () => {
  let counter = externalContent.length;
  externalContent.forEach((elem)=>{
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      document.querySelector(elem.class).innerHTML=this.responseText;
      counter--;
      console.log(counter);
      if(counter<=0)loadScripts();
    }
    xhr.open("GET", elem.url);
    xhr.responseType = "text";
    xhr.send();
  })
}
loadhtml();