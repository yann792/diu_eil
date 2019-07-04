

if(!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) alert("Votre navigateur ne supporte pas la UserMedia API")


  back = null

  $(()=> {
    video = $('#video')[0];
    context = $("#canvas")[0].getContext('2d');

    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      video.srcObject = stream;
      video.play();
    });

    $("#snap").click(() => {
      back = context.getImageData(0,0,640,480).data
    })

    setInterval(processFrame, 20);
  })


  function processFrame() {
    th = parseInt($("#th").val())

    context.drawImage(video, 0,0, 640,480);
    var imgdata = context.getImageData(0,0, 640,480)
    var img = imgdata.data

    for(var i=0; i<640*480*4; i+=4) {
      if(back) {
        var dist = (Math.abs(img[i]-back[i]) + Math.abs(img[i+1]-back[i+1]) + Math.abs(img[i+2]-back[i+2]))/3
        if(dist < th) img[i+3] = 0;
      }
    }

    context.putImageData(imgdata, 0,0)
  }
