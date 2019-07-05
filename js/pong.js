                $(document).ready(function() {
                $("#startGame").click(function() { 
                //declaration de variable
                var x;
                var y;
                var dx;
                var dy;
                var WIDTH;
                var HEIGHT;
                var ctx;
                var paddlex;
                var paddleh;
                var paddlew;
                var intervalId;
                var rightDown = false;
                var leftDown = false;
                var radius;
                var paddlexAI;
                var score = 0;

                 
                var canvas = document.getElementById( 'myCanvas' );
                                 
                // rightDown et leftDown si les right ou left keys sont appuyees
                function onKeyDown(evt) {
                  if (evt.keyCode == 39) rightDown = true;
                  else if (evt.keyCode == 37) leftDown = true;
                }
                 
                // quand les right ou left key sont relachees
                function onKeyUp(evt) {
                  if (evt.keyCode == 39) rightDown = false;
                  else if (evt.keyCode == 37) leftDown = false;
                }
                 
                $(document).keydown(onKeyDown);
                $(document).keyup(onKeyUp);
 
                function init_paddles() {
                    paddlex = WIDTH / 2;
                    paddlexAI = paddlex;
                    paddleh = 10;
                    paddlew = 75;
                     
                }
                 
                  
 
                function init() {
                  ctx = canvas.getContext("2d"); 
                  WIDTH = canvas.width;
                  HEIGHT = canvas.height;
                  x = 150;
                  y = 150;
                  dx = 2;
                  dy = 4;
                  radius = 10;
                  rightDown = false;
                  leftDown = false;
                  intervalId = 0;
                   
                  intervalId = setInterval(draw, 10);
                  init_paddles();
                    
                }
             
                function circle(x,y,r) {
                  ctx.beginPath();
                  ctx.arc(x, y, r, 0, Math.PI*2, true);
                  ctx.closePath();
                  ctx.fill();
                }
 
                function rect(x,y,w,h) {
                  ctx.beginPath();
                  ctx.rect(x,y,w,h);
                  ctx.closePath();
                  ctx.fill();
                }
 
                function clear() {
                  ctx.clearRect(0, 0, WIDTH, HEIGHT);
                }
 
                function followBallAI() {
                 
                    //choisir un nombre entre 0 et 1
                    var delayReaction = Math.random();
                     
                    //25% chance de reaction 
                    if(delayReaction >= 0.25) {
                     
                        if(x > paddlexAI + paddlew) {
                            if(paddlexAI + paddlew + 5 <= WIDTH) {
                                paddlexAI += 5;
                            }
                        }
                         
                        else if(x < paddlexAI) {
                            if(paddlexAI - 5 >= 0) {
                                paddlexAI -= 5;
                            }
                        }
                         
                        else {
                         
                            var centerPaddle = Math.random();
                         
                            //80% chance de centrer la raquette
                      
                            if(centerPaddle > 0.2) {
                                     
                                //Si la balle plus proche du cote gauche de la padlleAI
                                if( Math.abs(x - paddlexAI) < Math.abs(x - paddlexAI - paddlew) ) {
                                    if(paddlexAI - 5 >= 0) {
                                        paddlexAI -= 5;
                                    }
                                }
                                         
                                else { 
                                    if(paddlexAI + paddlew + 5 <= WIDTH) {
                                        paddlexAI += 5;
                                    }
                                }
                            }
                         
                        }
                         
                    }
                     
                }
                 
                function drawSideLines() {
                     ctx.beginPath();
                     ctx.rect(0,0,10,HEIGHT);
                     ctx.closePath();
                     ctx.fill();
                      
                     ctx.beginPath();
                     ctx.rect(WIDTH - 10,0,10,HEIGHT);
                     ctx.closePath();
                     ctx.fill();
                }
                 
                function drawScore() {
                     ctx.font = "20px Arial ";
                     ctx.fillText("Score: "+score, 360, 250);
                }

              
                function draw() {

                      clear();
                      circle(x, y, radius);
 
                      //bouge le paddle si left ou right sont appuyees
                       
                      if (rightDown) {
                        if(paddlex + paddlew + 5 <= WIDTH) {
                            paddlex += 5;
                        }
                      }
                       
                      else if (leftDown) {
                        if(paddlex - 5 >= 0) {
                            paddlex -= 5;
                        }
                      }
                       
                      followBallAI();
                       
                      drawSideLines();
                      rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
                      rect(paddlexAI, 0, paddlew, paddleh);
                      drawScore();
                      
                      if (x + dx + radius > WIDTH || x + dx - radius < 0)
                        dx = -dx;
 
                      //ligne du dessus
                      if (y + dy - radius <= 0) {
                         
                        if (x <= paddlexAI || x >= paddlexAI + paddlew) {
                            score++;
                            clearInterval(intervalId);
                            alert('vous avez gagné ! :)');
                            init();
                        }
                      //augmentation de vitesse   
                        else {
                            dy = -1.05*dy;
                        }
                         
                      }
                       
                      //ligne du dessous et augmentation vitesse
                      else if (y + dy + radius > HEIGHT) {
                         
                        if (x > paddlex && x < paddlex + paddlew) {
                            dx = 8.4 * ((x-(paddlex+paddlew/2))/paddlew);
                            dy = -1.05*dy;
                        }
                            
                        else {
                          clearInterval(intervalId);
                          alert('vous avez perdu ! :(')
                          return;
                          init();
                        }
                      }
                       
                      x +=dx;
                      y +=dy;
                    }
 
                    init();
 
            }); 
             
          });

        