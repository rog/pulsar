var cWidth = 480, cHeight = 600                               /* Canvas Dimensions */
var yInit = cHeight-40, pulseSpace = 5                        /* Bottom Limit for animation and space between lines */
var strokeColor = 'rgb(255,255,255)', bgColor = 'rgb(0,0,0)'  /* Line Color and Background Color */

var container = document.body.appendChild( document.createElement( 'div' ) ); container.setAttribute("id", "container")
var c = container.appendChild( document.createElement( 'canvas' ) ); c.width = cWidth; c.height = cHeight

if (c.getContext){ctx = c.getContext('2d'); ctx.lineWidth = 2;}

function pulse(y){
    ctx.clearRect(0, 0, c.width, c.height);   /* Clear Canvas */

    for(yAux=y; yAux <= cHeight-40; yAux+=pulseSpace){
      ctx.beginPath()
      ctx.moveTo(50,yAux)
      ctx.strokeStyle = strokeColor
      ctx.fillStyle = bgColor
      xElevation = (Math.floor(Math.random()*50));
      for( i=50; i < cWidth-50; i+=2 ){
        rand = ( (i > 130+xElevation) && (i < cWidth-(180-xElevation)) ) ? 30 : 2
        ctx.lineTo( i, yAux-(Math.floor(Math.random()*rand)) )
        if(rand > 10) i+=6
      }

      ctx.lineJoin = "round"
      ctx.stroke()
      ctx.fill()
    }


    if(yInit >= 65){
      yInit -= pulseSpace
      setTimeout('pulse(yInit)',80)
    } else {
      console.log('STOP!, Hammertime!')
    }

}

pulse(yInit)