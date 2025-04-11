let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipped: false };

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function mousePressed() {
  // Load the bodyPose model
  console.log(faces);
}

function setup() {
  createCanvas(640, 480);
 // Create the video and hide it
 video = createCapture(VIDEO);
 video.size(640, 480);
 video.hide();

 // Start detecting faces from the webcam video
 faceMesh.detectStart(video, gotFaces);
 // Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}
}

function draw() {
  image(video, 0, 0, width, height);
// Draw all the tracked face points
for (let i = 0; i < faces.length; i++) {
  let face = faces[i];
  for (let j = 0; j < face.keypoints.length; j++) {
    let keypoint = face.keypoints[j];
    fill(0, 255, 0);
    noStroke();
    circle(keypoint.x, keypoint.y, 5);
  }
}
}
