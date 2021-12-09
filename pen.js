status1 = "";
img = "";
objects = [];

function setup()
{
    canvas = createCanvas(380, 381);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
    document.getElementById("number_of_objects").innerHTML = "There are 0 big objectsin the image from which cocossd model has detected 0 objects ";
}

function preload()
{
    img = loadImage('pen.jpg');
}

function draw()
{
    image(img, 0, 0, 380, 381);

    for(i = 0; i < objects.length; i++)
    {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "There are " + objects.length + " big objectsin the image from which cocossd model has detected " + objects.length + " objects ";

        fill("#0000FF");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 25, objects[i].y + 25);
        noFill();
        stroke("#0000FF");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status1 = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results)
{
    if(error)   {
        console.log(error);
    }
    console.log(results);
    objects = results;
}