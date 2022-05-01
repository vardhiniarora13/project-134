img = "";
objects = [];
status = ""; 
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    canvas.position(400,300);
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : Detecting objects!";
}
function modelLoaded() { 
    console.log("Model Loaded!") 

status = true;
  }

function gotResult(error, results) {
     if (error) { 
         console.log(error);
         } console.log(results);
          objects = results; 
        }

function preload(){
    img = loadImage("dog_cat.jpg"); 

}

function draw(){
image(video,0, 0 , 380, 380); 

if(status != ""){
    objectDetector.detect(video, gotResult);
    r = random(255);
    g = random(255);
    b = random(255);
    for(i = 0; i<objects.length;i++){
        document.getElementById("status").innerHTML="STATUS : Object Detected!";
        document.getElementById("number_of_objects").innerHTML = "Number of Objects detected are "+objects.length;

        fill(r,g,b);
        percent = floor(objects[i].confidence * 100); 
        text(objects[i].label+" "+percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}
