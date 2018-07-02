( function(){

    $( function(){

        $( '.popup' ).each(function(){

            new Popup($(this));
        });

    });

    var Popup = function( obj ){

        //private properties
        var _self = this,
            _btnShow =  $( '.popup__open' ),
            _obj = obj,
            _btnClose = _obj.find( '.popup__close, .popup__cancel' ),
            _wrap = _obj.find( '.popup__wrap' ),
            _contents = _obj.find( '.popup__content' ),
            _scrollConteiner = $( 'html' ),
            _window = $( window ),
            _timer = setTimeout( function(){}, 1 );

        //private methods
        var _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div'),
                    scrollBarWidth;

                scrollDiv.className = 'popup__scrollbar-measure';

                document.body.appendChild( scrollDiv );

                scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                document.body.removeChild(scrollDiv);

                return scrollBarWidth;
            },
            _hide = function(){
                _wrap.find( 'iframe' ).remove();
                _obj.css( {
                    overflowY: 'hidden'
                } );
                _scrollConteiner.css( {
                    overflowY: 'auto',
                    paddingRight: 0
                } );

                _obj.removeClass( 'popup_opened' );
                _obj.addClass( 'popup_hide' );

                $( '.popup__video video' ).each(function () {
                    this.pause();
                });

                _timer = setTimeout( function(){

                    _obj.css ({
                        overflowY: 'auto'
                    });

                    _obj.removeClass( 'popup_hide' );
                }, 300 );

            },
            _init = function(){
                _obj[ 0 ].obj = _self;
                _onEvents();
            },
            _onEvents = function(){
                _btnShow.on( {
                    click: function(){
                        _show( $( this ).attr( 'data-popup' ) );
                        return false;
                    }
                } );
                _contents.on( {
                    click: function( e ){
                        e.stopPropagation();
                    }
                } );
                _obj.on( {
                    click: function(){
                        _hide();
                        return false;
                    }
                } );
                _btnClose.on( {
                    click: function(){
                        _hide();
                        return false;
                    }
                } );
            },
            _show = function( className ){
                _setPopupContent( className );

                _scrollConteiner.css( {
                    overflowY: 'hidden',
                    paddingRight: _getScrollWidth()
                } );
                _obj.addClass( 'popup_opened' );

                if (className == 'success-added') {
                    setTimeout(function () {
                        _hide();
                    }, 2000);
                }

            },
            _setPopupContent = function( className ){
                var curContent = _contents.filter( '.popup__' + className );

                _contents.css( { display: 'none' } );
                curContent.css( { display: 'block' } );
            };

        //public properties

        //public methods
        _self.showPopup = function (popupName) {
            _show( popupName );
        };

        _init();
    };
} )();

