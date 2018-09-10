
$(document).ready(function(){

	var markerSelector = 'h2 > a[href="#fold"],h3 > a[href="#fold"]';
	var nextUntilSelector = 'h2.fold-toggle, h3.fold-toggle, hr, footer';
	var toggles = $();
	var firstClick = true;

	$('.Content-outer main').find(markerSelector).each( function(i,elem){
		var toggle = $(elem).parent();
		toggles = toggles.add(toggle);
		$(elem).remove();
		toggles.add(toggle);
	});
	toggles.addClass('fold-toggle');

	for (var i = 0; i < toggles.length; i++) {

		var toggle= $(toggles[i]);
		var foldSection = toggle.nextUntil(nextUntilSelector);

		if(foldSection.length > 0){
			foldSection.addClass("fold-section-hidden");
			continue;
		}

		if( i+1 > toggles.length ) continue; //todo
		var nextToggle = $(toggles[i+1]);
		var thisParent = toggle.parents('div.sqs-block');
		var nextParent = nextToggle.parents('div.sqs-block');

		var stopElement = thisParent.nextUntil( $(nextParent).add('.horizontalrule-block') );

		foldSection = $( stopElement )
		.add( stopElement.find(nextUntilSelector).prevAll() );
		foldSection.addClass("fold-section-hidden");

		toggle.data(foldSection);
	}

	toggles.click(function(){
		var obj = $(this).data();
		if(firstClick) {
			$('.fold-section-hidden').hide().removeClass('fold-section-hidden');
			firstClick = false;
		}
		if(Object.keys(obj).length == 0) {
			$(this).nextUntil(nextUntilSelector).slideToggle();
			return true;
		}
		obj.slideToggle();
	});
});



$(document).ready(function(){

	$('.sqs-block-summary-v2 .summary-block-collection-type-gallery .summary-item').each( function(){
		
		var container = $(this);
		var links = container.find('a.sqs-gallery-image-container, a.summary-title-link');
		var url = links.first().attr('href');

		if( url.indexOf('galerie') == -1 || url.indexOf('gallery') == -1 ) {
			container.addClass('nolink');
			console.log(container);
			links.attr('href','');
		}
	});

});

 $(document).on('scroll',function(){
    if ($(document).scrollTop() > 32) {
        $('header.Header--top').addClass('fixed')
    } else {
        $('header.Header--top').removeClass('fixed')
    }
 });

$(function() {$('a[href*=\\#]:not([href=\\#])').click(function() {if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {var target = $(this.hash);target = target.length ? target : $('[name=' + this.hash.slice(1) +']');if (target.length) {$('html,body').animate({scrollTop: target.offset().top-190}, 1000);history.pushState(null,null,this.hash); return false;}}});});


$(document).ready(function(){
  	var target = $(window.location.hash);
	if(target.length > 0) {
		$('html,body').animate({scrollTop: target.offset().top-190}, 0);
    }
});