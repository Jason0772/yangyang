function clip(n) {
  var canvas = document.createElement("canvas");
  canvas.width = 150;
  canvas.height = 150;
  var ctx = canvas.getContext("2d");

  var img = new Image();
  img.onload = function () {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 150, 150);
    ctx.drawImage(img, 0, 0);

    var base64 = canvas.toDataURL("image/png");
    var a = document.createElement("a");
    a.innerHTML = "p" + n + ".png";
    a.href = base64;
    a.download = "p" + n + ".png";
    document.body.append(a);
  };
  img.src = `./imgs/p${n}.png`;
  //   document.body.append(canvas);
}
for (var i = 1; i <= 16; i++) {
  clip(i);
}
