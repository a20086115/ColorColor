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
    console.log(clientWidth);
    if(clientWidth>500){

    } else {
    docEl.style.fontSize = (clientWidth / 20) + 'px';
    }
}

var seconds ;
var timer;
var score = 0;     //得分
var level = 0;     //等级
var levelMap = [2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9]; // n x n 的方块
var colorDiff = [115, 100, 100, 85, 85, 85, 70, 70, 70, 70, 55, 55, 55, 55, 55, 40, 40, 40, 40, 40, 40, 25, 25, 25, 25, 25, 25, 25, 10, 10, 10, 10, 10, 10, 10, 10]; // 色差，等级越高，色差越小
var diffIndex = 0; //不同颜色方块的index
$(function(){
	var status =0;
	$("#beginBtn").click(function(){
		$("#div1").empty();
		seconds = 59;
		score = 0;
		level =0;
		$("#beginDiv").css("display","none");
		$("#overDiv").css("display","none");
		$(".container").css("display","block");
		timer = setInterval(setSeconds,1000);
		$("#scores").html("0分");
		
		//获取颜色偏差值，level越大，偏差越小
		diffColor = colorDiff[level]? colorDiff[level] : 10;
		//根据颜色偏差值，生成随机两种颜色
		var myColor = getColor(diffColor);
		
		//根据level， 确定总共有几个小方格
		var num = levelMap[level]? levelMap[level] : 9;
		width = Math.floor(100/num);
		num *= num;
		
		//随机生成在（0-1）*num之间的整数，不包含num，因为random  0<=x<1;
		diffIndex = Math.floor(Math.random()*num);
		
		for(let i=0;i<num;i++){
			if(i == diffIndex){
				$("#div1").append('<span class="smallColor different" style="width:'+width+'%;height:'+width+'%; background-color:'+myColor.c1+';"></span>')
			} else {
				$("#div1").append('<span class="smallColor" style="width:'+width+'%;height:'+width+'%; background-color:'+myColor.c2+';"></span>')
			}
		}
	})
	$("#pauseBtn").click(function(){
		if(status == 0){
			$(this).html("继续");
			clearInterval(timer);
			status = 1;
			$("#div1").css("display","none");
		} else {
			$(this).html("暂停");
			status = 0;
			timer = setInterval(setSeconds,1000);
			$("#div1").css("display","block");
		}
	})
	$("#div1").on("click",".different",function(){
		console.log("i an click");
		level++;
		score++;
		$("#scores").html(score+"分");
		//获取颜色偏差值，level越大，偏差越小
		diffColor = colorDiff[level]? colorDiff[level] : 10;
		
		//根据颜色偏差值，生成随机两种颜色
		var myColor = getColor(diffColor);
		
		//根据level， 确定总共有几个小方格
		var num = levelMap[level]? levelMap[level] : 7;
		width = Math.floor(100/num);
		num *= num;
		
		//随机生成在（0-1）*num之间的整数，不包含num，因为random  0<=x<1;
		diffIndex = Math.floor(Math.random()*num);
		
		$("#div1").empty();
		
		for(var i=0;i<num;i++){
			if(i == diffIndex){
				$("#div1").append('<span class="smallColor different" style="width:'+width+'%;height:'+width+'%; background-color:'+myColor.c1+';"></span>')
			} else {
				$("#div1").append('<span class="smallColor" style="width:'+width+'%;height:'+width+'%; background-color:'+myColor.c2+';"></span>')
			}
		}
	})
})


function getColor(diff){
	
  	var c1 = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
  	var c2 = c1.slice(0);
  	
  	var x = Math.random()*3;
  	if(x<1){
  		c2[0] = c1[0]-diff>0?c1[0]-diff:c1[0]+diff;
  	} else if(x<2) {
  		c2[1] = c1[1]-diff>0?c1[1]-diff:c1[1]+diff;
  	} else {
  		c2[2] = c1[2]-diff>0?c1[2]-diff:c1[2]+diff;
  	}
  	
  	return {c1:"rgb(" + c1.join(",") + ")",c2:"rgb(" + c2.join(",") + ")"}
}


function setSeconds(){
	console.log(seconds);
	if(seconds ==0){
		$(".container").css("display","none");
		$("#beginDiv").css("display","block");
		$("#overDiv").css("display","block");
		$("#beginBtn").html("重新开始");
		$("#seconds").html("60秒");
		$("#overDiv").html("您的最终成绩是"+score+"分!");
		clearInterval(timer);
	} else {
		$("#seconds").html(seconds--+"秒");
	}

}

