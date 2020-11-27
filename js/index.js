$(() => {
  var imgIndex = 0;
  var numIndex = 0;
  var imgLen = $('.new_list li').length
  var imgWidth = $('.new_list li').width() + 10
  var timer;

  autoMove();
  function autoMove () {
    timer = setInterval( function() {
      moveNext();
    },2000)
  }

  function moveNext () {
    imgIndex ++;
    if ( imgIndex >= imgLen ) {
      imgIndex = 1;
      $('.new_list>div').scrollLeft(0)
    }
     $('.new_list>div').animate({"scrollLeft": imgIndex*imgWidth} )
    $('.new_list li')[numIndex].className = '';
    numIndex++;
    if(numIndex >= $('.new_list li').length){
      numIndex = 0;
    }
    $('.new_list li')[numIndex].className = "active";
  }

  function movePrve(){
    imgIndex --;
    if(imgIndex < 0){
        imgIndex = imgLen - 2;
        $('.new_list>div').scrollLeft((imgLen - 1) * imgWidth);
    }
    $('.new_list>div').animate({"scrollLeft": imgIndex * imgWidth},)
    $('.new_list li')[numIndex].className = '';
    numIndex--;
    if(numIndex < 0){
        numIndex = $('.new_list li').length - 1;
    }
    $('.new_list li')[numIndex].className = "active";
  }

  $('.btn_prev').on('click',function(){
    console.log(1)
    clearInterval(timer);
    movePrve();
    autoMove();
  })


  // $('.btn_next').on('click',function(){
  //   console.log(1)
  //   clearInterval(timer);
  //   moveNext();
  //   autoMove();
  // })

  $.each( $('.new_list li'),(i,ele) => {
    $('.new_list li').index = i;
    $('.new_list li').on('click',function () {
      imgIndex = this.index;
      $('.new_list>div').animate({"scrollLeft": imgIndex * imgWidth})
      clearInterval(timer);
      $('.new_list li')[numIndex].className = '';
      numIndex = this.index;
      $('.new_list li')[numIndex].className = "active";
      autoMove();
    })
  } )

















})//全局结束