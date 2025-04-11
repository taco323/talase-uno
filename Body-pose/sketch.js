let bodyPose;
let video;
let poses = [];
let connections;
let painting;


function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}


function mousePressed() {
  console.log(poses);
}


function setup() {
  // lienzo de pantalla
  createCanvas (windowWidth, windowHeight);
  // creamos una capa para gráficos con dimensión de pantall painting createGraphics (windowWidth, windowHeight);
 painting=createGraphics(windowWidth,windowHeight);
  painting.clear();
  // Crea el video y lo esconde
  video.createCapture (VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();
  // Start detecting poses in the webcam video bodyPose.detectStart(video, gotPoses);
  bodyPose.detectStart(video,gotPoses);
  // Get the skeleton connection information connections bodyPose.getSkeleton();
  connections=bodyPose.getSkeleton()
}



// Callback function for when the model returns pose data
function gotPoses(results) {
  // Store the model's results in a global variable
  poses = results;
}



function draw() {
  painting.noStroke();
  painting.fill (240, 128, 128, 3);
  painting.rect (width/2, 0, width/2, height/2);

  painting.fill(128, 128, 0, 3);
  painting.rect(0, 0, width/2, height/2);

  //fill (0, 128, 128);
  //rect (0, 0, width, height);


  //Display the video
  image(video, 0, 0, width, height);
  
  
  // Draw the skeleton connections
  /*for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if we have confidence in both points
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }*/
  
  
  // Iterate through all the poses
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    // Iterate through all the keypoints for each pose
    for (let j = 0; j < pose.keypoints.length; j++) {
      //let keypoint = pose.keypoints[j];
      let index = pose.keypoints[10];
      // Only draw a circle if the keypoint's confidence is greater than 0.1
      /*if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);*/
        if (index.confidence > 0.1) {
          fill(0, 255, 0);
          noStroke();
          circle(index.x, index.y, 10);
  
          // Si el punto está en la mitad derecha, dibujar un rectángulo
          if (index.x > width / 2) {
            fill(255, 0, 255);
            rect(width/2, (height/2)-130, 130, 130);
          }
        }
    }
  }
  //Iqui colocamos nuestra capa para dibujar hecha con createGraphics
  image(painting, 0, 0);
}