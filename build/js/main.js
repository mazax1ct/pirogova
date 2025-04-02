//отслеживание скролла для шапки
var header = $('.header'),
    //toTop = $('.js-to-top'),
    scrollPrev = 0;

var resize_scroll = function(e) {
  var scrolled = $(window).scrollTop();

  if (scrolled > 0) {
		header.addClass('is-scrolled');
	}

  if (scrolled == 0) {
		header.removeClass('is-scrolled');
	}

  /*if ( scrolled > $('.header').height() && scrolled > scrollPrev ) {
		header.addClass('is-out');
	} else {
		header.removeClass('is-out');
	}*/

  /*if (scrolled > scrollPrev) {
    $('.detail__info-inner').removeClass('is-scrolled');
    $('.left-menu').removeClass('is-scrolled');
    $('.catalog__filter-block-inner').removeClass('is-scrolled');
    $('.order-make__results').removeClass('is-scrolled');
	} else {
    $('.detail__info-inner').addClass('is-scrolled');
    $('.left-menu').addClass('is-scrolled');
    $('.catalog__filter-block-inner').addClass('is-scrolled');
    $('.order-make__results').addClass('is-scrolled');
	}*/

	scrollPrev = scrolled;
};

$(document).ready(function() {
  //запуск функции навешивания класса на шапку
  resize_scroll();

  //выравнивание размеров кнопок в табах
  $('.tabs-nav').each(function() {

    let cnt = $(this).find('.tabs-nav__button').length;

    if(cnt > 0){
      $(this).addClass('tabs-nav--cnt_' + cnt);
    }
  });

  //слайдер карточек
  $('.js-cards-slider').each(function(index, el) {
    var slider = el.children[0].children[0];

    new Swiper(slider, {
      loop: true,
      spaceBetween: 20,
      breakpoints: {
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3
        },
        1200: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30
        }
      },

      navigation: {
        nextEl: '.js-cards-slider-next[data-slider="'+el.dataset.slider+'"]',
        prevEl: '.js-cards-slider-prev[data-slider="'+el.dataset.slider+'"]',
      },

      pagination: {
        el: '.js-cards-slider-pagination[data-slider="'+el.dataset.slider+'"]',
        type: 'bullets',
        clickable: true
      },
    });
  });
});

//перезапуск функции навешивания класса на шапку при скролле и ресайзе
$(window).on("scroll", resize_scroll).on("resize", resize_scroll);

//открытие мобильного меню
$(document).on('click', '.js-mobile-menu-toggler', function () {
  var _this = $(this);
  if(!_this.hasClass('is-active')){
    $('body').addClass('is-overflow');
    $('.mobile-menu').fadeIn();
    _this.addClass('is-active');
    _this.find('use').attr('xlink:href', 'images/sprite.svg#close_icon');
  }else{
    $('.mobile-menu').fadeOut(function() {
      $('body').removeClass('is-overflow');
      _this.removeClass('is-active');
      _this.find('use').attr('xlink:href', 'images/sprite.svg#burger_icon');
    });
  }

  return false;
});

//тогглер комбобокса
$(document).on('click', '.js-combobox-toggler', function () {
  var combobox = $(this).closest('.combobox');

  if(combobox.hasClass('is-open')) {
    combobox.removeClass('is-open')
  } else {
    $('.combobox').removeClass('is-open');
    combobox.addClass('is-open')
  }
  return false;
});

//выбор варианта в комбобоксе
$(document).on('click', '.combobox__link', function () {
  $(this).closest('.combobox').find('.combobox__link').removeClass('is-active');
  $(this).addClass('is-active');
  $(this).closest('.combobox').find('.combobox__value').text($(this).text()).addClass('is-active');
  $(this).closest('.combobox').removeClass('is-open');
  return false;
});

//открытие поиска в шапке
$(document).on('click', '.js-search-opener', function () {
  $('html').addClass('is-overflow');
  $('body').addClass('is-overflow');
  $('.search').fadeIn(function() {
    $('.search__inner').addClass('is-open');
  });

  return false;
});

//закрытие поиска в шапке
$(document).on('click', '.js-search-closer', function () {
  $('.search__inner').removeClass('is-open');
  $('.search').fadeOut(function() {
    $('html').removeClass('is-overflow');
    $('body').removeClass('is-overflow');
  });

  return false;
});
