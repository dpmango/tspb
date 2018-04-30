( function(){
    //////////
    // Global variables
    //////////

    var _window = $(window);
    var _document = $(document);

    function pageReady(){
      legacySupport();
    }

    function legacySupport(){
      // svg support for IE
      svg4everybody();

      // Viewport units buggyfill
      window.viewportUnitsBuggyfill.init({
        force: false,
        refreshDebounceWait: 150,
        appendToBody: true
      });
    }

    // Prevent # behavior
    _document.on('click', '[href="#"]', function(e) {
      e.preventDefault();
    });


    $(function () {

        if ($('.scroll-content').length) {
            $('.scroll-content').niceScroll({
                cursorcolor: 'rgb(217, 217, 217)',
                cursoropacitymin: 1,
                cursorwidth: '6px',
                cursorborderradius: '3px',
                cursorborder: '0'
            });
        }

        $('.shedule').each(function () {
            new Shedule($(this));
        });

        $('.sign').each(function () {
            new Sign($(this));
        });

        $('.tab').each(function () {
            new Tab($(this));
        });

        $('.dropdown').each(function () {
            new Dropdown($(this));
        });

        $('.header').each(function () {
            new Header($(this));
        });

        $('.map').each(function () {
            new Map($(this));
        });

        $('.nice-toggle').each(function () {
            new NiceToggle($(this));
        });

        $('.form_validate').each(function () {
            $(this).validate({
                rules:{
                    'login-email':{
                        required: true
                    },
                    'login-password':{
                        required: true,
                        minlength: 6,
                        maxlength: 16,
                    },
                    'registration-email':{
                        required: true
                    },
                    'registration-password':{
                        required: true,
                        minlength: 6,
                        maxlength: 16,
                    },
                    'registration-password-repeat':{
                        required: true,
                        minlength: 6,
                        maxlength: 16,
                    },
                },
                messages:{
                    'login-email':{
                        required: "Поле 'Email' обязательно к заполнению",
                        email: "Необходим формат адреса email"
                    },
                    'login-password':{
                        required: "Неправильный пароль",
                        minlength: "Пароль должен быть минимум 6 символа",
                        maxlength: "Пароль должен быть максимум 16 символов"
                    },
                    'registration-email':{
                        required: "Поле 'Email' обязательно к заполнению",
                        email: "Необходим формат адреса email"
                    },
                    'registration-password':{
                        required: "Неправильный пароль",
                        minlength: "Пароль должен быть минимум 6 символа",
                        maxlength: "Пароль должен быть максимум 16 символов"
                    },
                    'registration-password-repeat':{
                        required: "Неправильный пароль",
                        minlength: "Пароль должен быть минимум 6 символа",
                        maxlength: "Пароль должен быть максимум 16 символов"
                    },
                }
            });
        });

        $('.datepicker-here').each(function () {
            $(this).datepicker();
        });
    });

    var Tab = function(obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _controlsItem = _obj.find('.tab__controls-item'),
            _contentItem = _obj.find('.tab__content-item');

        //private methods
        var _onEvents = function()  {

                _controlsItem.on( {
                    click: function() {
                        var curElem = $(this),
                            curIndex = curElem.index();

                        _controlsItem.each(function (i) {
                            _controlsItem.eq(i).removeClass('active');
                            _contentItem.eq(i).removeClass('active');
                        });

                        curElem.addClass('active');
                        _contentItem.eq(curIndex).addClass('active');

                        return false;
                    }
                } );

            },
            _init = function() {
                _obj[0].obj = _self;
                _onEvents();
            };

        //public properties

        //public methods
        _self.setActive = function (index) {
            _controlsItem.eq(index).trigger('click');
        };

        _init();
    };

    var Sign = function(obj) {

        //private properties
        var _obj = obj,
            _item = _obj.find('.sign__item'),
            _tab = _obj.find('.tab');

        //private methods
        var _onEvents = function()  {

                _item.on( {
                    click: function() {
                        var curIndex = $(this).index();

                        _tab[0].obj.setActive(curIndex);

                        _obj.addClass('open');

                        return false;
                    }
                } );

                $(window).on( {
                    click: function(e) {
                        var path = e.originalEvent.path,
                            canClose = true;

                        path.forEach(function (item) {
                            if ( item.className == 'sign__modal' ) canClose = false;
                        });

                        if (canClose) _obj.removeClass('open');
                    }
                } );

            },
            _init = function() {
                _onEvents();
            };

        _init();
    };

    var Dropdown = function(obj) {

        //private properties
        var _obj = obj,
            _item = _obj.find('> .dropdown__title');

        //private methods
        var _onEvents = function()  {

                _item.on( {
                    click: function() {

                        _obj.toggleClass('open');

                    }
                } );

            },
            _init = function() {
                _onEvents();
            };

        _init();
    };

    var Shedule = function(obj) {

        //private properties
        var _obj = obj,
            _item = _obj.find('.shedule__title');

        //private methods
        var _onEvents = function()  {

                _item.on( {
                    click: function() {
                        var curElem = $(this),
                            curParent = curElem.parent();

                        curParent.toggleClass('open');
                    }
                } );

            },
            _init = function() {
                _onEvents();
            };

        _init();
    };

    var Header = function(obj) {

        //private properties
        var _obj = obj,
            _btn = _obj.find('.header__btn');

        //private methods
        var _onEvents = function()  {

                _btn.on( {
                    click: function() {

                        _obj.toggleClass('active');

                    }
                } );

            },
            _init = function() {
                _onEvents();
            };

        _init();
    };

    var Map = function(obj) {

        //private properties
        var _obj = obj,
            _map = _obj.find('.map__layout'),
            _centerMap = _map.data('center') || [55.751574, 37.573856],
            _zoom = _map.data('zoom') || 9,
            _fullsize = _obj.find('.map__fullsize'),
            _fullMap = $('.map_full'),
            _close = _fullMap.find('.map__close');

        console.log(_fullsize, _fullMap);
        //private methods
        var _onEvents = function()  {

                _fullsize.on({
                    'click': function () {
                        _fullMap.addClass('active');
                        console.log('click');
                        return false;
                    }
                });

                _close.on({
                    'click': function () {
                        _fullMap.removeClass('active');
                        return false;
                    }
                });

                ymaps.ready(function () {
                    var myMap = new ymaps.Map(_map[0], {
                            center: _centerMap,
                            zoom: _zoom
                        }, {
                            searchControlProvider: 'yandex#search'
                        }),

                        // Создаём макет содержимого.
                        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                        ),

                        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                            hintContent: 'Собственный значок метки',
                            balloonContent: 'Это красивая метка'
                        }, {
                            // Опции.
                            // Необходимо указать данный тип макета.
                            iconLayout: 'default#image',
                            // Своё изображение иконки метки.
                            iconImageHref: 'images/myIcon.gif',
                            // Размеры метки.
                            iconImageSize: [30, 42],
                            // Смещение левого верхнего угла иконки относительно
                            // её "ножки" (точки привязки).
                            iconImageOffset: [-5, -38]
                        }),

                        myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
                            hintContent: 'Собственный значок метки с контентом',
                            balloonContent: 'А эта — новогодняя',
                            iconContent: '12'
                        }, {
                            // Опции.
                            // Необходимо указать данный тип макета.
                            iconLayout: 'default#imageWithContent',
                            // Своё изображение иконки метки.
                            iconImageHref: 'images/ball.png',
                            // Размеры метки.
                            iconImageSize: [48, 48],
                            // Смещение левого верхнего угла иконки относительно
                            // её "ножки" (точки привязки).
                            iconImageOffset: [-24, -24],
                            // Смещение слоя с содержимым относительно слоя с картинкой.
                            iconContentOffset: [15, 15],
                            // Макет содержимого.
                            iconContentLayout: MyIconContentLayout
                        });

                    myMap.geoObjects
                        .add(myPlacemark)
                        .add(myPlacemarkWithContent);
                });

            },
            _init = function() {
                _onEvents();
            };

        _init();
    };

    var NiceToggle = function(obj) {

        //private properties
        var _obj = obj,
            _inputs = _obj.find('input[type=radio]'),
            _slider = _obj.find('.nice-toggle__slider');

        //private methods
        var _onEvents = function()  {

                _slider.on( {
                    click: function() {

                        _inputs.each(function () {
                            var curItem = $(this);

                            if (!curItem.prop('checked')) {
                                curItem.trigger('click');
                                return false;
                            }
                        });

                    }
                } );

            },
            _init = function() {
                _onEvents();
            };

        _init();
    };

} )();
