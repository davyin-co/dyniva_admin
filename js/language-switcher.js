(function ($, _, Drupal, Backbone) {
  /**
   * language switcher
   * @type {{view: *, model: *}}
   */
  Drupal.behaviors.languageSwitcher = {
    /**
     * model
     */
    Model: Backbone.Model.extend({
      defaults: {
        currentLanguage: '',
        languageClass: '.lang-links',
        icon: '&#xe721;',
        container: 'switch-container',
        toggleClass: 'switch-open'
      }
    }),
    /**
     * view
     */
    View: Backbone.View.extend({
      tagName: 'a',
      className: 'switch-language',

      initialize: function () {
        this.render();
      },

      events: {
        'click': 'dropdown'
      },

      template: _.template('<span class="current-language"><%= currentLanguage %></span> <i class="icon"><%= icon %></i>'),
      render: function () {
        this.$el.html(this.template(this.model.attributes));
        $(this.model.get('languageClass')).parent().addClass(this.model.get('container')).end().before(this.$el);
      },

      dropdown: function(){
        this.$el.parent().toggleClass(this.model.get('toggleClass')).end().next().slideToggle('fast');
      }
    }),
  }

  $(document).ready(function () {
    var currentLanguage = $('.language-link.is-active').text();
    var languageModel = new Drupal.behaviors.languageSwitcher.Model({
      currentLanguage: currentLanguage
    });
    var languageView = new Drupal.behaviors.languageSwitcher.View({
      model: languageModel
    });

  })

}(jQuery, _, Drupal, Backbone))
