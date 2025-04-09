$(document).on('click', '.alphabeth__button', function () {
  let _this = $(this);
  $('.alphabeth__button').removeClass('is-active');
  _this.addClass('is-active');

  if(_this.text() == 'Все'){
    $('.letter').removeClass('no-border').show();
  }else{
    $('.letter').addClass('no-border').hide();

    $('.letter__letter').each(function (index, el) {
      if($(this).text() === _this.text()){
        $(this).closest('.letter').show();
      }
    });
  }

  return false;
});
