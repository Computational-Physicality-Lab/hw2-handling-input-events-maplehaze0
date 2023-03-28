/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/

// Get the box element
const box = document.querySelector('.target');
// Set the initial position of the box

var startPosX = 0, startPosY = 0;
var currentPosX = 0, currentPosY = 0;
var can_change = 1;

// box.addEventListener("mousedown", DragStart);
// box.addEventListener("mousedown", Click);
// box.addEventListener("dblclick", Stick);
box.style.cursor = "move";

function Click_or_dblClick(box) {
  let clickedTimes = 0;

  const doClick = () => {
    clickedTimes++;
  };

  const reset = () => {
    clickedTimes = 0;
  };

  box.addEventListener("mousedown", e => {
    doClick();
    setTimeout(() => {
      if (clickedTimes === 1 && can_change) { //single click

        console.log(1);
        DragStart(e);
        // box.addEventListener("mouseup", DragEnd);
        // console.log("add mouse up");
        
        // Click(e);
        
      } else if (clickedTimes == 2) {

        console.log(2);
        Stick(e);

      }

      reset();
      console.log("reset");
    }, 500);
  });
}

Click_or_dblClick(box);

function DragStart(e) {
  e = e || window.event;
  e.preventDefault();

  // get first position
  currentPosX = e.clientX;
  currentPosY = e.clientY;
  
  // save initial position
  startPosX = box.offsetLeft;
  startPosY = box.offsetTop;

  box.addEventListener("mousemove", Drag);
  box.addEventListener("mouseup", DragEnd);
  // console.log("add mouse up");
}

function Drag(e) {
  e = e || window.event;
  e.preventDefault();

  var deltaX = e.clientX - currentPosX;
  var deltaY = e.clientY - currentPosY;

  // Set new position:
  box.style.top = box.offsetTop + deltaY + "px";//control Y
  box.style.left = box.offsetLeft + deltaX + "px";//control X

  // save current position
  currentPosX = e.clientX;
  currentPosY = e.clientY;

}

function DragEnd(e) {
  e = e || window.event;
  e.preventDefault();

  var deltaX = e.clientX - currentPosX;
  var deltaY = e.clientY - currentPosY;

  // console.log(startPosX, startPosY, box.offsetTop + deltaY,box.offsetLeft + deltaX)
  if (startPosX == box.offsetLeft + deltaX && startPosY == box.offsetTop + deltaY && can_change){
    console.log("click");
    var nowColor = window.getComputedStyle(box).getPropertyValue("background-color");
    console.log(nowColor);
    if (nowColor == "rgb(255, 0, 0)"){
      box.style.backgroundColor = "blue";
    } else{
      box.style.backgroundColor = "red";
    }
  }

  // Stop moving when mouse button is released
  box.removeEventListener("mousemove", Drag);
  box.removeEventListener("mouseup", DragEnd);
}

document.body.addEventListener('keyup',function(e){

  if(e.keyCode == 27) {
    box.style.left = startPosX + "px";
    box.style.top = startPosY + "px";
    box.removeEventListener("mousemove", Drag);
    box.removeEventListener("mouseup", DragEnd);
  }

});



function Stick(e) {

  e = e || window.event;
  e.preventDefault();

  currentPosX = e.clientX;
  currentPosY = e.clientY;
  
  // save initial position
  startPosX = box.offsetLeft;
  startPosY = box.offsetTop;

  // box.removeEventListener("mousedown", DragStart);
  can_change = 0;
  box.addEventListener("mousemove", Drag);
  box.addEventListener("mouseup", StickEnd);
}

function StickEnd(e){
  e = e || window.event;
  e.preventDefault();

  console.log("stick end");
  box.removeEventListener("mousemove", Drag);
  box.removeEventListener("mouseup", StickEnd);
  can_change = 1;
  // box.addEventListener("mousedown", DragStart);

}