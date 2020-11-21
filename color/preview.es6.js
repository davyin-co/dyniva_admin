/**
 * @file
 * Preview for the Bartik theme.
 */
(function ($, Drupal, drupalSettings) {
  Drupal.color = {
    logoChanged: false,
    callback(context, settings, $form) {
      if (!this.logoChanged) {
        $('.color-preview .color-preview-logo img').attr('src', drupalSettings.color.logo);
        this.logoChanged = true;
      }
      console.log('es6');
      if (drupalSettings.color.logo === null) {
        $('div').remove('.color-preview-logo');
      }

      var $colorPreview = $form.find('.color-preview');
      var $colorPalette = $form.find('.js-color-palette');

      $colorPreview.find('a').css('color', $colorPalette.find('input[name="palette[link-color]"]').val());

      $form.find('.color-preview-header').css('background-color', $colorPalette.find('input[name="palette[brand-primary]"]').val());
      $form.find('.color-preview-header, .color-preview-header a').css('color', $colorPalette.find('input[name="palette[navbar-inverse-color]"]').val());

    },
  };
}(jQuery, Drupal, drupalSettings));
