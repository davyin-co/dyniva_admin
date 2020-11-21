(function($) {

  function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
      paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof(returnValue) == "undefined") {
      return "";
    } else {
      return returnValue;
    }
  }
  // 取消确认
  $('.confrim-node-cancel').click(function() {
    var _class = decodeURIComponent(request('destination'));
    if (_class) {
      confirm(Drupal.t('Are you sure to cancel and return') + '"' + _class + '"?') ? window.location = _class : null;
    } else {
      confirm(Drupal.t('Are you sure to cancel and return ?')) ? window.history.back() : null;
    }
    return false;
  });


  //文章列表后面跟上一些信息
  $(function() {
    //提取符合 data-(任意长度字母)="(任意长度中文或者字母)" 格式的元素特性
    var regex = /data-\w*="[\u4e00-\u9fa5]*\w*"/;
    var regexOb = /data-\w*="[\u4e00-\u9fa5]*\w*"/g;
    var dyniva_admin_content = $('#block-ccms-admin-content .view-content tbody tr');

    if (dyniva_admin_content) {
      dyniva_admin_content.each(function(index) {
        var parentIndex = index;
        //拿到tr标签的字符串格式
        var tags = $(this).prop("outerHTML").match(regexOb);
        $.each(tags, function(index) {
          //切割字符串拿到关键的信息
          tags[index] = tags[index].split("=")[1].replace(/"/g, "");
          var hotEl = $("<span class='color-danger' style='font-style: italic;margin-right: 5px;'></span>");
          hotEl.html(tags[index]);
          // 添加进去
          dyniva_admin_content.find('.views-field.views-field-title').eq(parentIndex).append(hotEl);
        });
      });
    }
  });

  /**
   * set node footer auto width
   * fixed node form footer bottom
   */
  function sameWidth() {
    var nodeMainWidth = $('.editor-actions-center .layout-region-node-main').width();
    $('.editor-actions-center .layout-region-node-footer').removeClass('transition').width(nodeMainWidth);
  }
  // init
  sameWidth();
  // sidebar click
  $('[data-toggle="offcanvas"]').click(function() {
    setTimeout(function() {
      var nodeMainWidth = $('.editor-actions-center .layout-region-node-main').width();
      $('.editor-actions-center .layout-region-node-footer').addClass('transition').width(nodeMainWidth);
    }, 251) // 边栏收起展开的时间是250毫秒
  })

  // widow resize
  $(window).resize(function() {
    sameWidth();
  });


  Drupal.behaviors.dyniva_admin = {
    attach: function(context, settings) {

      // mobile menu
      this.responsiveMenu('#outside');

      // expanding sidebar first menu
      $('[region=sidebar_first] i').once().click(function(e) {
        $(this).next().toggleClass('expand').parent().toggleClass('is-open expand');
      })
      $('.nav:not(.submenu) > li.active').each(function() {
        $(this).addClass('is-open expand');
        $(this).find('.submenu').addClass('is-open expand');
      });

      // rotating the fa-spinner icon
      $('i.fa-spinner').addClass('icon-spin');

      //menu dropdown
      $(document).click(function(e) {
        var target = e.target;
        if (!$(target).is('.li.lang ul') && $('li.lang ul').is('.open')) {
          $('li.lang ul').removeClass('open');
        }
      });
      $('.dropdown-menu .lang').on("click.bs.dropdown", function(e) {
        e.stopPropagation();
        e.preventDefault();
      });
      //用户登录语言切换Dropdown
      var topBarDropdown = $('<div class="dropdown-menu"></div>');
      $('.topbar .lang').find('a').each(function() {
        if (!$(this).hasClass('is-active')) topBarDropdown.append($(this).parent());
      });
      $('.topbar .lang ul').append(topBarDropdown);
      $('.topbar .lang').on('click', function() {
        topBarDropdown.toggle();
      });
      $('li.lang').once('dyniva_admin').on('click', 'a', function (e) {
        if ($(this).is('.is-active')) {
          $(this).parent().parent().toggleClass('open');
        } else {
          window.location.href = $(this).attr('href');
        }
        e.stopPropagation();
        e.preventDefault();
      });

      $('a', context).each(function() {
        if (!$(this).attr('href')) {
          $(this).attr('href', 'javascript:void(0);');
        }
      });

      //scroll sidebar
      $('.region-sidebar-first').slimScroll({
        height: '100%',
        opacity: 0.75,
      });

      //Auto complete title
      if ($('.autocomplete-title', context).length > 0) {
        $(".autocomplete-title input.form-autocomplete", context).autocomplete({
          select: function(event, ui) {
            ui.item.value = ui.item.label;
            $('.autocomplete-title-target input', context).val(ui.item.label);
          }
        });
      }
      //Media name autocomplete
      if ($('form.media-form').length > 0 && $('form.media-form #edit-name-0-value').val() == '') {
        if ($(".form-type-managed-file .form-managed-file a", context).length > 0) {
          var file_name = $(".form-type-managed-file .form-managed-file a", context).first().text();
          var point = file_name.lastIndexOf(".");
          var file_name = file_name.substr(0, point);
          $('form.media-form #edit-name-0-value').val(file_name);
        }
      }
      $('.field--widget-inline-entity-form-complex').each(function(){
        var filename, input;
        $(this).find('[data-drupal-selector]').each(function() {
          if($(this).data('drupal-selector').match(/filename$/)) {
            filename = $(this).find('a').text();
            filename = filename.substr(0, filename.lastIndexOf("."));
          }

          if($(this).data('drupal-selector').match(/-form-name-0-value$/)) {
            input = this;
          }
        });

        if(input && filename && $(input).val() == '') {
          $(input).val(filename);
        }
      });
    }
  };
})(jQuery);
