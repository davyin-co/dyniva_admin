(function ($) {

  Drupal.behaviors.dyniva_admin.responsiveMenu = function (region) {

    var $menu = $(region).mmenu({
      "extensions": [
        "position-right"
      ],
      navbar: {
        title: function () {
          return Drupal.t('Menu');
        }
      },
      navbars: [{
          "position": "bottom",
          "content": [
            "<div id='mmenu-language'></div>",
          ]
        },
        {
          "position": "bottom",
          "content": [
            "<div id='mmenu-user'></div>",
          ]
        },
        {
          "position": "bottom",
          "content": [
            "<a class='fa fa-user' href='/user'>我的账户</a>",
            "<a class='fa fa-sign-out' href='/user/logout'>退出</a>",
          ]
        }
      ]
    });
    $('#outside').find('.visually-hidden').remove();
    var $userContent = $('#user-content');

    // put language links to mmenu
    var $frontLanguageLinks = $('.lang');
    var $adminLanguageLinks = $('.block-dyniva-admin-language-switcher');

    if ($frontLanguageLinks.length) {
      if ($adminLanguageLinks.length) {
        $('#mmenu-language').html($adminLanguageLinks.html())
      } else {
        $('#mmenu-language').html($frontLanguageLinks.html());
      }
    } else {
      if ($adminLanguageLinks.length) {
        $('#mmenu-language').html($adminLanguageLinks.html())
      } else {
        $('#mmenu-language').parent().remove();
      }
    }

    // put user info to mmenu
    var $userHtml = $('#navbar .user p').html()
    $('#mmenu-user').html($userHtml)
    // TODO

    // var $icon = $('#header-btn')
    // var API = $menu.data('mmenu')
    // if (API) {
    //   $icon.on('click', function () {
    //     API.open()
    //   })
    // }
  }

}(jQuery))
