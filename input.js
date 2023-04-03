/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/

// Get the box element
const boxes = document.querySelectorAll('.target');
// Set the initial position of the box

var startPosX = 0, startPosY = 0;
var currentPosX = 0, currentPosY = 0;
var can_change = 1;
var can_move = 0;
var NOW_USE = 0;
var FASTSTOP = 0;

start_program();

function start_program() {
  console.log("start program");
  var num = 1;
  for (var i=0; i<boxes.length; i++){
    var name = "num" + String(num);
    var select_box = boxes[i];
    select_box.classList.add(name);
    select_box.style.cursor = "move";

    Click_or_dblClick(select_box);
    Touch_or_dblTouch(select_box);
    num++;
  }
}

function re_start_single(select_box) {
  console.log("re start single");
  select_box.style.cursor = "move";

  Click_or_dblClick(select_box);
  Touch_or_dblTouch(select_box);

}

function Click_or_dblClick(box) {
  console.log("click or dblclick");
  let clickedTimes = 0;

  const doClick = () => {
    clickedTimes++;
  };

  const reset = () => {
    clickedTimes = 0;
  };

  box.addEventListener("mousedown", (e) => {
    doClick();
    setTimeout(() => {
      if (clickedTimes === 1 && can_change) { //single click
        can_move = 1;
        can_change = 1;
        console.log(1);
        DragStart(e, box);
        
      } else if (clickedTimes == 2) {
        can_move = 1;
        // can_change = 1;
        Stick(e, box);
        console.log(2);
      }

      reset();
    }, 500);
  });
}

function Touch_or_dblTouch(box) {
  console.log("click or dblclick");
  let touchedTimes = 0;

  const doClick = () => {
    touchedTimes++;
  };

  const reset = () => {
    touchedTimes = 0;
  };

  box.addEventListener("mousedown", (e) => {
    doClick();
    setTimeout(() => {
      if (touchedTimes === 1 && can_change) { //single click
        can_move = 1;
        can_change = 1;
        console.log(1);
        TouchStart(e, box);
        
      } else if (touchedTimes == 2) {
        can_move = 1;
        // can_change = 1;
        TouchStick(e, box);
        console.log(2);
      }

      reset();
    }, 500);
  });
}


function DragStart(e, box) {
  console.log("drag start");
  if (can_move){
    e = e || window.event;
    e.preventDefault();

    // get first position
    currentPosX = e.clientX;
    currentPosY = e.clientY;
    
    // save initial position
    startPosX = box.offsetLeft;
    startPosY = box.offsetTop;

    //get now
    NOW_USE = box.classList[1];

    const handleDrag = (e) => Drag(e, box);
    const handleDragEnd = (e) => DragEnd(e, box, handleDrag, handleDragEnd);
    FASTSTOP=1;
    FastStop(box, handleDrag, handleDragEnd);

    box.addEventListener("mousemove", handleDrag);
    box.addEventListener("mouseup", handleDragEnd);
  }
}

function TouchStart(e, box) {
  console.log("touch start");
  if (can_move){
    e = e || window.event;
    e.preventDefault();

    // get first position
    currentPosX = e.clientX;
    currentPosY = e.clientY;
    
    // save initial position
    startPosX = box.offsetLeft;
    startPosY = box.offsetTop;

    //get now
    NOW_USE = box.classList[1];

    const handleTouch = (e) => Touch(e, box);
    const handleTouchEnd = (e) => TouchEnd(e, box, handleTouch, handleTouchEnd);
    FASTSTOP=1;
    FastStopTouch(box, handleTouch, handleTouchEnd);

    box.addEventListener("touchmove", handleTouch);
    box.addEventListener("touchend", handleTouchEnd);
  }
}

function FastStop(select_box, handleDrag, handleDragEnd) {
  console.log("fast stop");
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27 && NOW_USE == select_box.classList[1] && FASTSTOP==1) {
      FASTSTOP = 0
      // console.log("FastStop");
      can_move = 0;
      select_box.style.left = startPosX + "px";
      select_box.style.top = startPosY + "px";
      select_box.removeEventListener("mouseup", handleDragEnd);
      select_box.removeEventListener("mousedown", DragStart);
      select_box.removeEventListener("mousemove", handleDrag);
      re_start_single(select_box);
      can_change = 1;
      // document.removeEventListener('keydown', arguments.callee);
    }
  });
}
function FastStopTouch(select_box, handleTouch, handleTouchEnd) {
  console.log("fast stop");
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27 && NOW_USE == select_box.classList[1] && FASTSTOP==1) {
      FASTSTOP = 0
      // console.log("FastStop");
      can_move = 0;
      select_box.style.left = startPosX + "px";
      select_box.style.top = startPosY + "px";
      select_box.removeEventListener("touchend", handleTouchEnd);
      select_box.removeEventListener("touchstart", TouchStart);
      select_box.removeEventListener("touchmove", handleTouch);
      re_start_single(select_box);
      can_change = 1;
      // document.removeEventListener('keydown', arguments.callee);
    }
  });
}


