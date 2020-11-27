// 获取id
function $(a){
    return document.getElementById(a);
}
function Q(ele){
    return document.querySelector(ele);
}
function QALL(ele){
    return document.querySelectorAll(ele);
}

/*获得min-max范围内的随机数*/
function myRandom(min,max){
    return parseInt(Math.random()*(max+1-min)+min);
}

// 获得随机颜色
function myColor(){
    return "#" + parseInt(Math.random()*0xffffff).toString(16);
}

// 获取对随机验证码
function randCord(a){
    var b = "",num;
    for(var i = 0; i < a; i++){
        num = myRondom(48,122);
        if(num >= 58 && num <= 64 || num >= 91 && num <= 96 ){
            i--;
        }else{
            b += String.fromCharCode(num);
        }
    }
    return b;
}

// 获取本地时间
function localTime(date){
    var y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        min = date.getMinutes(),
        s = date.getSeconds(),
        w = date.getDay(),
        week = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
    return y + "年" + toJL(m) + "月" + toJL(d) + "日" + " " + toJL(h) + ":" + toJL(min) + ":" + toJL(s) + " " + week[w]; 
}

// 给1-9前面加0
function toJL(num){
    return num < 10 ? "0" + num : num;
}

//封装时间差函数,获取时间差秒数
function getDifTime(startDate,endDate){
	return (endDate.getTime() - startDate.getTime())/1000;
}

/***************IE兼容********************** */ 
// preventDefault的IE8兼容,阻止事件默认行为，IE8使用returnValue
function preventDefault(e){
    return !!e.preventDefault ? e.preventDefault() : e.returnValue = false;
}

// stopPropagetion的IE8兼容，阻止冒泡事件，IE8使用cancelBubble
function stopProp(e){
    return !!e.stopPropagetion ? e.stopPropagetion() : e.cancelBubble = true;
}

// addEventListener的IE8兼容，DOM2级事件监听，IE8使用attachEvent
function addEvent(ele,event,callBack,flag){
    return !!document.addEventListener ? ele.addEventListener(event,callBack,flag) : ele.attachEvent("on" + event,callBack);
}

// removeEventListtener的IE8兼容，DOM2级事件的解除绑定，使用detachEvent()
function removeEvent(ele,event,callBack){
    return !!ele.removeEventListener ? ele.removeEventListener(event,callBack) : ele.detachEvent("on" + event,callBck);
}

// target的ie8兼容，事件委托，使用srcElement
function getTarget(e){
    return !!e.target ? e.target : e.srcElement
}

// page属性兼容,调用getPage().x
function getPage(e){
    var sLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    var sTop = document.documentElement.scrollTop || document.body.scrollTop;
    return {
        x: e.clientX + sLeft,
        y: e.clientY + sTop
 
 
    }
}

// button的IE8兼容，
function getButton(eve){
    if(!!eve){
        return eve.button;
    }
    var button = window.event.button;
    switch(button){
        case 1: return 0;
        case 4: return 1;
        case 2: return 2;
    }
}

// getComputedStyle的ie8兼容，ie8使用dom.currentStyle.样式
function getStyle(dom,attr){
    if(dom.currentStyle){
        return dom.currentStyle[attr];
    }else{
        return dom.getComputedSyle[attr];
    }
}


// getComputedStyle获取元素样式的IE兼容
function getStyle(dom,attr){
    if (dom.currentStyle) {
      return dom.currentStyle[attr]
    } else {
      return getComputedStyle(dom)[attr]
    }
  }

// 动画函数，dom为动画目标，options为对象,可设置属性有{width,height,left,top,right,bottom,scrollTop,scrollLeft,opacity},
//callBack为动画执行完后的回调函数，speed为动画速度
function animate(dom,options,callBack,speed){
    for (var attr in options) {
        var target = options[attr];
        if(attr === 'opacity'){
            var current = parseInt(getComputedStyle(dom)[attr]*100);
            target *= 100;
            // var target = options[attr]*100;
        }else if(attr.indexOf("scroll") != -1){
            var current = dom[attr];
            // var target = options[attr];
        }else{
            var current = parseInt(getComputedStyle(dom)[attr]);
            // var target = options[attr];
        }
        options[attr] = {
            "target": target,
            "current": current
        }
    }
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        for(var attr in options){
            var current = options[attr].current;
            var target = options[attr].target;
            speed = (target - current)/10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if(Math.abs(target - current) <= Math.abs(speed)){
                if(attr === 'opacity'){
                    dom.style[attr] = target/100;
                }else if(attr.indexOf("scroll") !== -1){
                    dom[attr] = target;
                }else{
                    dom.style[attr] = target + "px";
                }
                delete options[attr];
                for (var attr in options) {
                    return false;
                }
                typeof callBack === "function" ? callBack() : "";
                clearInterval(dom.timer);
            }else{
                options[attr].current += speed;
                if(attr === 'opacity'){
                    dom.style[attr] = options[attr].current/100;
                }else if(attr.indexOf("scroll") !== -1){
                    dom[attr] = options[attr].current;
                }else{
                    dom.style[attr] = options[attr].current + "px";
                }
            } 
        }
    }  
,20)}


