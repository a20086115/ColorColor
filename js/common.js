(function(doc, win) {
    setRem();
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
        setRem();
      };
    if (!doc.addEventListener) {
return;
}
    win.addEventListener(resizeEvt, recalc, false);
  })(document, window);

function setRem() {
    var docEl = document.documentElement;
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) {
      return;
    }
    docEl.style.fontSize = 50 * (clientWidth / 1080) + 'px';
}

var seconds ;
var timer;
$(function(){
	var status =0;
	$("#beginBtn").click(function(){
		seconds = 59;
		$("#beginDiv").css("display","none");
		$(".container").css("display","block");
		timer = setInterval(setSeconds,1000)
	})
	$("#pauseBtn").click(function(){
		if(status == 0){
			$(this).html("继续");
			clearInterval(timer);
			status = 1;
		} else {
			$(this).html("暂停");
			status = 0;
			timer = setInterval(setSeconds,1000);
		}
		//$("#beginDiv").css("display","none");
		//$(".container").css("display","block");
	})
})

function setRem() {
    var docEl = document.documentElement;
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) {
      return;
    }
    docEl.style.fontSize = 50 * (clientWidth / 1080) + 'px';
}

function setSeconds(){
	console.log(seconds);
	if(seconds ==0){
		$(".container").css("display","none");
		$("#beginDiv").css("display","block");
		$("#beginBtn").html("重新开始");
		seconds==59;
		clearInterval(timer);
	} else {
		$("#seconds").html(seconds--+"秒");
	}

}

