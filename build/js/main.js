//отслеживание скролла для шапки
var header = $('.header'),
    header_fixed = $('.header-fixed'),
    scrollPrev = 0;

var resize_scroll = function(e) {
  var scrolled = $(window).scrollTop();

  if (scrolled > 0) {
		header.addClass('is-scrolled');
	}

  if (scrolled == 0) {
		header.removeClass('is-scrolled');
	}

  if (scrolled > $('.header').height()) {
		header_fixed.addClass('is-scrolled');
	}

  if (scrolled <= $('.header').height()) {
		header_fixed.removeClass('is-scrolled');
    if($('body').width() >= 1024){
      closeSearch();
    }
	}

	scrollPrev = scrolled;
};

function closeMobileSearch() {
  $('.js-mobile-search-toggler').attr('title', 'Поиск');
  $('.js-mobile-search-toggler').find('use').attr('xlink:href', 'images/sprite.svg#search_icon');
  $('.js-mobile-search-toggler').removeClass('is-active');
  $('.header__search').removeClass('is-open');
}

function closeSearch() {
  $('.js-search-toggler').attr('title', 'Поиск');
  $('.js-search-toggler').removeClass('is-active');
  $('.header-fixed').removeClass('no-shadow');
  $('.header__search').removeClass('is-open');
  $('.js-header-search-input').val('');
  $('.search-form__dropdown')
  $('.js-header-search-input').closest('.search-form').find('.search-form__dropdown').hide();
}

function closeMobileMenu() {
  $('.js-mobile-menu-toggler').removeClass('is-active');
  $('.js-mobile-menu-toggler').find('use').attr('xlink:href', 'images/sprite.svg#burger_icon');

  $('.mobile-menu').fadeOut(function() {
    $('body').removeClass('is-overflow');
  });
}

$(document).ready(function() {
  //запуск функции навешивания класса на шапку
  resize_scroll();

  //кастомный селект
  $('.js-select').each(function() {
    var $p = $(this).closest('.select-wrapper');
    $(this).select2({
      dropdownPosition: 'below',
      dropdownParent: $p,
      minimumResultsForSearch : Infinity,
    });
	}).on('select2:open', function (e) {
    var $p = $(this).closest('.select-wrapper');
    $p.addClass('open');
	}).on('select2:close', function (e) {
    var $p = $(this).closest('.select-wrapper');
    $p.removeClass('open');
	});

  //выравнивание размеров кнопок в табах
  $('.js-tabs-nav-equal').each(function() {
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

  //слайдер картинок
  $('.js-simple-slider').each(function(index, el) {
    var slider = el.children[0].children[0];

    new Swiper(slider, {
      loop: true,
      spaceBetween: 20,
      autoHeight: true,

      navigation: {
        nextEl: '.js-simple-slider-next[data-slider="'+el.dataset.slider+'"]',
        prevEl: '.js-simple-slider-prev[data-slider="'+el.dataset.slider+'"]',
      },

      pagination: {
        el: '.js-simple-slider-pagination[data-slider="'+el.dataset.slider+'"]',
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
    closeMobileSearch();
    $('body').addClass('is-overflow');
    $('.mobile-menu').fadeIn();
    _this.addClass('is-active');
    _this.find('use').attr('xlink:href', 'images/sprite.svg#close_icon');
  }else{
    closeMobileMenu();
  }

  return false;
});

//тогглер меню второго уровня
$(document).on('click', '.js-menu-toggler', function () {
  let _this = $(this);
  if($('body').width() < 1024){
    if(!_this.hasClass('is-active')){
      _this.addClass('is-active');
      _this.attr('title', 'Закрыть');
      _this.closest('.menu__item').find('.submenu').slideDown();
    }else{
      _this.removeClass('is-active');
      _this.attr('title', 'Открыть');
      _this.closest('.menu__item').find('.submenu').slideUp();
    }
  }
  return false;
});

//тогглер поиска на мобильном
$(document).on('click', '.js-mobile-search-toggler', function () {
  let _this = $(this);
  if(!_this.hasClass('is-active')){
    closeMobileMenu();
    _this.attr('title', 'Закрыть');
    _this.find('use').attr('xlink:href', 'images/sprite.svg#close_icon');
    _this.addClass('is-active');
    $('.header__search').addClass('is-open');
  }else{
    _this.attr('title', 'Поиск');
    _this.find('use').attr('xlink:href', 'images/sprite.svg#search_icon');
    _this.removeClass('is-active');
    $('.header__search').removeClass('is-open');
  }
  return false;
});

//открытие поиска на десктопе
$(document).on('click', '.js-search-toggler', function () {
  let _this = $(this);
  if(!_this.hasClass('is-active')){
    _this.attr('title', 'Закрыть');
    _this.addClass('is-active');
    $('.header-fixed').addClass('no-shadow');
    $('.header__search').addClass('is-open');
  }else{
    closeSearch();
  }

  return false;
});

//закрытие поиска на десктопе
$(document).on('click', '.js-search-closer', function () {
  closeSearch();
  return false;
});

$(document).on('input', '.js-header-search-input', function() {
  let _this = $(this);
  if(_this.val().length > 3){
    _this.closest('.search-form').find('.search-form__dropdown').show();
  } else {
    _this.closest('.search-form').find('.search-form__dropdown').hide();
  }
});

//аккордион
$(document).on('click', '.js-accordion-toggler', function() {
  let _this = $(this);
  if(!_this.hasClass('is-active')){
    _this.addClass('is-active');
    _this.attr('title', 'Закрыть');
    _this.closest('.accordion').find('.accordion__body').slideToggle();
  }else{
    _this.removeClass('is-active');
    _this.attr('title', 'Открыть');
    _this.closest('.accordion').find('.accordion__body').slideToggle();
  }

  return false;
});

//табы
$(document).on('click', '.js-tab', function() {
  $(this).closest('.tabs').find('.js-tab').removeClass('is-active');
  $(this).addClass('is-active');

  $(this).closest('.tabs').find('.tab').removeClass('is-active');
  $(this).closest('.tabs').find('.tab[data-tab="'+$(this).attr('data-tab')+'"]').addClass('is-active');
  return false;
});

//input[type=file]
$('.file input[type=file]').on('change', function(){
	let file = this.files[0];
  $(this).closest('.file').addClass('is-filled');
	$(this).closest('.file').find('.file__label-text').html(file.name);
});

//сбросс содержимого input[type=file]
$(document).on('click', '.js-file-clear', function () {
  $(this).closest('.file').find('input[type=file]').val('');
  $(this).closest('.file').removeClass('is-filled');
  $(this).closest('.file').find('.file__label-text').html('Прикрепить файл');
  return false;
});
