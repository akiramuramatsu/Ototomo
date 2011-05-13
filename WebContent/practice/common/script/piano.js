// 初期化変数等
var piano = {
	canvasHeight: 300,
	canvasWidth: 300,
	whiteKeyWidth: 40,
	blackKeyWidth: 30,
	color: "black",
	canvasname: "",
	oto: ["C","D","E","F","G","A","B"],
	checkPanel: ""
};

piano.init = function(canvasname, funcCheckPanel){
	piano.canvasname = canvasname;
	piano.checkPanel = 	funcCheckPanel;

    var canvas = document.getElementById(piano.canvasname);
    // for iPhone
    canvas.ontouchstart = function(e){
    	if(e.touches.length > 0){
    		var t = e.touches[0];
    		piano.checkPanelXY(t.clientX, t.clientY);
    	}
    	e.preventDefault();
    };
    // for PC
    canvas.onmousedown = function(e){
		piano.checkPanelXY(e.clientX, e.clientY);
    };
};

piano.checkPanelXY = function(sx, sy){
	// タップされたパネル位置取得
	if(sx >= 10 && sx <= (10 + piano.whiteKeyWidth * 7) && sy >= 200 && sy <= 280){
		var col = Math.floor((sx - 10) / piano.whiteKeyWidth);
		alert(col + " " + piano.oto[col]);
		piano.checkPanel(col);
	}
};


piano.draw = function(){
    // canvas要素の作成
    //var canvas = document.createElement('canvas');
    var canvas = document.getElementById(piano.canvasname);
//    var height = window.getComputedStyle(document.body, '').getPropertyValue('height');
//    var width = window.getComputedStyle(document.body, '').getPropertyValue('width');
//    canvas.setAttribute('height', height);
//    canvas.setAttribute('width', width);

    // canvas要素の CSS
    canvas.style.cssText = 'position: absolute;' + 'top: 0;' + 'left: 0;' + 'z-index: 100; background: #FFF;';
//    document.body.appendChild(canvas);

    // 描画コンテクストを得る
    var context = canvas.getContext('2d');

    // ◆1．境界線を描画する
    // 色を指定
    context.strokeStyle = piano.color;
    // 線を引く

    // 座標を指定して線を引くよ
    context.beginPath();

    // 取り急ぎ縦に8本引く, 幅37で
    // Vertical
	for(var i=0; i<8; i++){
	    context.moveTo( 10 + piano.whiteKeyWidth * i, 200);
	    context.lineTo( 10 + piano.whiteKeyWidth * i, 280);
	}

	// 黒鍵はfillRectで描画する
	context.fillStyle = 'rgba(0, 0, 0, 255)';
	for(var i=0; i<6; i++){
		if(i!=2)
			context.fillRect(10 + piano.whiteKeyWidth * (i + 1) - (piano.blackKeyWidth / 2), 200, piano.blackKeyWidth, 20);
	}


	// Horizontal
    context.moveTo( 10, 200);
    context.lineTo( 10 + piano.whiteKeyWidth * 7, 200);

    context.moveTo( 10, 280);
    context.lineTo( 10 + piano.whiteKeyWidth * 7, 280);



    context.closePath();
	context.stroke();
};

piano.clearCanvas = function(){
    var context = document.getElementById("mycanvas").getContext("2d");
	context.clearRect(-10,-10,piano.canvasWidth,piano.canvasHeight);//図形を消去
};

