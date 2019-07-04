

jQuery.fn.extend({
    appendSvg:function (nom,attributs)
              {
                  var svg = document.createElementNS("http://www.w3.org/2000/svg",nom);
                  for (var cle in attributs)
                  {
                          var valeur = attributs[cle];
                          svg.setAttribute(cle,valeur);
                  }
                  var appendices = this.length;
                  for (var i = 0; i < appendices; i++)
                  {
                          this[i].appendChild(svg);
                  }
                  return svg;
              }
}); 
  XBRICKS = 15
  YBRICKS = 5
  BRICKH = 50
  W = 0
  H = 0
  BW = 100
  BH = 10
  R = 10

  vx = 4
  vy = 4

  nbricks = XBRICKS*YBRICKS

  function random_color() {
      var hue = Math.floor(Math.random()*360)
      return 'hsl('+hue+', 100%, 50%)'
  }

  function create_bricks(nx,ny) {
    for(var i=0; i<nx; i++) {
      for(var j=0; j<ny; j++) {
        var b = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        b = $(b).attr({x: i*W/nx, y:j*BRICKH, width:W/nx, height:BRICKH}).addClass("brick")
        b.css("fill", random_color())
        b.css("stroke", "black")
        $("svg").append(b)
      }
    }
  }

  function get_brick_at(x,y) {
    var i = Math.floor(y/BRICKH)
    var j = Math.floor(x/(W/XBRICKS))
    if(i>=YBRICKS) return null;
    if($("rect.brick").eq(j*YBRICKS+i).is(":visible")) return j*YBRICKS+i
    return null
  }

  function breakbrick_up(x,y) { return break_at(x+vx,y-R+vy) }
  function breakbrick_down(x,y) { return break_at(x+vx,y+R+vy) }
  function breakbrick_left(x,y) { return break_at(x+vx-R,y+vy) }
  function breakbrick_right(x,y) { return break_at(x+vx+R,y+vy) }

  function break_at(x,y) {
    var b = get_brick_at(x,y)
    if(b!==null) {
      $("rect.brick").eq(b).hide()
      nbricks--;
      return true
    }
    return false
  }

  function step() {
    x = parseInt($("#ball").attr("cx"))
    y = parseInt($("#ball").attr("cy"))
    x += vx
    y += vy

    if((x>=W-R && vx>0) || (x<=R && vx<0)) rebond_h() // Rebond bors
    else if(y>=H-R-BH && x+R/2>=barx && x-R/2<=barx+BW) rebond_bar((x+R/2-barx)/(BW+R)) // Rebond barre
    else if(y<=R) rebond_v() // Rebond haut
    else if(breakbrick_up(x,y)) rebond_v()
    else if(breakbrick_left(x,y)) rebond_h()
    else if(breakbrick_right(x,y)) rebond_h()
    else if(breakbrick_down(x,y)) rebond_v()
    else if(y>=H-R) perdu()

    if(nbricks==0) gagne()
    $("#ball").attr("cx", x).attr("cy", y)
  }

  function rebond_v() { vy = -vy }
  function rebond_h() { vx = -vx }
  function rebond_bar(angle) {
    vy = -vy
    vx = 10*(angle - 0.5)
  }

  function perdu() {
    clearInterval(_i)
    $("#msg").text("YOU LOOSE !").show()
  }

  function gagne() {
    clearInterval(_i)
    $("#msg").text("YOU WIN !").show()
  }


  barx=0
  $(function() {
    svg = $("svg")

    $(window).keyup((e) => {
      if(e.key == ' ') location.reload()
    })

    $("#bar").attr("width", BW).attr("height", BH)
    $("#ball").attr("r", R)
    W = $("svg").width()
    H = $("svg").height()

    svg.on('mousemove', (e) => {
      barx = e.offsetX
      if(barx>=W-BW) barx = W-BW
      $("#bar").attr("x", barx)
    })

    create_bricks(XBRICKS,YBRICKS)

    _i = setInterval(step, 9)
  })
