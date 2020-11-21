/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function ($, Drupal) {
  Drupal.behaviors.ccmsModeration = {
    attach: function (context, settings) {

      var ccmsPosition = function () {
        if (window.outerWidth >= 992) {
          var height = 550;
          $win = $('#ccms-moderation-cpwin');
          var top = $win.offset().top + height - $(window).scrollTop() - 40;
          $win.height(height);
          $('#ccms-moderation-cpwin .overlay').each(function () {
            $width = $(this).parent().width();
            $(this).width($width);
            var offset = $(this).offset();
            $(this).css('top', top);
          });
        }
      }

      $(window).resize(function () {
        ccmsPosition();
      });
      $(window).scroll(function () {
        ccmsPosition();
      });
      $(window).resize();

      // Read more collapse
      $(context).find(".readmore").readmore({
        moreLink: '<a href="#" class="more-link">Read more</a>',
        lessLink: '<a href="#" class="more-link">Collapse</a>'
      });

//      $(context).find('[data-toggle="offcanvas"]').once("offcanvas").click(function () {
//        toggleSidebar();
//      });


    }
  };

})(jQuery, Drupal);
