( function(){
    //////////
    // Global variables
    //////////

    var _window = $(window);
    var _document = $(document);

    function pageReady(){
      legacySupport();
      initModals();
    }

    pageReady();

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

    function initModals(){
      // Magnific Popup
      var startWindowScroll = 0;
      $('[js-popup]').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'popup-buble',
        callbacks: {
          beforeOpen: function() {
            startWindowScroll = _window.scrollTop();
            // $('html').addClass('mfp-helper');
          },
          close: function() {
            // $('html').removeClass('mfp-helper');
            _window.scrollTop(startWindowScroll);
          }
        }
      });
    }

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

        if ($('.transport__list').length) {
            $('.transport__list').niceScroll({
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

        $('.change').each(function () {
            new ChangeText($(this));
        });

        $('.route').each(function () {
            new Route($(this));
        });

        $('.metro-line').each(function () {
            new MetroLine($(this));
        });

        $('.sign').each(function () {
            new Sign($(this));
        });

        $('.site > .sidebar').each(function () {
            new Sidebar($(this));
        });

        $('.tab').each(function () {
            new Tab($(this));
        });

        $('.transport').each(function () {
            new Transport($(this));
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

        $('.form').each(function () {
            new Form($(this));
        });

        $('.datepicker-here').each(function () {
            $(this).datepicker();
        });

        $('.action-buttons__item.favorite').on({
            'click': function () {
                $(this).toggleClass('active');
            }
        });

        $('.user').each(function () {
            new User($(this));
        });

        $('.show-more').each(function () {
            new ShowMore($(this));
        });

        var swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
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

    var Transport = function(obj) {

        //private properties
        var _obj = obj,
            _controlsItem = _obj.find('.transport__count'),
            _contentItem = _obj.find('.transport__list-content');

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
            _setFirstActive = function() {
                var firstElem = _controlsItem.eq(0);
                firstElem.trigger('click');
            },
            _init = function() {
                _onEvents();
                _setFirstActive();
            };

        //public properties

        //public methods

        _init();
    };

    var ChangeText = function(obj) {

        //private properties
        var _obj = obj,
            _btn = _obj.find('.change__btn'),
            _wrap = _obj.find('.change__field'),
            _hidden = _obj.find('.change__field-hidden'),
            _field = _obj.find('.change__field input');

        //private methods
        var _onEvents = function()  {

                $(window).on({
                    'load': function () {
                        _setFieldWidth();
                    }
                });

                _btn.on( {
                    click: function() {
                        _field.focus();

                        return false;
                    }
                } );

                _field.on( {
                    'keydown': function() {
                        _setFieldWidth();
                    }
                } );

            },
            _setFieldWidth = function() {
                var curValue = _field.val();

                _hidden.text(curValue);
                _field.css({ 'width': _hidden.width + 5 });
            },
            _init = function() {
                _onEvents();
                _setFieldWidth();
            };

        //public properties

        //public methods

        _init();
    };

    var Sign = function(obj) {

        //private properties
        var _obj = obj,
            _item = _obj.find('.sign__item'),
            _tab = _obj.find('.tab'),
            _site = $('.site'),
            _closeBtn = _obj.find('.sign__close');

        //private methods
        var _onEvents = function()  {

                _item.on( {
                    click: function() {
                        var curIndex = $(this).index();

                        _tab[0].obj.setActive(curIndex);

                        _obj.addClass('open');

                        _site.addClass('sign-in-open');

                        return false;
                    }
                } );

                $(document).on( {
                    click: function(e) {
                        var canClose = true;

                        if ( !$(e.target).closest('.sign__modal') ){
                            canClose = false;
                        }


                        if (canClose) {
                            _obj.removeClass('open');
                            _site.removeClass('sign-in-open');
                        }
                    }
                } );


                _closeBtn.on( {
                    click: function() {
                        _obj.removeClass('open');
                        _site.removeClass('sign-in-open');

                        return false;
                    }
                } );

            },
            _init = function() {
                _onEvents();
            };

        _init();
    };

    var Sidebar = function(obj) {

        //private properties
        var _obj = obj,
            _item = _obj.find('.sidebar__item'),
            _cloneWrap = $('<div class="sidebar sidebar_clone"></div>');

        //private methods
        var _onEvents = function()  {

                _item.on( {
                    mouseenter: function() {
                        var curElem = $(this),
                            curIndex = curElem.index(),
                            cloneElem = _cloneWrap.find('.sidebar__item').eq(curIndex);

                        _cloneWrap.find('.sidebar__item').removeClass('hover');
                        _item.removeClass('hover');

                        cloneElem.addClass('hover');
                        curElem.addClass('hover');
                    }
                } );

                $(window).on( {
                    resize: function() {
                        _obj.getNiceScroll().resize();
                        _setSidebarHeight();
                        _setTopSubmenu();
                    },
                    mousemove: function(e) {
                        var cloneItems = _cloneWrap.find('.sidebar__item');

                        if (!_checkTarget(e.target, 'submenu')) {
                            if (!_checkTarget(e.target, 'sidebar__item')) {
                                cloneItems.removeClass('hover');
                                _item.removeClass('hover');
                            }
                        }
                    }
                } );

                _obj.on( {
                    scroll: function() {
                        _setTopSubmenu();
                    }
                } );

            },
            _checkTarget = function(target, className) {

                if ($(target).hasClass(className)) {
                    return true;
                } else {
                    if (target.parentNode) {
                        return _checkTarget(target.parentNode, className);
                    } else {
                        return false;
                    }
                }
            },
            _cloneSidebar = function() {

                _item.each(function () {
                    var curElem = $(this);

                   _cloneWrap.append(curElem.clone());
                });

                $('.site').prepend(_cloneWrap);
            },
            _setTopSubmenu = function() {

                _item.each(function () {
                    var curElem = $(this),
                        curSubmenu = curElem.find(' > .submenu'),
                        cloneCurElem = _cloneWrap.find('.sidebar__item').eq(curElem.index()),
                        cloneSubmenu = cloneCurElem.find(' > .submenu');

                    if (curSubmenu.length) {
                        cloneSubmenu.css({ 'top': curElem.offset().top - $(window).scrollTop() + 'px' });
                    }
                });
            },
            _setSidebarHeight = function() {
                _obj.css({ 'height': 'auto' });
                var curHeight = $(window).outerHeight(),
                    elem = _obj.outerHeight();

                if ((curHeight - elem - 92) < 0) {
                    _obj.css({ 'height': (curHeight - 92) + 'px' });
                }

            },
            _init = function() {
                _cloneSidebar();
                _onEvents();
                _setSidebarHeight();
                _setTopSubmenu();
                if (!_obj.hasClass('sidebar_clone')) {
                    _obj.niceScroll({
                        autohidemode: true,
                        railalign: 'left',
                        cursorcolor: 'rgb(217, 217, 217)',
                        background: 'rgb(182, 180, 180)',
                        cursoropacitymin: 1,
                        cursorwidth: '6px',
                        cursorborderradius: '3px',
                        cursorborder: '0'
                    });
                }
            };

        _init();
    };

    var ShowMore = function(obj) {

        //private properties
        var _obj = obj,
            _id = _obj.data('id'),
            _wrapper = $('#' + _id),
            _hiddenElems = _wrapper.find('.hidden');

        //private methods
        var _onEvents = function()  {

                _obj.on( {
                    click: function() {
                       _hiddenElems.removeClass('hidden');
                        _obj.remove();
                        return false;
                    }
                } );

            },
            _init = function() {
                _onEvents();
            };

        _init();
    };

    var User = function(obj) {

        //private properties
        var _obj = obj,
            _icon = _obj.find('.user__icon'),
            _popup = $('.user-popup');

        //private methods
        var _onEvents = function()  {

                _icon.on( {
                    click: function() {
                        _popup.toggleClass('open');
                    }
                } );

                $(window).on( {
                    'click': function(e) {

                        if (!_checkTarget(e.target, 'user-popup')) {
                            if (!_checkTarget(e.target, 'user__icon')) {
                                _popup.removeClass('open');
                            }
                        }
                    }
                } );

            },
            _checkTarget = function(target, className) {

                if ($(target).hasClass(className)) {
                    return true;
                } else {
                    if (target.parentNode) {
                        return _checkTarget(target.parentNode, className);
                    } else {
                        return false;
                    }
                }
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
            _centerMap = _map.data('center') || [59.939095, 30.315868],
            _zoom = _map.data('zoom') || 9,
            _placemark = _map.data('placemark'),
            _placemarkContent = _map.data('placemark-content')
            _route = _map.data('route'),
            _routeReverse = _map.data('route-reverse'),
            _zoomable = _map.data('zoom') || true,
            _fullsize = _obj.find('.map__fullsize'),
            _revert = obj.find('.map__revert'),
            _fullMap = $('.map_full'),
            _fullMapWrap = $('.map__wrap'),
            _close = _fullMap.find('.map__close'),
            _points = _fullMap.find('.map__column_points');

        //private methods
        var _onEvents = function()  {

                $(window).on({
                    'resize': function () {
                        var curWindowSize = $(window).width();
                        if (_points.length && curWindowSize > 767) {
                            _points.getNiceScroll().resize();
                        } else {
                            if ( _points.getNiceScroll()) {
                                _points.getNiceScroll().remove();
                            }
                        }
                    }
                });

                _fullsize.on({
                    'click': function () {
                        var curWindowSize = $(window).width();

                        if (_points.length && curWindowSize > 767) {
                            _points.niceScroll({
                                cursorcolor: 'rgb(217, 217, 217)',
                                cursoropacitymin: 1,
                                cursorwidth: '6px',
                                cursorborderradius: '3px',
                                cursorborder: '0'
                            });
                        }
                        _fullMapWrap.css({ 'height': $(window).height() - $('.header').outerHeight() - $('.breadcrumbs').outerHeight() });
                        _fullMap.addClass('active');
                        return false;
                    }
                });

                _close.on({
                    'click': function () {
                        if (_points.length) {
                            _points.getNiceScroll().remove();
                        }
                        _fullMap.removeClass('active');
                        return false;
                    }
                });

                try {
                    ymaps.ready(function () {
                        var myMap = new ymaps.Map(_map[0], {
                                center: _centerMap,
                                zoom: _zoom
                            }, {
                                searchControlProvider: 'yandex#search'
                            })
                        myMap.controls.remove('trafficControl');
                        myMap.controls.remove('searchControl');
                        myMap.controls.remove('fullscreenControl');
                        myMap.controls.remove('rulerControl');
                        myMap.controls.remove('geolocationControl');
                        myMap.controls.remove('routeEditor');
                        myMap.controls.remove('typeSelector');
                        myMap.controls.remove('zoomControl');

                        // disable zoom ?
                        if ( !_zoomable ){
                          myMap.behaviors.disable('scrollZoom');
                        }


                        // GeoObjects


                        ////////
                        // PLACEMARK
                        ////////
                        if ( _placemark ){

                          var myBalloonLayout = ymaps.templateLayoutFactory.createClass(
                            '<div class="map-balloon"><div class="map-balloon-wrapper"><div class="map-balloon-content"><img src="{{properties.icon}}" /><span>{{properties.name}}</span></div><div class="map-balloon-close"><img src="img/close.png" /></div></div><div class="map-balloon-tail"</div></div>', {
                              build: function() {
                                 myBalloonLayout.superclass.build.call(this);
                                 $('.map-balloon-close').bind('click', $.proxy(this.onCloseClick, this));
                               },
                               clear: function() {
                                 $('.map-balloon-close').unbind('click', $.proxy(this.onCloseClick, this));
                                 myBalloonLayout.superclass.clear.call(this);
                               },
                               onCloseClick: function() {
                                 this.getData().geoObject.balloon.close();
                               }

                          });

                          // параметры плейсмарка
                          var myPlacemark = new ymaps.Placemark(_placemark, {
                            // properties
                            // balloonContent: "", // не подходит из-за необходимости стилизации
                            icon: 'img/icons/bus.png',
                            name: _placemarkContent,
                            balloonPanelMaxMapArea: 0,
                          },
                          {
                            // options
                            iconLayout: 'default#image',
                            iconImageHref: 'img/marker.png',
                            iconImageSize: [27, 37],
                            // iconImageOffset: [-13, -0],
                            hideIconOnBalloonOpen: false,
                            balloonLayout: myBalloonLayout,
                            balloonShadow: true,
                            // balloonContentBodyLayout: myBalloonContentBodyLayout,
                            // balloonContentLayout: myBalloonContentLayout,
                            // balloonCloseButtonLayout: myBalloonCloseButtonLayout,
                            balloonPanelMaxMapArea: 0
                          });
                          myMap.geoObjects.add(myPlacemark);

                        }

                        ////////
                        // ROUTE
                        ////////

                        // build route
                        var _routeRes;
                        if ( _route ){
                          $.getJSON( _route )
                            .always(function(res){
                              _routeRes = res;
                              buildRoute();
                            });

                          _document
                            .on('click', '.map__revert, .carriers__revert', function(){
                              var _this = $(this);
                              if ( _this.is('.active') ){
                                $.getJSON( _route )
                                  .always(function(res){
                                    _routeRes = res;
                                    buildRoute();

                                    _this.removeClass('active');
                                    return false;
                                  });
                              } else {
                                $.getJSON( _routeReverse )
                                  .always(function(res){
                                    _routeRes = res;
                                    buildRoute();

                                    _this.addClass('active');
                                    return false;
                                  });
                              }

                            })

                          // обьект удаления
                          var cachedRoute;

                          function buildRoute(){

                            // очищаем
                            myMap.geoObjects.remove(cachedRoute);

                            var wayPoints = [];
                            $.each(_routeRes, function(i, route){
                              wayPoints.push(route.cord)
                            });

                            ymaps.route(wayPoints, {
                                // options
                                // multiRoute: true,
                                mapStateAutoApply: true,
                                routingMode: "masstransit",

                            }).then(function (route) {
                                var points = route.getWayPoints(),
                                    lastPoint = points.getLength() - 1;

                                // LAYOUT для точки
                                var myBalloonLayout = ymaps.templateLayoutFactory.createClass(
                                  '<div class="map-balloon map-balloon--route"><div class="map-balloon-wrapper"><div class="map-balloon-content"><img src="{{properties.icon}}" /><span>{{properties.name}}</span></div><div class="map-balloon-close"><img src="img/close.png" /></div></div><div class="map-balloon-tail"</div></div>', {
                                    build: function() {
                                       myBalloonLayout.superclass.build.call(this);
                                       $('.map-balloon-close').bind('click', $.proxy(this.onCloseClick, this));
                                     },
                                     clear: function() {
                                       $('.map-balloon-close').unbind('click', $.proxy(this.onCloseClick, this));
                                       myBalloonLayout.superclass.clear.call(this);
                                     },
                                     onCloseClick: function() {
                                       this.getData().geoObject.balloon.close();
                                     }
                                });

                                // add properties for each point
                                for (i=0; i < points.getLength(); ++i){
                                  points.get(i).properties.set({
                                    icon: 'img/icons/electr.png',
                                    name: _routeRes[i].adress,
                                    balloonPanelMaxMapArea: 0,
                                  })
                                }

                                points.options.set({
                                  // preset: 'islands#redStretchyIcon'
                                  iconLayout: 'default#image',
                                  iconImageHref: 'img/icons/electr.png',
                                  iconImageSize: [35, 35],
                                  iconImageOffset: [-17, -17],
                                  hideIconOnBalloonOpen: false,
                                  balloonLayout: myBalloonLayout,
                                  balloonShadow: true,
                                  balloonPanelMaxMapArea: 0
                                });
                                // points.get(0).properties.set('iconContent', 'Точка отправления');
                                // points.get(lastPoint).properties.set('iconContent', 'Точка прибытия');

                                route.getPaths().options.set({
                                    balloonContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.humanJamsTime }}'),
                                    strokeColor: '0000ffff',
                                    opacity: 0.7
                                });
                                cachedRoute = route;
                                // добавляем маршрут на карту
                                myMap.geoObjects.add(cachedRoute);


                                // открытие балуна по клику в .carriers__item
                                _document
                                  .on('click', '.carriers__item', function(e){
                                    var dataId = $(this).data('id') - 1;

                                    if ( dataId ){
                                      var targetPoint = points.get(dataId);

                                      if (targetPoint) {
                                        var coord = targetPoint.geometry.getCoordinates();
                                        myMap.setCenter(coord, 14);
                                        targetPoint.balloon.open();
                                        e.preventDefault();

                                        $(this).siblings().removeClass('active');
                                        $(this).addClass('active')
                                      }

                                    }

                                  })
                            });
                          }


                        }

                    });
                } catch (err) {
                    console.error(err);
                }

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

    var Form = function(obj) {

        //private properties
        var _obj = obj,
            _inputs = _obj.find('input');

        //private methods
        var _onEvents = function()  {

                _inputs.on( {
                    focus: function() {
                        var curParent = $(this).parent();

                        if (curParent.data('placeholder')) curParent.addClass('in-focus');
                    },
                    blur: function() {
                        var curParent = $(this).parent();

                        if (curParent.hasClass('in-focus')) curParent.removeClass('in-focus');
                    }
                } );

            },
            _init = function() {
                _onEvents();
            };

        _init();
    };

    var Route = function(obj) {

        //private properties
        var _obj = obj,
            _btn = _obj.find('.plus-minus-btn');

        //private methods
        var _onEvents = function()  {

                _btn.on( {
                    'click': function() {
                        _obj.toggleClass('open');
                        _btn.toggleClass('opened');
                    }
                } );

            },
            _init = function() {
                _onEvents();
            };

        _init();
    };

    var MetroLine = function(obj) {

        //private properties
        var _obj = obj,
            _btn = _obj.find('.plus-minus-btn');

        //private methods
        var _onEvents = function()  {

                _btn.on( {
                    'click': function() {
                        _obj.toggleClass('open');
                        _btn.toggleClass('opened');
                    }
                } );

            },
            _init = function() {
                _onEvents();
            };

        _init();
    };

} )();
