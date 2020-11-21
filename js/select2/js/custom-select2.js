(function($) {
  /**
   * 禁用父级，强制用户只能选最后一级
   */
  Drupal.behaviors.customSelect2 = {
    init: function(ele) {
      //添加分类选择的框
      var parentCategory = $('<input class="parent-category" />');
      ele.parent('div').append(parentCategory);

      // 定义一些变量
      //select2初始化的数据来源
      //刚开始来嵌套的数组
      //预先选择的
      var SELECT_GROUPS,
        elements = [],
        selecteds = [],

        category = ele,
        multiple = category.attr('multiple') ? true : false;

      //列出所有打包成对象丢进数组
      category.find('option').each(function(index) {
        elements.push({
          'id': $(this).val(),
          'text': $(this).text(),
          'parent': $(this).attr('data-parent'),
          'data-depth': $(this).attr('data-depth'),
          'selected': $(this).attr('selected') == 'selected' ? true : false,
          'disabled': $(this).attr('disabled') == 'disabled' ? true : false,
          'children': [],
        });
      });

      //selected丢进数组
      _.each(elements, function(arr) {
        if (arr['selected']) {
          selecteds.push(arr);
        }
      });

      //互相嵌套开始
      for (var i = 0; i < elements.length; i++) {
        for (var b = 0; b < elements.length; b++) {
          if (elements[i]['parent'] == elements[b]['id']) {
            elements[b]['children'].push(elements[i]);
          }
        }
      }

      //只保留一级的(二级及以上的都嵌套进去了);
      _.each(elements, function(arr, index) {
        if (arr['parent'] != 0) {
          elements[index] = '';
        }
      });

      //去重
      elements = _.filter(elements, function(ele){
        return ele !="";
      })

      SELECT_GROUPS = elements;
      if (multiple) {
        var query = function(options) {
          var selectedIds = options.element.select2('val');
          var selectableGroups = $.map(this.data, function(group) {
            var areChildrenAllSelected = true;
            if (group.children.length > 0) {
              $.each(group.children, function(i, child) {
                if (selectedIds.indexOf(child.id) < 0) {
                  areChildrenAllSelected = false;
                  return false; // Short-circuit $.each()
                }
              });
              return !areChildrenAllSelected ? group : null;
            } else {
              return group;
            }
          });
          options.callback({
            results: selectableGroups
          });
        }
      } else {
        var query = function(options) {
          var selectedIds = options.element.select2('val');
          var selectableGroups = $.map(this.data, function(group) {
            return group;
          });
          options.callback({
            results: selectableGroups
          });
        }
      }

      parentCategory.select2({
        //多选
        multiple: multiple,
        placeholder: (function() {
          if (selecteds.length > 0) {
            if (!multiple) {
              return selecteds[0].text;
            }
          } else {
            return "请选择选项";
          }
        })(),
        //数据源
        data: elements,
        //预选择项
        initSelection: function(element, callback) {
          if (multiple) {
            callback(selecteds);
          }
        },
        //点击后消失
        query: query,
      }).select2('val', []);

      // 同步数据
      parentCategory.on('change', function() {
        ele.val(parentCategory.val().split(','));
      });
    }
  }

  $('.ccms-options-list').each(function () {
    Drupal.behaviors.customSelect2.init($(this));
  });

  $('.ccms-select2').each(function () {
    $(this).select2();
  });

})(jQuery);
