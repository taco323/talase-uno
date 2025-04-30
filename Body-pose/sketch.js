let bodyPose;
let video;
let poses = [];
let connections;
let img, img2;

function preload() {
  bodyPose = ml5.bodyPose({ flipped: true });
  img = loadImage("assets/gatouno.jpg");
  img2 = loadImage("assets/gatodos.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO ,{flipped: true});
  video.size(windowWidth, windowHeight);
  video.hide();

  bodyPose.detectStart(video, gotPoses);
  connections = bodyPose.getSkeleton();
}

function gotPoses(results) {
  poses = results;
}

function draw() {
  image(video, 0, 0, width, height);

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    let index1 = pose.keypoints[9];   // muñeca izquierda
    let index2 = pose.keypoints[10];  // muñeca derecha

    if (index1.confidence > 0.1) {
      fill(0, 255, 0);
      noStroke();
      circle(index1.x, index1.y, 9);

      if (index1.x < width / 2 && index1.y < height / 2) {
        image(img, index1.x, index1.y, 200, 200);
      }
    }

    if (index2.confidence > 0.1) {
      fill(0, 255, 0);
      noStroke();
      circle(index2.x, index2.y, 10);

      if (index2.x > width / 2 && index2.y < height / 2) {
        image(img2, index2.x, index2.y, 200, 200);
      }
    }
  }
}

function mousePressed() {
  console.log(poses);
}