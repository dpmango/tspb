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

        $('.site > .sidebar').each(function () {
            new Sidebar($(this));
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

        $('.form').each(function () {
            new Form($(this));
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
                        cursoropacitymin: 1,
                        cursorwidth: '6px',
                        cursorborderradius: '3px',
                        cursorborder: '0'
                    });
                }
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
                            icon: 'img/icons/IMG_20180307_145731_396.png',
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
                        if ( _route ){
                          $.getJSON( _route )
                            .always(function(res){
                              _route = res;
                              buildRoute();
                            });

                          _revert
                            .on('click', function(){
                              if ( _revert.is('.active') ){
                                $.getJSON( _routeReverse )
                                  .always(function(res){
                                    _route = res;
                                    buildRoute();

                                    _revert.removeClass('active');
                                    return false;
                                  });
                              } else {
                                $.getJSON( _routeReverse )
                                  .always(function(res){
                                    _route = res;
                                    buildRoute();

                                    _revert.addClass('active');
                                    return false;
                                  });
                              }

                            })

                          // опции
                          // https://tech.yandex.ru/maps/jsbox/2.1/multiroute_view_options

                          // multiRoute не даст задать конкретные точки Остановок
                          // var multiRoute = new ymaps.multiRouter.MultiRoute({
                          //     referencePoints: [
                          //         [59.939095, 30.315868],
                          //         "Санкт-Питербург, КАД"
                          //     ],
                          //     params: {
                          //         routingMode: 'masstransit'
                          //     }
                          // }, {
                          //     boundsAutoApply: true
                          // });
                          //
                          // myMap.geoObjects.add(multiRoute);

                          // обьект удаления
                          var cachedRoute;

                          function buildRoute(){

                            // очищаем
                            myMap.geoObjects.remove(cachedRoute);

                            var wayPoints = [];
                            $.each(_route, function(i, route){
                              wayPoints.push(route.cord)
                            });

                            // возможно точки прийдется скейлить
                            // https://tech.yandex.ru/maps/jsbox/2.1/scalable_placemarks

                            ymaps.route(wayPoints, {
                                // options
                                // multiRoute: true,
                                mapStateAutoApply: true,
                                routingMode: "masstransit",

                            }).then(function (route) {
                                var points = route.getWayPoints(),
                                    lastPoint = points.getLength() - 1;

                                points.options.set({
                                  // preset: 'islands#redStretchyIcon'
                                  iconLayout: 'default#image',
                                  iconImageHref: 'img/icons/IMG_20180307_145737_116.png',
                                  iconImageSize: [35, 35],
                                  iconImageOffset: [-17, -17]
                                });
                                points.get(0).properties.set('iconContent', 'Точка отправления');
                                points.get(lastPoint).properties.set('iconContent', 'Точка прибытия');

                                route.getPaths().options.set({
                                    balloonContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.humanJamsTime }}'),
                                    strokeColor: '0000ffff',
                                    opacity: 0.7
                                });
                                cachedRoute = route;
                                // добавляем маршрут на карту
                                myMap.geoObjects.add(cachedRoute);
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

} )();
