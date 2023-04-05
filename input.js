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
  console.log("start program!!!");
  var num = 1;
  for (var i=0; i<boxes.length; i++){
    var name = "num" + String(num);
    var select_box = boxes[i];
    select_box.classList.add(name);
    select_box.style.cursor = "move";
    
    addstretchEvent(select_box);
    addTouchOrClickEvent(select_box);
    num++;
  }
}

function re_start_single(select_box) {
  console.log("re start single");
  select_box.style.cursor = "move";

  addTouchOrClickEvent(select_box);

}

function addTouchOrClickEvent(box) {
  let clickedOrTouchedTimes = 0;
  let handleEvent = null;

  const doClickOrTouch = () => {
    clickedOrTouchedTimes++;
  };

  const reset = () => {
    clickedOrTouchedTimes = 0;
  };

  const removeEvent = () => {
    if ('ontouchstart' in window) {
      box.removeEventListener("touchstart", handleEvent);
    } else {
      box.removeEventListener("mousedown", handleEvent);
    }
  }

  handleEvent = (e) => {
    doClickOrTouch();
    setTimeout(() => {
      if (clickedOrTouchedTimes === 1 && can_change) {
        can_move = 1;
        can_change = 1;
        DragStart(e, box);
      } else if (clickedOrTouchedTimes === 2) {
        can_move = 1;
        Stick(e, box);
      }
      reset();
      removeEvent();
    }, 500);
  };

  if ('ontouchstart' in window) {
    box.addEventListener("touchstart", handleEvent);
  } else {
    box.addEventListener("mousedown", handleEvent);
  }
}


function DragStart(e, box) {
  console.log("drag start");
  if (can_move){
    e = e || window.event;
    e.preventDefault();
    
    // save initial position
    if ('ontouchstart' in window) {
      startPosX = window.pageXOffset;
      startPosY = window.pageYOffset;
    } else {
      startPosX = box.offsetLeft;
      startPosY = box.offsetTop;
    }
    //get now
    NOW_USE = box.classList[1];

    const handleDrag = (e) => Drag(e, box);
    const handleDragEnd = (e) => DragEnd(e, box, handleDrag, handleDragEnd);
    FASTSTOP=1;
    FastStop(box, handleDrag, handleDragEnd);

    if ('ontouchstart' in window) {
      currentPosX = e.touches[0].pageX;
      currentPosY = e.touches[0].pageY;
      box.addEventListener("touchmove", handleDrag);
      box.addEventListener("touchend", handleDragEnd);
    } else {
      currentPosX = e.clientX;
      currentPosY = e.clientY;
      box.addEventListener("mousemove", handleDrag);
      box.addEventListener("mouseup", handleDragEnd);
    }
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
    }
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
    }
  });
}



function Drag(e, box) {
  console.log("drag");
  if (can_move){
    e = e || window.event;
    e.preventDefault();

    if ('ontouchstart' in window) {

      var deltaX = e.touches[0].pageX - currentPosX;
      var deltaY = e.touches[0].pageY - currentPosY;
      box.style.top = (box.offsetTop  + deltaY) + "px";//control Y
      box.style.left = (box.offsetLeft + deltaX) + "px";//control X
      currentPosX = e.touches[0].pageX;
      currentPosY = e.touches[0].pageY;

    } else {

      var deltaX = e.clientX - currentPosX;
      var deltaY = e.clientY - currentPosY;
      box.style.top = (box.offsetTop + deltaY) + "px";//control Y
      box.style.left = (box.offsetLeft + deltaX) + "px";//control X
      currentPosX = e.clientX;
      currentPosY = e.clientY;

    }
    
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
  if ('ontouchstart' in window) {
    box.removeEventListener("touchmove", handleDrag);
    box.removeEventListener("touchend", handleDragEnd);
  } else {
    box.removeEventListener("mousemove", handleDrag);
    box.removeEventListener("mouseup", handleDragEnd);
  }
  re_start_single(box);
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

}

function TouchStickEnd(e, box, handleTouch, handleTouchEnd){
  console.log("stick end");
  e = e || window.event;
  e.preventDefault();

  box.removeEventListener("touchmove", handleTouch);
  box.removeEventListener("touchup", handleTouchEnd);
  can_change = 1;
  can_move = 0;

}

function stretch(e, box) {
  console.log("stretch");
  if (can_move) {
    e = e || window.event;
    e.preventDefault();
    const finger1 = e.touches[0];
    const finger2 = e.touches[1];
    const fingerDistance = Math.sqrt(Math.pow(finger2.pageX - finger1.pageX, 2) + Math.pow(finger2.pageY - finger1.pageY, 2));
    const boxWidth = box.offsetWidth;
    const boxHeight = box.offsetHeight;
    const boxLeft = box.offsetLeft;
    const boxTop = box.offsetTop;
    const newWidth = Math.max(boxWidth + fingerDistance - initialFingerDistance, 0);
    const newHeight = Math.max(boxHeight + fingerDistance - initialFingerDistance, 0);
    const newLeft = boxLeft - (newWidth - boxWidth) / 2;
    const newTop = boxTop - (newHeight - boxHeight) / 2;
    box.style.width = newWidth + "px";
    box.style.height = newHeight + "px";
    box.style.left = newLeft + "px";
    box.style.top = newTop + "px";
  }
}

function stretchStart(e, box) {
  console.log("stretch start");
  if (can_move) {
    e = e || window.event;
    e.preventDefault();
    initialFingerDistance = Math.sqrt(Math.pow(e.touches[1].pageX - e.touches[0].pageX, 2) + Math.pow(e.touches[1].pageY - e.touches[0].pageY, 2));
    box.addEventListener("touchmove", stretch);
  }
}

function stretchEnd(e, box) {
  console.log("stretch end");
  if (can_move) {
    e = e || window.event;
    e.preventDefault();
    initialFingerDistance = null;
    box.removeEventListener("touchmove", stretch);
  }
}

function addstretchEvent(box) {
  if ('ontouchstart' in window) {
    box.addEventListener("touchstart", (e) => {
      if (e.touches.length === 2) {
        stretchStart(e, box);
      }
    });
    box.addEventListener("touchend", stretchEnd);
  }
}
