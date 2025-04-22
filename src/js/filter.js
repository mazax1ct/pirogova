//открытие фильтра
$(document).on('click', '.js-filter-opener', function() {
  $('body').addClass('is-overflow');
  $('.filter').fadeIn().css('display', 'flex');
  return false;
});

//закрытие фильтра
$(document).on('click', '.js-filter-closer', function() {
  $('.combobox').removeClass('is-open');
  $('.filter').fadeOut(function() {
    $('body').removeClass('is-overflow');
  });
  return false;
});

//тогглер комбобокса
$(document).on('click', '.js-combobox-toggler', function () {
  let combobox = $(this).closest('.combobox');
  let dropdown = combobox.find('.combobox__dropdown');

  if($('body').width() < 1024){
    if(combobox.hasClass('is-open')) {
      dropdown.fadeOut(function() {
        combobox.removeClass('is-open');
      });
    } else {
      $('.combobox__dropdown').fadeOut(function () {
        $('.combobox').removeClass('is-open');
      });
      dropdown.fadeIn().css('display', 'flex');
      setTimeout(function() {
        combobox.addClass('is-open');
      }, 300);
    }
  } else {
    if(combobox.hasClass('is-open')) {

        combobox.removeClass('is-open');

    } else {
      $('.combobox').removeClass('is-open');
      combobox.addClass('is-open');
    }
  }

  return false;
});

//закрытие комбобокса
$(document).on('click', '.js-combobox-closer', function () {
  let combobox = $(this).closest('.combobox');
  let dropdown = combobox.find('.combobox__dropdown');

  if(combobox.hasClass('is-open')) {
    dropdown.fadeOut(function() {
      combobox.removeClass('is-open');
    });
  }

  return false;
});

//выбор даты
$(".js-date-mask").each(function(index, element) {
  let dp = new AirDatepicker(element, {
    prevHtml: '<svg title="Назад"><use xlink:href="images/sprite.svg#chevron_left" /></svg>',
    nextHtml: '<svg title="Вперёд"><use xlink:href="images/sprite.svg#chevron_right" /></svg>',
    inline: true,
    range: true,
    multipleDatesSeparator: ' - ',
    minDate: new Date()
    //visible: true
  });

  $(document).on('click', '.js-dp-clear', function () {
    dp.clear();
    $('.air-datepicker-cell').removeClass('-in-range-');
    return false;
  });
});

$(document).ready(function() {
  if($('.js-filter-results').height() > 40) {
    $('.js-filter-results').addClass('is-collapsed');
    $('.js-filter-results-toggler').css('display', 'flex');
  }
});

$(document).on('click', '.js-filter-results-toggler', function () {
  if(!$(this).hasClass('is-active')) {
    $('.js-filter-results').removeClass('is-collapsed');
    $(this).addClass('is-active');
  } else {
    $('.js-filter-results').addClass('is-collapsed');
    $(this).removeClass('is-active');
  }
});
