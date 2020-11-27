$(()=>{
  //*****************************************数量加减
  $('.selnum').on('click','span',function(){
    var result =  parseInt( $('.result').val());
    if ( $(this).hasClass('less') )  {
      result--;
      
    } else if ( $(this).hasClass('more') ) {
      result++;
    }
    result <= 1 && (result = 1)
    result >= 99 && (result = 99)
    $('.result').val( result )
  })



  //******************************************数据获取
  $.ajax({
    url: '../data/list-jjsh.json',
    type: 'get',
    success: function(json){
      var urlCode = location.search.split('?').join('').split('=')[1];
      console.log(json);
      $.each(json, function (i, e) {
        if ( urlCode === e.code ) {
          var $name = $(`
            <div class="name">
              <span>${e.tag}</span>
              <a href="">
                <span>98.5%</span>
                <br>
                <span>好评率 ></span>
              </a>
            </div>
            <div class="desc">${e.msg}</div>
          `)
          $('.intro').append($name);
          var $price = $(`
            <span class="num">${e.price}</span>
          `)
          $('.price .rb').append($price);
          $('.btns').attr('code',e.code)
        }

      })
    }
  })

  //*************************************加入购物车
  $('.addShop').on('click',function(){
    var code = $('.btns').attr('code');
    if(localStorage.getItem('shop')){
        var arr = JSON.parse(localStorage.getItem('shop'));
    }else{
        var arr = [];
    }
    if(arr.length > 0){
        $.each($(arr),function(i,ele){
            if(ele.code === code){
              console.log(ele.num)
                ele.num = Number(ele.num) + Number($('.result').val());
            }
        })
    }
    var flag = true;
    $.each($(arr),function(i,ele){
        if(ele.code === code){
            flag = false;
        }
    })
    flag && arr.push({code: code,num: $('.result').val()});
    localStorage.setItem('shop',JSON.stringify(arr));
})









})//全局结束