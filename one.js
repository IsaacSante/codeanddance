let cam;
let step = 10;
let size;

let maxB = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  cam = createCapture(VIDEO);
  cam.hide();

  pixelDensity(1);
  noStroke();
  
  size = int(width / (cam.width / step)) / 2.5;
}

function draw() {
  background(255,50);
  translate(width, 0);
  //then scale it by -1 in the x-axis
  //to flip the image
  scale(-1, 1);
  
  cam.loadPixels();
  
  maxB = 0;

  if (cam.pixels.length > 0) {
    for (let y = 0; y < cam.height; y += step) {
      for (let x = 0; x < cam.width; x += step) {
        let i = (y * cam.width + x) * 4;

        let r = cam.pixels[i];
        let g = cam.pixels[i + 1];
        let b = cam.pixels[i + 2];

        let pColor = color(r, g, b);
        let pBright = brightness(pColor);
        
        if(pBright > maxB){
          maxB = pBright;  
        }
        
        let bright = int(map(pBright, 0, maxB, 0, 8));

        let txt = "";
        textStyle(NORMAL);
        switch (bright) {
          case 0:
            txt = "😂";
            // textStyle(ITALIC);
            break;
          case 1:
            txt = "🔥";
            break;
          case 2:
            txt = "🦕";
            break;
          case 3:
            txt = "🌵";
            break;
          case 4:
            txt = "🌈";
            break;
          case 5:
            txt = "♥️";
            break;
          case 6:
            txt = "🦄";
            break;
          case 7:
            txt = "🦑";
            break;
          default:
            txt = "🌚";
            break;
        }
        
        let xpos = map(x, 0, cam.width, 0, width);
        let ypos = map(y, 0, cam.height, 0, height);

        fill(0, (pBright - (maxB / 9) * bright) * 20);
        textSize(size - 5);
        text(txt, xpos, ypos + size);
      }
    }
  }
}
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
  }