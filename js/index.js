jQuery(document).ready(function($) {  

// site preloader -- also uncomment the div in the header and the css style for #preloader
$(window).load(function(){
	
	setTimeout(function(){$('#preloader').remove();} , 2000);
});

});

$('#btnReview').click(function(){
  $('.nav-tabs > .active').next('li').find('a').trigger('click');
});

