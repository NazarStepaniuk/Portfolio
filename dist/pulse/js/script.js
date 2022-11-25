$(document).ready(function(){
    $('.carousel__catalog').slick({  
        speed: 1200,
        slidesToShow: 1,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left_slider.png" alt"arrow"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/right_slider.png" alt"arrow"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    });


    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
    function toggleSlide(item){
        $(item).each(function(i){
            $(this).on('click', function(k){
                // используеться на ссылках, вместо перехода куда то будут другие действия
                k.preventDefault();
                // если такого класса нет, то добавить, если есть, то убрать
                $('.catalog-item__main').eq(i).toggleClass('catalog-item__main_active');
                $('.catalog-item__second').eq(i).toggleClass('catalog-item__second_active');
            })
        })
    };
    toggleSlide('.catalog-item__more');
    toggleSlide('.catalog-item__back');




    $('[data-modal="consultating"]').on('click', function(){
        $('.overlay, #consultating').fadeIn('slow');
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #consultating').fadeOut('slow');
    });




    function valideForm(from)
    {
        $('#consultating form').validate({
            rules:{
                name:{
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email:{
                    required: true,
                    email: true
                }
            },
            messages:{
                name: {
                    required: "Пожалуйста, введите ваше имя",
                    minlength: jQuery.validator.format("Имя должно состоять как минимум с {0} символов")
                },
                phone: "Пожалуйста, введите ваше имя",
                email: {
                    required: "Пожалуйста, введите адрес вашей почты",
                    email: "Введите вашу почту правильно"
                }
            }
        });
    }
     // нужно передать форму(здесь она внутри)
     valideForm('#consultating form');
     valideForm('#consulte');

     $('input[name=phone]').mask("+7 (999) 999-99-99")


     $('form').submit(function(e){
        // отключает стандартное поведение браузера(сайт не будет перезагружаться во время отссылки формы)
        e.preventDefault();
        if(!$(this).valid()){
            return;
        }
        // метод для отправки/вытягивания данных с сервера
        $.ajax({
            // тип для отправки
            type: "POST",
            url: "mailer/smart.php",
            // текущие данные страницы
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");


            $('form').trigger('reset');
        });
        return false;
     });

    //  SCROLL
    $(window).scroll(function(){
        if($(this).scrollTop() > 1000){
            $('.page-up').fadeIn();
        }
        else{
            $('.page-up').fadeOut();
        }
    })
});