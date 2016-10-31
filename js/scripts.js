$.fn.mobileScroll = function() {
	if ( this.hasClass('ui-draggable') ) {
		this.draggable('disable');
	}
	if ( Modernizr.mq('(max-width:759px)') ) {
		if ( this.hasClass('ui-draggable-disabled') ) {
			this.draggable('enable');
		}
		var t = this;
		var w = ($(this).find('li').outerWidth())*$(this).find('li').size()+10;
		this.draggable({
			axis: 'x',
			containment: [($(this).parent().width()-10-($(this).find('li').outerWidth())*$(this).find('li').size()), 0, 0, 0]
		});
		this.siblings('.next').on('click', function() {
			var l = Math.ceil((-t.position().left+1)/260)*260;
			if ( l > w-t.parent().outerWidth() ) {
				l = w-t.parent().outerWidth();
				$(this).hide();
			}
			t.stop(true,true).animate({
				'left': -l+'px'
			}, 250);
			t.siblings('.prev').show();
		});
		this.siblings('.prev').on('click', function() {
			var l = Math.floor((-t.position().left-1)/260)*260;
			if ( l <= 0 ) {
				l = 0;
				$(this).hide();
			}
			t.stop(true,true).animate({
				'left': -l+'px'
			}, 250);
			t.siblings('.next').show();
		});
	}
}
function gallery() {
	var target = $('.gallery-i .core');
	target.css({
		'min-height': '0'
	});
	if ( target.find('.slick-track').length > 0 ) {
		target.slick('unslick');
	}
	if ( Modernizr.mq('(min-width:1230px)') ) {
		var padding = 15;
	} else {
		var padding = 10;
	}
	if ( Modernizr.mq('(min-width:1000px)') ) {
		var itemWidth = ($('.gallery-i').width())/2-padding;
		var totalWidth = itemWidth*3;
		var marginLeft = ($('.gallery-i').width()-totalWidth)/2;
	} else {
		var itemWidth = ($('.gallery-i .core').width());
		var totalWidth = itemWidth;
		var marginLeft = ($('.gallery-i').width()-totalWidth)/2;
	}
	target.css({
		'width': totalWidth+'px',
		'margin-left': marginLeft+'px'
	});
	target.find('.item').width(itemWidth);
	target.slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: true,
		arrows: true,
		dots: false,
		centerMode: true,
		draggable: false,
		adaptiveHeight: true,
		speed: 500,
		responsive: [
			{
				breakpoint: 999,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	target.css({
		'height': target.outerHeight()+'px'
	});
	if ( Modernizr.mq('(min-width:1000px)') ) {
		target.find('.item.slick-center').prev().addClass('prev');
		target.find('.item.slick-center').next().addClass('next');
		target.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			target.find('.item').removeClass('prev next');
			target.find('[data-slick-index="'+nextSlide+'"]').prev().addClass('prev');
			target.find('[data-slick-index="'+nextSlide+'"]').next().addClass('next');
		});
		target.find('.item > div').on('click', function() {
			if ( $(this).parent().hasClass('next') ) {
				target.slick('slickNext');
			}
			if ( $(this).parent().hasClass('prev') ) {
				target.slick('slickPrev');
			}
		});
	}
}
function introSlider() {
	if ( $('.slider-i .slick-track').length > 0 ) {
		$('.slider-i').slick('unslick');
	}
	$('.intro-i .progress').html('<span>1</span>/'+$('.slider-i .item').size());
	$('.slider-i').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		arrows: true,
		dots: false
	});
	$('.slider-i').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		$('.intro-i .progress span').text(nextSlide+1);
	});
}
function indexClients() {
	if ( $('.info-i .clients .core .slick-track').length > 0 ) {
		$('.info-i .clients .core').slick('unslick');
	}
	$('.info-i .clients .core .item > div').unwrap();
	if ( Modernizr.mq('(min-width:1000px)') ) {
		var elems = $('.info-i .clients .core > div');
		for (var i = 0; i < elems.length; i+=2 ) {
			elems.slice(i,i+2).wrapAll('<div class="item"></div>');
		}
	} else {
		$('.info-i .clients .core > div').wrap('<div class="item"></div>');
	}
	$('.info-i .clients .core').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		arrows: true,
		dots: false,
		autoheight: true,
		responsive: [
			{
				breakpoint: 999,
					settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 759,
					settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}
		]
	});
	$('.info-i .clients .core .item > div').each(function() {
		$(this).height($(this).parent().width()*17/27)
	});
}
function setVideoHeight() {
	var t = $('.text-b .video iframe');
	t.height(t.parent().width()*540/940);
}
function indexBenefits() {
	if ( $('.info-i .benefits .core .wrap .slick-track').length > 0 ) {
		$('.info-i .benefits .core .wrap').slick('unslick');
	}
	$('.info-i .benefits .core .wrap .item').unwrap();
	if ( Modernizr.mq('(max-width:759px)') ) {
		$('.info-i .benefits .core .item').slice(0,$('.info-i .benefits .core .item').length-1).wrapAll('<div class="wrap"></div>');
		$('.info-i .benefits .core .wrap').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			arrows: true,
			dots: false
		});
	}
}
function adaptiveText() {
	$('[data-text-full]').each(function() {
		if ( Modernizr.mq('(min-width:760px)') ) {
			$(this).text($(this).attr('data-text-full'));
		} else {
			$(this).text($(this).attr('data-text-short'));
		}
	});
}
function serviceBenefits() {
	if ( $('.proj-desc .benefits .slick-track').length > 0 ) {
		$('.proj-desc .benefits').slick('unslick');
	}
	if ( Modernizr.mq('(max-width:759px)') ) {
		$('.proj-desc .benefits').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			arrows: true,
			dots: false,
			adaptiveHeight: true
		});
	}
}
$(function() {
	$('.img-bg').each(function() {
		$(this).parent().css({
			'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
			'background-size': 'cover'
		});
	});
	$('.reviews-s .core').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		arrows: true,
		dots: true,
		adaptiveHeight: true
	});
	$(window).on('resize orientationChanged', function() {
		gallery();
		introSlider();
		indexClients();
		setVideoHeight();
		adaptiveText();
		$('.scheme-b .core ul').mobileScroll();
		serviceBenefits();
	});
	$(window).on('load resize', function() {
		indexBenefits();
	});
	$(window).trigger('resize');
	$('.form-e button').on('click', function(e) {
		e.preventDefault();
		$(this).parent().find('input,textarea').each(function() {
			if ( $(this).val() == 0 && $(this).parents('p').find('input[type="file"]').length == 0 ) {
				if ( !$(this).parent().is('.warning-wrap') ) {
					$(this).wrap('<span class="warning-wrap"></span>');
					$(this).parent().prepend('<em class="text"><em>Неверный формат</em></em><em class="icon"></em>');
					$(this).siblings('em').outerHeight($(this).outerHeight());
				}
				var t = $(this).parent();
				t.find('em').show();
				t.find('em.text').css({
					'width': '100%'
				});
				setTimeout(function() {
					t.find('.text > em').hide();
					t.find('.text').animate({
						'width': t.find('.icon').width()+'px'
					}, 300).dequeue();
				}, 1000);
			} else {
				$(this).siblings('em').hide();
			}
		});
	});
	if ( !Modernizr.touchevents ) {
		var openErrorEvent = 'mouseenter';
		var closeErrorEvent = 'mouseleave';
	} else {
		var openErrorEvent = 'click';
		var closeErrorEvent = 'click';
	}
	$('body').delegate('.warning-wrap .icon:not(.opened)', openErrorEvent, function() {
		var t = $(this).siblings('.text');
		$(this).addClass('opened');
		t.stop().animate({
			'width': '100%',
		}, 300, function() {
			$(this).find('em').show();
		});
	});
	$('body').delegate('.warning-wrap .icon.opened', closeErrorEvent, function() {
		var t = $(this).siblings('.text');
		$(this).removeClass('opened');
		t.find('em').hide();
		t.stop().animate({
			'width': '0',
		}, 300);
	});
	function customSelect() {
		$('select').selectmenu();
	}
	customSelect();
	$('select').on('selectmenuopen', function(event,ui) {
		var t = $(this).siblings('.ui-selectmenu-button').attr('aria-activedescendant');
		var str = $(this).attr('id').toString()+'-button';
		var e = $('[aria-labelledby="'+str+'"]');
		e.find('.ui-menu-item-wrapper').removeClass('current');
		e.find('div#'+t).addClass('current');
		if ( $(this).parents('.modal') ) {
			$('.ui-selectmenu-menu').css({
				'z-index': '1020'
			});
		}
	});
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		var t = $('.modal[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade').stop(true,true).fadeIn(300);
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( h < $(window).scrollTop()+80 ) {
			h = $(window).scrollTop()+40;
		}
		t.css({
			'top': h+'px'
		}).stop(true,true).fadeIn(300).siblings('[data-target]').stop(true,true).fadeOut(300);
		customSelect();
	});
	$('.fade, .modal .close').on('click', function(e) {
		e.preventDefault();
		$('.fade, .modal').stop(true,true).fadeOut(300);
	});
	$('nav a.sub').on('mouseenter', function(e) {
		e.preventDefault();
		$('[data-sub-nav="'+$(this).attr('data-sub-open')+'"]').show().siblings('ul').hide();
		$('.sub-nav .arrow').css({
			'left': $(this).position().left+$(this).outerWidth()/2+'px'
		});
	});
	$('nav li.active a.sub').trigger('mouseover');
	var showSortTimer;
	$('.sort-e span').on('click', function(e) {
		e.preventDefault();
		var t = $('.sort-drop');
		if ( t.is(':hidden') ) {
			t.show().css({
				'top': $(this).parent().position().top+'px',
				'left': $(this).parent().position().left+$(this).parent().outerWidth()+'px'
			});
			showSortTimer = setTimeout(function() {
				t.hide();
			}, 5000);
		} else {
			t.hide();
		}
	});
	$('.sort-drop').on('mouseenter', function() {
		window.clearTimeout(showSortTimer);
	});
	$('.sort-drop').on('mouseleave', function() {
		var t = $(this);
		showSortTimer = setTimeout(function() {
			t.hide();
		}, 5000);
	});
	$('.sort-drop li').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parent().hide();
		$('.sort-e span').text($(this).text());
	});
	$('.sort-drop li.active').trigger('click');
	$('html, body').click(function() {
		$('.sort-drop').hide();
		$('.catalogue-b .core .lc .nav').removeClass('drop');
	});
	$('.sort-drop, .sort-e span, .catalogue-b .core .lc .nav').click(function(e) {
		e.stopPropagation();
	});
	$('input[type="checkbox"], input[type="radio"]').uniform();
	$('.media-open').fancybox({
		padding: 0,
		margin: 0,
		/*width: $(window).width(),
		height: $(window).height(),*/
		helpers: {
			overlay: {
				locked: false
			},
			title: {
				type : 'over'
			}
		},
		beforeShow : function() {
			this.title = (this.title ? '' + this.title + '' : '') + (this.index + 1) + ' из ' + this.group.length;
		} 
	});
	$(window).on('scroll resize', function() {
		$('.animated').each(function() {
			if ( $(window).scrollTop() > $(this).offset().top-$(window).height() && !$(this).hasClass('complete') ) {
				var t = $(this);
				var delay = 100+Math.random()*700;
				setTimeout(function() {
					t.addClass('complete');
				}, delay);
			}
		});
	});
	$(window).trigger('scroll');
	$('header .search').on('mouseover', function() {
		$(this).find('input[type="text"]').trigger('hover');
	});
	var showSearchTimer;
	$('header .search input[type="submit"]').on('click', function(e) {
		var t = $(this).parent();
		if ( t.hasClass('active') && $(this).siblings('input[type="text"]').val() ) {
			alert('Go search');
		}
		if ( !t.hasClass('active') ) {
			e.preventDefault();
			$(this).parent().addClass('active');
			showSearchTimer = setTimeout(function() {
				t.removeClass('active');
			}, 5000);
		}
	});
	$('header .search input[type="text"]').keyup(function() {
		window.clearTimeout(showSearchTimer);
		var t = $(this).parent();
		showSearchTimer = setTimeout(function() {
			t.removeClass('active');
		}, 5000);
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('.catalogue-b .core .lc .nav h4').on('click', function() {
		var t = $(this).parent();
		if ( !t.hasClass('drop') ) {
			t.addClass('drop');
		} else {
			t.removeClass('drop');
		}
	});
	$('.menu-drop .main a.has-sub').on('click', function(e) {
		e.preventDefault();
		$('.menu-drop .main, .menu-drop .sub').hide();
		$('.menu-drop .sub-opened').show();
		$('.menu-drop .sub-opened').append('<h5>'+$(this).text()+'</h5>');
		$('[data-sub-nav="'+$(this).attr('href')+'"]').clone().appendTo($('.menu-drop .sub-opened'));
		$('.menu-drop .sub-opened ul').show();
	});
	$('.menu-drop .sub-opened .back').on('click', function(e) {
		e.preventDefault();
		$('.menu-drop .main, .menu-drop .sub').show();
		$('.menu-drop .sub-opened').hide();
		$('.menu-drop .sub-opened h5, .menu-drop .sub-opened ul').remove();
	});
	$('header .menu-open').on('click', function(e) {
		e.preventDefault();
		var m = $('.menu-drop');
		if ( m.is(':hidden') ) {
			m.stop().fadeIn(100);/*.css({
				'height': $(window).height()+'px'
			});*/
			$('header').addClass('fixed');
			$('body').addClass('scroll-hide');
		} else {
			$('header').removeClass('fixed');
			$('body').removeClass('scroll-hide');
			m.stop().fadeOut(100);
		}
		$(this).toggleClass('active');
	});
	$('html, body').on('click', function() {
		$('.menu-drop').stop().fadeOut(100);
		$('body').removeClass('scroll-hide');
		$('header').removeClass('fixed');
		$('.menu-open').removeClass('active');
	});
	$('.menu-drop, .menu-open').click(function(e)  {
		e.stopPropagation();
	});
	$(window).on('scroll resize', function() {
		if ( $('.menu-drop').is(':visible') ) {
			$('.menu-drop').css({
				'height': $(window).height()-97+'px'
			});
		}
	});
	$('.card-b .core .gallery .preview li').on('click', function(e) {
		e.preventDefault();
		$('[data-img-big="'+$(this).attr('data-img-preview')+'"]').show().siblings().hide();
		$(this).addClass('active').siblings().removeClass();
	}).filter(':first').click();
});