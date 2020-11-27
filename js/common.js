$(()=>{
  /***************导航栏计算*************** */
  //导航列表宽度计算
  $('.nav').on('mouseenter', 'li', function () {
    var num = 40;
    var _this = $(this);
    $($(this).children()[1]).css('display', 'block');
    $.each($(_this.children()[1]).children(), (i, e) => {
      num += $(e).width() + 24;
    })
    $($(this).children()[1]).css('width', num);
    num = 40;
  })
  $('.nav').on('mouseleave', 'li', function () {
    $($(this).children()[1]).css('display', 'none');
  })

    /*******************登录*************************/
  //登录显示
  $('.loginBtn').on('click', () => {
    $('.login').css('display','block');
  })

  //登录关闭
  $('.close').on('click', () => {
    $('.login').css('display','none');
  })
  
  //手机邮箱登录切换
  $('.loginTitle').on('click', '.Click', function () {
    if ($(this).hasClass('mobileLogin')) {
      $('.mail_login').css('display', 'none');
      $('.mobile_login').css('display', 'block');
      if ($('.note_login').css('display') === 'block') {
        $('.loginBox').css('height', '500');
      }
    } else if ($(this).hasClass('mailLogin')) {
      $('.mobile_login').css('display', 'none');
      $('.mail_login').css('display', 'block');
      $('.loginBox').css('height', '400');
    }
  })

  //手机短信密码切换
  $('.lg_toggle').on('click', 'span', function () {
    if ($(this).hasClass('phone_pass')) {
      $('.note_login').css('display', 'none');
      $('.pass_login').css('display', 'block');
      $('.phone_pass').css('display', 'none');
      $('.phone_note').css('display', 'block');
      $('.loginBox').css('height', '400');
    } else if ($(this).hasClass('phone_note')) {
      $('.pass_login').css('display', 'none');
      $('.note_login').css('display', 'block');
      $('.phone_note').css('display', 'none');
      $('.phone_pass').css('display', 'block');
      $('.loginBox').css('height', '500');
    }
  })

  //登陆验证滑块
  $('.slider').on('mousedown', function (eve) {
    var a = $('.slider').offset().left;
    
    $(document).on('mousemove', fn)
    function fn(e) {
      $(".sliderYZ").css('display','block')
      var l = e.pageX - a;

      var maxL = $('.sliderBox').width() - $('.slider').width();
      
      l = l < 0 ? 0 : (l >= maxL ? maxL : l);

      $('.slider').css('left', l);
      $('.login_hk').css('left', l);

      return false;
    }

    $(document).on('mouseup', function () {
      $(document).off('mousemove', fn)
    })
  })

  $('.sliderBox').on('mouseenter',function () {
    console.log(123)
    $(".sliderYZ").css('display','block')
  })

  $('.sliderBox').on('mouseleave',function () {
    console.log(123)
    $(".sliderYZ").css('display','none')
  })

  //********************导航栏吸顶**************************/
  var navT = $(".nav").offset().top;
  $(document).on('scroll',function(){
    if ( $(document).scrollTop() >= navT ) {
      $('.nav').css({
        position: 'fixed',
        top: 0,
        zIndex: 99
      })
      $('.nav li').css({
        marginTop:'18px',
        padding: '0 17px'
      })
      $('.nav li a').css('padding-bottom','13px')
      $('.miniLogin').css('display','block')
      $('.scrollIco').css('display','block')
      $($('.nav li')[10]).css('display','none')
      $($('.nav li')[9]).css('display','none')
    } else {
      $('.nav').css({
        position: 'absolute',
        top: 'auto',
        bottom: 0
      })
      $('.nav li').css({
        marginTop:'27px',
        padding: '0 25px'
      })
      $('.nav li a').css('padding-bottom','5px')
      $('.miniLogin').css('display','none')
      $('.scrollIco').css('display','none')
      $($('.nav li')[10]).css('display','block')
      $($('.nav li')[9]).css('display','block')
    }
  })

  //吸顶后搜索框展收
  $(".scroll_zk").on('click',()=>{
    $(".scroll_sq").css('display','block')
  })
  $($(".scroll_sq").children()[0]).on('click',()=>{
    $(".scroll_sq").css('display','none')
  })

  //*****************************侧边栏吸顶
  var sidbarT = $(".new_top").offset() || $(".goodsArea").offset() || $(".content").offset() || $(".cartGetCoupons").offset();
  $(document).on('scroll',function(){
    if ( $(document).scrollTop() >= sidbarT.top ) {
      $(".sidebar").css({
        position: 'fixed',
        top: 62
      })
      $(".backTop").css({
        position: 'fixed',
        top: 62
      })
      $(".HTop").css('display','block')
    } else {
      $(".sidebar").css({
        position: 'absolute',
        top: sidbarT.top 
      })
      $(".backTop").css({
        position: 'absolute',
        top: sidbarT.top
      })
      $(".HTop").css('display','none')
    }
  })

  //******************************回顶部
  $(".HTop").on("click",()=>{
    $(document).scrollTop( 0 )
  })

  //******************************购物车总数
  function shopNum(){
    var arr = JSON.parse(localStorage.getItem('shop'));
    var resultNum = 0;
    $.each($(arr),function(i,ele){
      resultNum += Number(ele.num);
    })
    $('.scroll_shop i').text(resultNum)
    $('.main_nav .shop i').text(resultNum)
  }
  shopNum();
})