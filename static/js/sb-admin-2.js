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

(function(){
  let url = '/database/user';
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    console.log(this.response);
    let data = JSON.parse(this.response);
    let name = document.querySelector("#navName");
    name.innerHTML = data.firstName;
    let img = document.querySelector("#navImagem");
    if(data.image)img.src = data.image;
    else img.src="/static/img/avataaars.png";
    let notCounter = document.querySelector("#navNotificationCounter");
    notCounter.innerHTML = data.notifications.length+"+";
    data.notifications.forEach(noti=>{
      let clone = document.querySelector("#navNotiElem").cloneNode(true);
      clone.id="";
      clone.style.display = "flex !import";
      clone.href = noti.href;
      let date = clone.querySelector("#navNotiDate");
      date.innerHTML = noti.date;
      let title = clone.querySelector("#navNotiTitle");
      title.innerHTML = noti.title;
      document.querySelector("#navNoti").appendChild(clone);
    })
    document.querySelector("#navNotiElem").remove();
  }
  xhr.open('POST',url);
  xhr.send();
}());