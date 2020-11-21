(function ($, _, Drupal, Backbone) {
  /**
   * page loading
   */
  Drupal.behaviors.pageLoading = {
    // page loading mode
    Model: Backbone.Model.extend({
      defaults: {
        // delay: 100,
        classes: '', // get the links
        submits: '', // get the submits
        metaData: '', // get the links form data
        elements: {
          links: [],
          submits: []
        },
        esc_key: true,
        isIE: false,
        loadingText: Drupal.t('Loading...')
      },

      initialize: function () {
        this.set('isIE', this.isIE())
        this.setElements();
      },

      isIE: function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
          return true
        } else {
          return false
        }
      },

      setElements: function () {
        this.set('elements', this.getElements())
      },

      getElements: function () {
        var elements = {};

        // submits
        var submits = $(this.get('submits')).not('#edit-preview, .ignore-loading');
        elements.submits = this.getArray(submits);

        // links: ignore-loading 可自行配置 class 忽略 loading 效果
        var links = $(this.get('classes')).find('a:not(".use-ajax, .webform-ajax-link, .ignore-loading")');
        elements.links = this.getArray(links);

        // form custom data
        var formData = $(this.get('metaData'));
        if (formData) {
          elements.links.push(formData);
        }

        // console.log(elements)
        return elements;
      },

      getArray: function (ele) {
        var array = ele.toArray();
        return array;
      }
    }),

    // page loading view
    View: Backbone.View.extend({
      className: 'page-load-progress-lock-screen',
      initialize: function () {
        Drupal.behaviors.pageLoading.viewThat = this;

        this.render();
        _.each(this.getLinksElements(), this.onClick);
        _.each(this.getSubmitsElements(), this.onSubmit);

        if (this.model.get('esc_key')) {
          this.onKey();
        }
      },

      template: _.template('<div class="page-load-progress-throbber"><%= isIE ? loadingText:"" %></div>'),
      render: function () {
        this.$el.html(this.template(this.model.attributes));
        this.preLoad();
        this.hideEle();
      },

      onClick: function (ele) {
        $(ele).on('click', function (event) {
          // Do not lock the screen if the link is external.
          if ($(this).attr('href').slice(0, 1) != '/') {
            return;
          }

          // Do not lock the screen if the link is being opened in a new tab.
          // Source: https://stackoverflow.com/a/20087506/9637665.
          if (event.ctrlKey || event.shiftKey || event.metaKey || (event.button && event.button == 1)) {
            return;
          }

          // Do not lock the screen if the link is within a modal.
          if ($(this).parents('.modal').length > 0) {
            return;
          }

          // event.preventDefault();
          Drupal.behaviors.pageLoading.viewThat.lockScreen();
        })
      },

      onSubmit: function (ele) {
        $(ele).on("click", function (event) {
          $(this).parents('form').on('submit', function (event) {
            //TODO: enhance form
            if ($(this).find('input.error').length > 0) {
              return;
            }
            Drupal.behaviors.pageLoading.viewThat.lockScreen();
          })
        })

      },

      onKey: function () {
        document.onkeydown = function (evt) {
          evt = evt || window.event;
          var isEscape = false;
          if ("key" in evt) {
            // "Escape" is standard in modern browsers. "Esc" is primarily for
            // Internet Explorer 9 and Firefox 36 and earlier.
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
          } else {
            // keyCode is getting deprecated. Keeping it for legacy reasons.
            isEscape = evt.keyCode === 27;
          }
          if (isEscape) {
            Drupal.behaviors.pageLoading.viewThat.$el.hide();
          }
        }
      },

      getLinksElements: function () {
        return this.model.toJSON().elements.links;
      },

      getSubmitsElements: function () {
        return this.model.toJSON().elements.submits;
      },

      preLoad: function () {
        var body = $('body');
        body.append(this.$el);
      },

      hideEle: function () {
        this.$el.hide();
      },

      lockScreen: function () {
        var body = $(body);
        body.css({
          'overflow': 'hidden'
        });
        this.$el.fadeIn('slow');
      }
    }),

    // Drupal attch hook
    attach: function (context) {
      var pageLoading = new this.Model({
        classes: '.sidebar,.action-links,#navbar ul.navbar-nav.main-menu',
        submits: 'input[type="submit"]',
        metaData: '[data-page-load]'
      })
      var pageLoadingView = new this.View({
        model: pageLoading
      })
    }
  }
}(jQuery, _, Drupal, Backbone))
