var cWidth= 480, cHeight = 600, yInit = cHeight-40;
var container = document.body.appendChild( document.createElement( 'div' ) ); container.setAttribute("id", "container");
var c = container.appendChild( document.createElement( 'canvas' ) ); c.width = cWidth; c.height = cHeight;

var strokeColor = 'rgb(255,255,255)';
var bgColor = 'rgb(0,0,0)';
if (c.getContext) {
  ctx = c.getContext( '2d' );
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 2;
}

function pulse(y){
    ctx.clearRect(0, 0, c.width, c.height);

    for(yAux=y; yAux <=cHeight-40; yAux+=5){
      ctx.beginPath();
      ctx.moveTo(50,yAux);
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = bgColor;

      for(i=50; i<cWidth-50; i+=2){
        rand = (i>150 && i<cWidth-150) ? 30 : 3;
        yLine = (Math.floor(Math.random()*rand));
        ctx.lineTo(i,yAux-yLine);
        if(rand > 10)
          i+=4;
      }

      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.fill();
    }


    if(yInit >= 65){
      yInit -= 5;
      setTimeout('pulse(yInit)',80);
    } else {
      console.log('STOP!, Hammertime!');
    }

}

pulse(yInit);