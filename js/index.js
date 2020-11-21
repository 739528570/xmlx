$(() => {
	$('.nav').on('mouseenter','li',function(){//导航列表宽度计算
		var num = 40;
		var _this = $(this);
		$($(this).children()[1]).css('display','block');
		$.each($(_this.children()[1]).children(), (i, e) => {
			num += $(e).width() + 24;
		})
		$($(this).children()[1]).css('width',num);
		num = 40;
	})
	$('.nav').on('mouseleave','li',function(){
		$($(this).children()[1]).css('display','none');
	})





























})//全局结束