(function(window) {
  window.socket = io.connect(location.host);
  toastr.options = {
    closeButton : true,
    debug : false,
    progressBar: true,
    positionClass: 'toast-bottom-right',
    onclick: null,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '10000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
  };

  /*
   * Creates a positive or negative toast notification depending on the status provided
  */
  window.notify = function(success, error, stat) {
    if (stat === null) {
      toastr.success(success);
    } else {
      if (stat !== false) {
        toastr.error(error + stat);
      } else {
        toastr.error(error + 'Unknown Error');
      }
    }
  };

  window.Component = { };

  (function(jQuery) {
    jQuery.eventEmitter = {
      _JQInit: function() {
        this._JQ = jQuery(this);
      },
      emit: function(evt, data) {
        !this._JQ && this._JQInit();
        this._JQ.trigger(evt, data);
      },
      once: function(evt, handler) {
        !this._JQ && this._JQInit();
        this._JQ.one(evt, handler);
      },
      on: function(evt, handler) {
        !this._JQ && this._JQInit();
        this._JQ.bind(evt, handler);
      },
      off: function(evt, handler) {
        !this._JQ && this._JQInit();
        this._JQ.unbind(evt, handler);
      }
    };
  }(jQuery));

  function DuplexEvent() {}
  jQuery.extend(DuplexEvent.prototype, jQuery.eventEmitter);
  window.DuplexEvent = DuplexEvent;

  /**
   * Creates the transitions between page components
  */
  (function() {
    var isAnimating = false;
    var toggle = true;
    var animEndEventNames = {
      'WebkitAnimation' : 'webkitAnimationEnd',
      'OAnimation' : 'oAnimationEnd',
      'msAnimation' : 'MSAnimationEnd',
      'animation' : 'animationend'
    };
    // animation end event name
    var animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
    // support css animations
    var support = Modernizr.cssanimations;

    jQuery.fn.swapPage = function($nextPage) {
      $('body').addClass('hideOverflow');
      var $currentPage = $(this);
      var inClass;
      var outClass;
      var remaining = 2;

      if (isAnimating) {
        return;
      }
      if (!$currentPage.is(':visible') || $nextPage.is(':visible')) {
        return;
      }
      isAnimating = true;
      if (toggle) {
        outClass = 'pt-page-moveToTop';
        inClass = 'pt-page-moveFromBottom'; 
      } else {
        outClass = 'pt-page-moveToBottom';
        inClass = 'pt-page-moveFromTop';      
      }
      toggle = !toggle;
     
      $currentPage.addClass(outClass).on(animEndEventName, function() {
        $currentPage.off(animEndEventName);
        $currentPage.removeClass(outClass).hide();
        remaining--;
        if (remaining === 0) {
          isAnimating = false;
          $('body').removeClass('hideOverflow');
        }
      });

      $nextPage.show().addClass(inClass).on(animEndEventName, function() {
        $nextPage.off(animEndEventName);
        $nextPage.removeClass(inClass);
        remaining--;
        if (remaining === 0) {
          isAnimating = false;
          $('body').removeClass('hideOverflow');
        }
      });
 
      if (!support) {
        onEndAnimation($currentPage, $nextPage);
      }
    };
  })();

  ace.config.set('modePath', '/static/js');
  ace.config.set('workerPath', '/static/js');
  ace.config.set('themePath', '/static/js');
  ace.config.set('suffix', '.min.js');

  $(document).on('ready', function() {
    React.render(
      React.createElement(Component.App, null)
    , $('body')[0]);
  });
})(window);
