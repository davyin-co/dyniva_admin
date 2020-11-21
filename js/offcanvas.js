/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function ($, Drupal) {
  Drupal.behaviors.ccmsAdmin = {
    attach: function (context, settings) {

      // 边栏按钮
      $(context).find('[data-toggle="offcanvas"]').once("offcanvas").click(function () {
        toggleSidebar();
        sidebarAction();
      });

      // 发布文章按钮，.sidebar-toggle后端判断后输出到body class
      $('.sidebar-toggle #block-ccms-admin-local-actions a').click(function(){
        aritcleAction();
      })

      // views 列表,.hide-sidebar通过views配置添加
      $('.hide-sidebar .dropbutton .edit').click(function(){
        aritcleAction();
      })

      //active tooltips;
      $('[data-toggle="tooltip"]').tooltip();

      // active popover
      $('[data-toggle="popover"]').popover();

      $(".sidebar").addClass('transition');
      $(".main").addClass('transition');

      // toggle sidebar
      function toggleSidebar() {
        $('.main').toggleClass("col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 col-md-12");
        $('.sidebar').toggleClass("sidebar-hide");
      }

      // set cookie
      // 边栏按钮，必须添加path参数，cookie的值才能够保证唯一
      function sidebarAction() {
        if ($('.sidebar').hasClass('sidebar-hide')) {
          $.cookie("sidebarHide",1,{ expires:7 , path: '/'}); // 收起
        } else {
          $.cookie("sidebarHide",0,{ path: '/'}); // 展开
        }
      }

      // set cookie
      // 创建文章按钮
      function aritcleAction (){
        if ($('.sidebar:not(".sidebar-hide")')){
          $.cookie("sidebarHide",1,{ path: '/'}); // 收起
        }
      }

      var id = setInterval(function() {
        if ($('.chosen-choices')) {
          jQuery('#edit-approvers-wrapper .chosen-choices').append('<span class="glyphicon glyphicon-triangle-bottom"></span>');
          clearInterval(id);
        }
      },1000)
    }
  };

})(jQuery, Drupal);
