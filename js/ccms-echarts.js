/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function ($, Drupal) {
  Drupal.behaviors.ccmsCharts = {
    attach: function (context, settings) {
      $('.ccms-charts',context).each(function(){
    	  var id = $(this).attr('id');
    	  if(id && drupalSettings.ccms_charts[id]){
    		  var myChart = echarts.init(context.getElementById(id)); 
    		  var options = drupalSettings.ccms_charts[id];
    		  myChart.setOption(options);
    	  }
      });
    }
  };

})(jQuery, Drupal);
