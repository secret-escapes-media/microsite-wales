var modal          = $('.js-modal'),
    modalLaunchBtn = $('.js-open-modal'),
    modalCloseBtn  = $('.js-close-modal');

// opens modal
function modalOpen(event){
  event.preventDefault();
  // disable scrolling on background content (doesn't work iOS)
  $('body').addClass('disable-scroll');

  // find the modal id & element
  var activeModalId = $(event.target).data('open-modal'),
      activeModal   = $('*[data-modal-id="' + activeModalId + '"]');

  // builds youtube video if needed
  if (activeModal.data('youtube-id')) {
    // get youtube id and target div
    var video     = activeModal.find('.modal__video'),
        youtubeId = activeModal.data('youtube-id');
    // insert the code into the target with the id and autoplay
    video.html('<div class="video__wrap"><div class="video"><iframe class="video__iframe" src="https://www.youtube.com/embed/' + youtubeId + '?rel=0&amp;showinfo=0&autoplay=1" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div></div>');
  }

  // reveal the specific modal content
  activeModal.removeClass('is-closed').addClass('is-open');

  // open modal
  modal.fadeIn('250', function(){
    $(this).removeClass('is-closed').addClass('is-open');
  });
}

// closes modal
function modalClose(event){
  event.preventDefault();
  // enable scrolling
  $('body').removeClass('disable-scroll');
  // close modal with fade
  $('.modal.is-open').fadeOut('250', function(){
    // close modal and active modal content
    $(this).removeClass('is-open').addClass('is-closed');
    $('.modal__content-wrap.is-open').removeClass('is-open').addClass('is-closed');
    // kill everything inside of video if its there
    $('.modal__video').empty();
  });
}


// launches modal when offer is clicked
modalLaunchBtn.on('click', function(event) {
  modalOpen(event);
});

// closes modal on close icon click
modalCloseBtn.on('click', function(event) {
  modalClose(event);
});

// closes modal on background click
modal.on('click', function(event) {
  if (event.target !== this){
    return;
  }
  modalClose(event);
});

// DUPLICATED - closes modal on background click
$('.js-modal-youtube').on('click', function(event) {
  if (event.target !== this){
    return;
  }
  modalClose(event);
});

// closes modal on escape key press
$(document).keyup(function(event) {
   if (event.keyCode == 27) {
     modalClose(event);
    }
});