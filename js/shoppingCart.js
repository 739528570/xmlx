$(() => {
  //*****************************************数量加减
  $('.cart_group_2').on('click','.count',function(){
    var result = parseInt( $(this).parent().children().eq(1).val() );
    if ( $(this).hasClass('less') )  {
      result--;
    } else if ( $(this).hasClass('add')) {
      result++;
    }
    result >= 99 && (result = 99);
    result <= 1 && (result = 1);
    $(this).parent().children().eq(1).val( result );
    //单个商品总值
    var resultPrice = result * $(this).parent().parent().prev().children().eq(0).children().eq(1).text();
    $(this).parent().parent().next().children().eq(1).text( resultPrice )
    //增减本地缓存
    var shopObj = JSON.parse(localStorage.getItem('shop'))
    $.each(shopObj,(i,ele)=>{
      if( $(this).parent().attr('code') === ele.code ) {
        ele.num = result;
      }
    })
    localStorage.setItem('shop',JSON.stringify(shopObj))
  })

  //******************************************获取数据
  var $loc = JSON.parse(localStorage.getItem('shop'));
  $.ajax({
    url: '../data/list-jjsh.json',
    type: 'get',
    dataType: 'json',
    success: function (json) {
      $.each(json, function (index, item) {
        $.each($loc, function (i, ele) {
          if (ele.code === item.code) {
            var result = item.price * ele.num;
            var $box = $(`
          <div class="cart_item clearfix">
            <div class="item1">
              <input class="on" type="checkbox">
            </div>
            <div class="item2">
              <div class="pic">
                <a href=""><img src="./img/list-1.webp" alt=""></a>
              </div>
              <div class="nameCon">
                <a href="">${item.tag}</a>
                <div class="spec">
                  <span>白色+咖啡色<i>∨</i></span>
                </div>
              </div>
            </div>
            <div class="item3">
              <p>
                <span>￥</span><span class="price">${item.price}</span>
              </p>
              <p class="preselldesc">预计11月27日发货</p>
            </div>
            <div class="item4">
              <div class="num" code="${ele.code}">
                <span class="less count">-</span>
                <input class="inp" type="text" value="${ele.num}">
                <span class="add count">+</span>
              </div>
              <div class="nervous">
                <span>仅剩</span>
                <span>3</span>
                <span>件</span>
              </div>
            </div>
            <div class="item5">
              <span>￥</span><span class="sprice">${result}</span>
            </div>
            <div class="item6">
              <div class="operate">
                <a href="">移入收藏夹</a>
              </div>
              <div class="operate">
                <a class="del" code="${ele.code}" href="javascript:;">删除</a>
              </div>
            </div>
          </div>
            `);
            $('.cart_group_2').append($box);
          }
        })
      })
    }
  })

  //******************************************删除
  $('.cart_group_2').on('click','.del',function(){
    $(this).parent().parent().parent().remove()
    var shopObj = JSON.parse(localStorage.getItem('shop'))
    for(var i = 0; i < shopObj.length; i++) {
      if( $(this).attr('code') === shopObj[i].code ) {
        shopObj.splice(i,1);
        i--;
      }
    }
    if ( shopObj ) {
      localStorage.removeItem('shop');
    } else{
      localStorage.setItem('shop',JSON.stringify(shopObj))
    }
    
  })

  //***************************************多选事件
	$('.cart').on('change', '.item1 .on', function () {
    console.log($(this))
		var len = $(':checked').length;
		$(".all").prop('checked') && (len -= 2);
		len === $(".on").length ? $(".all").prop('checked', true) : $(".all").prop('checked', '');
		rest()
	})
	$(".all").on('click', function () {
		$(this).hasClass('all') && ($(".all").prop('checked') ? $(".on").prop('checked', true) : $(".on").prop('checked', ''));
		rest();
	})
	function rest() {
		var result = 0;
		$.each($('.on'), function (i, ele) {
			if (ele.checked) {
				result += Number($(ele).siblings('p').text().slice(1));
			}
		})
		$('.head span').text(result);
	}






















})//全局结束