var $ = require('jquery');

// Hide on load via JS
$('[data-hide-on-load]').hide()

// Toggle elements based on data attributes
$('[data-toggle]').on('click', function(e) {
  e.preventDefault();
  var toggle,
      toggleScope,
      classToggle;
  if($(this).is('[data-local-toggle]')) {
    toggle = $(this).next($(this).attr('data-toggle'));
  }
  else if($(this).is('[data-toggle-scope]')) {
    toggleScope = $(this).attr('data-toggle-scope');
    toggle = $(this).parents().eq(toggleScope).find($(this).attr('data-toggle'));
  }
  else {
    toggle = $(this).attr('data-toggle');
    toggle = $(toggle);
  }
  toggle.slideToggle(200);
  if($(this).is('[data-toggle-class]')) {
    classToggle = $(this).attr('data-toggle-class');
    $(this).toggleClass(classToggle);
  }
});

// Show (no toggle) elements based on data attributes
$('[data-show]').on('click', function(e) {
  e.preventDefault()
  var toggle,
      classToggle;
  if($(this).is('[data-local-toggle]')) {
    toggle = $(this).next($(this).attr('data-show'))
  }
  else {
    toggle = $(this).attr('data-show')
    toggle = $(toggle)
  }
  toggle.slideDown(200)
  if($(this).is('[data-toggle-class]')) {
    classToggle = $(this).attr('data-toggle-class')
    $(this).toggleClass(classToggle)
  }
});

// Smooth scrolling
$('[data-scroll-to]').on('click', function(e){
  e.preventDefault()
  var scroll = $(this).attr('data-scroll-to');
  var top = $(scroll).offset().top
  $('body, html').animate({'scrollTop' : top})
});

// toggling elements based on checkbox
$("[data-checkbox-toggle]").change(function(e){
  var toggle = $(this).attr('data-checkbox-toggle')
  toggle = $(toggle);
  toggle.slideToggle(timingLong);
});

// Click the 'submit' button instead of default for submission (for leaner event handlers)
$("[data-submit-by-click]").on("submit", function(e) {
  $(this).find("[type=submit]").click()
  e.preventDefault()
});