function Drag(e, box) {
  console.log("drag");
  if (can_move){
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
}
function Touch(e, box) {
  console.log("Touch");
  if (can_move){
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
}


function DragEnd(e, box, handleDrag, handleDragEnd) {
  e = e || window.event;
  e.preventDefault();
  // console.log(box);
  var rect = box.getBoundingClientRect();
  var deltaX = e.clientX - currentPosX;
  var deltaY = e.clientY - currentPosY;

  // console.log(startPosX, startPosY.offsetTop + deltaY,box.offsetLeft + deltaX)
  console.log("drag end");
  if (rect.left == startPosX + deltaX && rect.top == startPosY + deltaY && can_change) {
    var nowColor = box.style.backgroundColor;
    console.log(nowColor);
    if (nowColor == "red"){
      box.style.backgroundColor = "blue";
    
      //set other box to red
      document.querySelectorAll('.target').forEach(function(otherBox) {
        if (otherBox != box) {
          otherBox.style.backgroundColor = "red";
        }
      });
    } else {
      box.style.backgroundColor = "red";
    }
    can_change = 0;
  }

  // Stop moving when mouse button is released
  box.removeEventListener("mousemove", handleDrag);
  box.removeEventListener("mouseup", handleDragEnd);
  can_move = 1;
  can_change = 1;
}

function TouchEnd(e, box, handleTouch, handleTouchEnd) {
  e = e || window.event;
  e.preventDefault();
  // console.log(box);
  var rect = box.getBoundingClientRect();
  var deltaX = e.clientX - currentPosX;
  var deltaY = e.clientY - currentPosY;

  // console.log(startPosX, startPosY.offsetTop + deltaY,box.offsetLeft + deltaX)
  console.log("touch end");
  if (rect.left == startPosX + deltaX && rect.top == startPosY + deltaY && can_change) {
    var nowColor = box.style.backgroundColor;
    console.log(nowColor);
    if (nowColor == "red"){
      box.style.backgroundColor = "blue";
    
      //set other box to red
      document.querySelectorAll('.target').forEach(function(otherBox) {
        if (otherBox != box) {
          otherBox.style.backgroundColor = "red";
        }
      });
    } else {
      box.style.backgroundColor = "red";
    }
    can_change = 0;
  }

  // Stop moving when mouse button is released
  box.removeEventListener("touchmove", handleTouch);
  box.removeEventListener("touchend", handleTouchEnd);
  can_move = 1;
  can_change = 1;
}


function Stick(e, box) {
  console.log("stick");
  e = e || window.event;
  e.preventDefault();

  box.style.backgroundColor = "blue";
  document.querySelectorAll('.target').forEach(function(otherBox) {
    if (otherBox != box) {
      otherBox.style.backgroundColor = "red";
    }
  });

  currentPosX = e.clientX;
  currentPosY = e.clientY;
  
  // save initial position
  startPosX = box.offsetLeft;
  startPosY = box.offsetTop;

  const handleStick = (e) => Drag(e, box);
  const handleStickEnd = (e) => StickEnd(e, box, handleStick, handleStickEnd);

  can_change = 0;
  
  box.addEventListener("mousemove", handleStick);
  box.addEventListener("mouseup", handleStickEnd);

  FASTSTOP=1;
  FastStop(box, handleStick, handleStickEnd);
}
function TouchStick(e, box) {
  console.log("stick");
  e = e || window.event;
  e.preventDefault();

  box.style.backgroundColor = "blue";
  document.querySelectorAll('.target').forEach(function(otherBox) {
    if (otherBox != box) {
      otherBox.style.backgroundColor = "red";
    }
  });

  currentPosX = e.clientX;
  currentPosY = e.clientY;
  
  // save initial position
  startPosX = box.offsetLeft;
  startPosY = box.offsetTop;

  const handleTouch = (e) => Touch(e, box);
  const handleTouchEnd = (e) => TouchStickEnd(e, box, handleTouch, handleTouchEnd);

  can_change = 0;
  
  box.addEventListener("touchmove", handleTouch);
  box.addEventListener("touchend", handleTouchEnd);

  FASTSTOP=1;
  FastStop(box, handleTouch, handleTouchEnd);
}

function StickEnd(e, box, handleDrag, handleDragEnd){
  console.log("stick end");
  e = e || window.event;
  e.preventDefault();

  box.removeEventListener("mousemove", handleDrag);
  box.removeEventListener("mouseup", handleDragEnd);
  can_change = 1;
  can_move = 0;
  // box.addEventListener("mousedown", DragStart);

}

function TouchStickEnd(e, box, handleTouch, handleTouchEnd){
  console.log("stick end");
  e = e || window.event;
  e.preventDefault();

  box.removeEventListener("touchmove", handleTouch);
  box.removeEventListener("touchup", handleTouchEnd);
  can_change = 1;
  can_move = 0;
  // box.addEventListener("mousedown", DragStart);

}