// 获取元素到最外层边框的距离，当flag为true时返回值包含元素边框
function offset(dom,flag){
    var l = 0,t = 0;
    var borl = dom.clientLeft;// 保存当前元素的左边框
    var bort = dom.clientTop;// 保存当前元素的上边框
    while(dom.offsetParent){
        l += dom.clientLeft + dom.offsetLeft;
        t += dom.clientTop + dom.offsetLeft;
        dom = dom.offsetParent;
        // 每次循环完让当前dom元素等于他的定位父级
    }
    if(flag){
        return {"l": l,"t": t}
    }else{
        return {"l":l - borl,"t":t - bort}
    }
}

//判别对象类型叛别类型
function isObject(dom){
    return Object.prototype.toString.call(dom) === "[object Object]" ? true : false;
}

//AJAX函数封装
// ajax({//调用方法
//     url: './login.php',//地址
//     type: 'post',//传输类型
//     data: {//传参
//       user: log.value,
//       pass: ad.value,
//       type: 'login'
//     },
//     dataType: 'json', // 返回的数据类型 text  json  xml
//     cache: true,// 是否使用缓存，默认为false
//     success: function (json){//调用成功
//         alert(json.msg)
//     },
//     error: function (code){//调用失败
//         alert(code);
//     }
//   })
function ajax(options){
    //创建数据交互对象
    if(window.XMLHttpRequest){
        var xhr = new XMLHttpRequest();
    }else{
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');//兼容ie5,6
    }
    //格式化数据
    var data = '';
    if(isObject(options.data)){
        for(var key in options.data){
            data += key + "=" + options.data[key] + "&";//将对象拼接字符串
        }
        data = data.substring(0,data.length - 1);
    }
    if(typeof options.data === "string"){
        data = options.data;
    }
    //判断传输类型
    if(options.type.toLowerCase() === 'get'){
        var sm = '';
        sm = options.cache ? '' : Date.now();
        xhr.open(options.type,options.url + "?" + data + "&_=" + sm,true);
        xhr.send(null);
    }
    if(options.type.toLowerCase() === 'post'){
        xhr.open(options.type,options.url);//打开链接
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(data);//发送请求
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){//请求完成
            if(xhr.status === 200){
                if(options.dataType === 'json'){
                    var json = JSON.parse(xhr.responseText);
                    options.success(json);
                }else if(options.dataType === 'xml'){
                    options.success(xhr.responseXML)
                }else{
                    options.success(xhr.responseText);
                }
            }else{
                options.error(xhr.status);//回调函数传入错误信息
            }
        }
    }
}

//jsonp函数封装
/*json({
    url: ..,
    data: '' or {},
    json: 'api给的数据名',
    jsonCallback: "自定义名字",
    success: (json) => {
        console.log(json)
    }
})*/
function jsonp(options){
    var osc = document.createElement('script');
    var data = '';
    if(typeof options.data === 'string'){
        data = options.data;
    }
    if(isObject(options.data)){
        for(var key in options.data){
            data += key + '=' + options.data[key] + '&';
        }
        data = data.substring(0,data.length-1);
    }
    osc.src = options.url + '?' + options.jsonp + '=' + options.jsonpCallback + '&' + data;
    document.body.appendChild(osc);
    osc.onload = function(){
        document.body.lastElementChild.remove();
    }
    window[options.jsonpCallback] = options.success;
}


//promise函数调用ajax
function promiseAjax(options){
    return new Promise((resolve,reject)=>{
                //创建数据交互对象
        if(window.XMLHttpRequest){
            var xhr = new XMLHttpRequest();
        }else{
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');//兼容ie5,6
        }
        //格式化数据
        var data = '';
        if(isObject(options.data)){
            for(var key in options.data){
                data += key + "=" + options.data[key] + "&";//将对象拼接字符串
            }
            data = data.substring(0,data.length - 1);
        }
        if(typeof options.data === "string"){
            data = options.data;
        }
        //判断传输类型
        if(options.type.toLowerCase() === 'get'){
            var sm = '';
            sm = options.cache ? '' : Date.now();
            xhr.open(options.type,options.url + "?" + data + "&_=" + sm,true);
            xhr.send(null);
        }
        if(options.type.toLowerCase() === 'post'){
            xhr.open(options.type,options.url);//打开链接
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.send(data);//发送请求
        }
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){//请求完成
                if(xhr.status === 200){
                    if(options.dataType === 'json'){
                        var json = JSON.parse(xhr.responseText);
                        resolve(json);
                    }else if(options.dataType === 'xml'){
                        resolve(xhr.responseXML)
                    }else{
                        resolve(xhr.responseText);
                    }
                }else{
                    reject(xhr.status);//回调函数传入错误信息
                }
            }
        }
    })
}


// cookie操作函数
// setCookie({
//     key: 12,
//     val: 123,
//     days: 123,//负值时删除
//     path: 123//目录
//   })
function setCookie(options){
    options.days = options.days || 0;
    options.path = options.path || '';
    if(options.days !== 0){
      var d = new Date();
      d.setDate(d.getDate()+options.days);
      document.cookie = options.key + '=' + options.val + ';expires=' + d + ';path=' + options.path;
    }else{
      document.cookie = options.key + '=' + options.val + ';path=' + options.path;
    }
  }

// cookie获取函数
  function getCookie(key){
    var arr = document.cookie.split('; ');
    for(var i = 0,len = arr.length; i < len; i++){
        var arr1 = arr[i].split('=');
            if(arr1[0] === key){
                return arr1[1];
            }
    }
    return null;
}