(function($) {

  Drupal.behaviors.tab = {
    attach: function(context) {

      $('.panel-tabs-auto').each(function(index, el) {
        var tabNav = $(this).find('.tab-nav');
        $('li', tabNav).each(function(i, el) {
          $(this).find('a').attr('href', '#tabNav_' + index + '_' + i);
        });
        var tabPane = $(this).find('.tab-pane');
        tabPane.each(function(i, el) {
          $(this).attr('id', 'tabNav_' + index + '_' + i);
        });
      });

    }
  }

  $(function() {
    $(document).off('click.bs.tab.data-api', '[data-hover="tab"]');
    $(document).on('mouseenter.bs.tab.data-api', '[data-toggle="tab"], [data-hover="tab"]', function() {
      $(this).tab('show');
    });
  });

}(jQuery));
