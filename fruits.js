status = "";
img = "";
objects = [];

function preload(){
    img = loadImage("fruitdetection.jpg");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center;
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    
    
}

function modelLoaded(){
    status = true; 
    console.log("Model Loaded!")
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if (error) {
        console.log(error)
    }
    console.log(results);
    objects = results;
}

function draw() {
    if (status != undefined) {
        image(img, 0, 0, 640, 420);
       for (var i=0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status : Objects Detected";

        fill(255, 0, 0);
        percent = floor(objects[i].confidence*100);       
        text(objects[i].label+""+percnet+"%", objects[i].x+5, objects[i].y+15);
        noFill();
        stroke(255, 0, 0);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
    }
}