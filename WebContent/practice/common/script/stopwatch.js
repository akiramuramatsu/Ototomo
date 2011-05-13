var stopwatch = {
	positionX: 0,
	positionY: 0,
	fontsize: 0,
	width: 0,
	startTime: 0,
	elapsed: 0,
	displayInterval: 200,
	timerId: 0,
	canvasname: ""
};


stopwatch.init = function(canvasname){
	// 表示部分
	stopwatch.canvasname = canvasname;

    var canvas = document.getElementById(stopwatch.canvasname);
    canvas.style.cssText = 'position: absolute;' + 'top: 0;' + 'left: 200px;' + 'z-index: 150; background: #CCC;';
    var context = canvas.getContext("2d");
	context.clearRect(0,0,50,50);//図形を消去
};

stopwatch.start = function(){

	stopwatch.startTime = new Date();
	stopwatch.timerId = setInterval(stopwatch.draw, stopwatch.displayInterval);
};

stopwatch.stop = function(){
	clearInterval(stopwatch.timerId);
};

stopwatch.draw = function(){
	var currentTime = new Date();
	stopwatch.elapsed = (currentTime.getTime() - stopwatch.startTime) / 1000;

    var canvas = document.getElementById(stopwatch.canvasname);

    var context = canvas.getContext("2d");
	context.clearRect(0,0,50,50);//図形を消去

	// 文字を書く
	context.font = "12px 'Times New Roman'";
	context.fillText(stopwatch.elapsed, 5, 15);
};

