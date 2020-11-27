$(()=>{
  $.ajax({
    url: '../data/list-jjsh.json',
    type: 'get',
    success: function(json){
      $.each(json, function (i, e) {
        var $div = $(`
          <li class="item">
          <div class="hd">
            <a href="./goods.html?code=${e.code}">
              <img class="hd_before" src="${e.url1}" alt="">
              <img class="hd_back" src="${e.url2}" alt="">
            </a>
          </div>
          <div class="bd">
            <div class="prdtTags"></div>
            <h4 class="name">
              <a href="./goods.html">${e.tag}</a>
            </h4>
            <p class="price">
              <span>￥</span>
              <span>${e.price}</span>
            </p>
            <div class="bd_desc">
              <hr>
              <p>${e.msg}</p>
            </div>
          </div>
        </li>
        `)
        $('.g_itemList').append($div);
      })
    }
  })
})