// 初期化変数等
var musicscore = {
	canvasHeight: 200,
	canvasWidth: 300,
	size: 20,
	color: "black",
	canvasZeroX: 10,
	canvasZeroY: 20,
	canvasname: "",
	currentScoreIndex: 0,
	scoreWidth: 100
};

musicscore.init = function(canvasname){
	musicscore.canvasname = canvasname;
};

musicscore.drawscore = function(scoreindex){
	// 描画が終わってからセットした方がいいかな・・・
	musicscore.currentScoreIndex = scoreindex;

    // canvas要素の作成
    var canvas = document.getElementById(musicscore.canvasname);
//    var height = window.getComputedStyle(document.body, '').getPropertyValue('height');
//    var width = window.getComputedStyle(document.body, '').getPropertyValue('width');
//    canvas.setAttribute('height', height);
//    canvas.setAttribute('width', width);

    // canvas要素の CSS
    canvas.style.cssText = 'position: absolute;' + 'top: 0;' + 'left: 0;' + 'z-index: 100; background: #FFF;';
//    document.body.appendChild(canvas);

    // 描画コンテクストを得る
    var context = canvas.getContext('2d');
    // 色を指定　当然黒でいきますよ
    context.strokeStyle = 'black';
    // 線を引く

    // 座標を指定して線を引くよ
    context.beginPath();

	// 標準の五線を描画します
	for(var i=0; i<5; i++){
	    context.moveTo( musicscore.canvasZeroX, musicscore.canvasZeroY + (i*musicscore.size));
	    context.lineTo( musicscore.canvasZeroX + musicscore.scoreWidth, musicscore.canvasZeroY + (i*musicscore.size));
	}

	/*
	 * 音符のY軸の座標を計算しますよ
	 * 0:C, 1:D, 2:E といった具合
	 * 線のY軸は上から,100,120,140,160,180となっている。
	 * Cは200が中心位置となる。
	 */
	var centery = musicscore.canvasZeroY + (5 * musicscore.size) - (scoreindex / 2) * musicscore.size;
	var CENTERX = musicscore.canvasZeroX + (musicscore.scoreWidth / 2);

	// 音符の円を描画します。楕円じゃないけど勘弁してね。
    context.moveTo( CENTERX, centery);
    context.fillStyle = musicscore.color;
    context.arc( CENTERX, centery, musicscore.size / 2, 0, Math.PI * 2, false);
	context.fill();

	// 五線からはみ出る場合には短い線を引くのです。
	if(scoreindex<=0){
		// 五線の下に必要な本数を計算するよ
		var num = Math.floor((scoreindex * -1) / 2) + 1;
		for(var i=0; i<num; i++){
		    context.moveTo( CENTERX - musicscore.size, musicscore.canvasZeroY + (5 * musicscore.size) + (i * musicscore.size));
			context.lineTo( CENTERX + musicscore.size, musicscore.canvasZeroY + (5 * musicscore.size) + (i * musicscore.size));
		}
	}else if(scoreindex>=12){
		// 五線の上に必要な本数を計算するよ
		var num = Math.floor((scoreindex - 12) / 2) + 1;
		for(var i=0; i<num; i++){
		    context.moveTo( CENTERX - musicscore.size, musicscore.canvasZeroY - ((i+1) * musicscore.size));
			context.lineTo( CENTERX + musicscore.size, musicscore.canvasZeroY - ((i+1) * musicscore.size));
		}
	}
    context.closePath();
	context.stroke();
};

musicscore.clearCanvas = function(){
    var context = document.getElementById(musicscore.canvasname).getContext("2d");
	context.clearRect(-10,-10,musicscore.canvasWidth,musicscore.canvasHeight);//図形を消去
};

/*
 * 音符をランダムに表示する
 */
musicscore.drawRandam = function(){
	var rand = Math.floor(Math.random() * 8);
	musicscore.clearCanvas();
	musicscore.drawscore(rand);
};