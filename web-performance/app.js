const app = {}
const proto = document.querySelector('.proto')
const animationStage = document.querySelector('.stage')
let stageSize = animationStage.getBoundingClientRect()
let ballSize = proto.getBoundingClientRect()
let maxHeight = Math.floor(stageSize.height - ballSize.height)
const maxWidth = 87 // 100vw - width of square (3vw)
const incrementor = 10
const distance = 3
const minimum = 10
const subtract = document.querySelector(".subtract")
const add = document.querySelector(".add")

let movers, frame

app.optimizeLevel = '0';
app.count = minimum;
app.enableApp = true;

app.init = function() {
  if (movers) {
    stageSize = animationStage.getBoundingClientRect();
    for (var i = 0; i < movers.length; i++) {
      animationStage.removeChild(movers[i]);
    }
    animationStage.appendChild(proto);
    ballSize = proto.getBoundingClientRect();
    animationStage.removeChild(proto);
    maxHeight = Math.floor(stageSize.height - ballSize.height);
  }
  for (var i = 0; i < app.count; i++) {
    var m = proto.cloneNode();
    var top = Math.floor(Math.random() * maxHeight);
    if (top === maxHeight) {
      m.classList.add("up");
    } else {
      m.classList.add("down");
    }
    m.style.left = i / (app.count / maxWidth) + "vw";
    m.style.top = top + "px";
    m._top = top
    animationStage.appendChild(m);
  }
  movers = document.querySelectorAll(".mover");
};

app.update = function(timestamp) {
  for (var i = 0; i < app.count; i++) {
    var m = movers[i];
    // badly
    if (app.optimizeLevel === '0') {
      app.clearOptimize3(m)
      var pos = m.classList.contains("down")
        ? m.offsetTop + distance
        : m.offsetTop - distance;
      if (pos < 0) pos = 0;
      if (pos > maxHeight) pos = maxHeight;
      m._top = pos
      m.style.top = pos + "px";
      if (m.offsetTop === 0) {
        m.classList.remove("up");
        m.classList.add("down");
      }
      if (m.offsetTop === maxHeight) {
        m.classList.remove("down");
        m.classList.add("up");
      }
    } else if(app.optimizeLevel === '1') {
      app.clearOptimize3(m)
      let pos = parseInt(m._top);
      m.classList.contains("down") ? (pos += distance) : (pos -= distance);
      if (pos < 0) pos = 0;
      if (pos > maxHeight) pos = maxHeight;
        m._top = pos
        m.style.top = pos + "px";
      if (pos === 0) {
        m.classList.remove("up");
        m.classList.add("down");
      }
      if (pos === maxHeight) {
        m.classList.remove("down");
        m.classList.add("up");
      }
    } else {
      let pos = parseInt(m._top);
      m.classList.contains("down") ? (pos += distance) : (pos -= distance);
      if (pos < 0) pos = 0;
      if (pos > maxHeight) pos = maxHeight;
      m._top = pos
      m.style.transform = `translateY(${pos - m.style.top.slice(0, -2)}px)`
      if (pos === 0) {
        m.classList.remove("up");
        m.classList.add("down");
      }
      if (pos === maxHeight) {
        m.classList.remove("down");
        m.classList.add("up");
      }
    }
  }
  frame = window.requestAnimationFrame(app.update);
};

app.clearOptimize3 = function(mover) {
  mover.style.transform = ''
}

document.querySelector(".stop").addEventListener("click", function(e) {
  if (app.enableApp) {
    cancelAnimationFrame(frame);
    e.target.textContent = "Start";
    app.enableApp = false;
  } else {
    frame = window.requestAnimationFrame(app.update);
    e.target.textContent = "Stop";
    app.enableApp = true;
  }
});

document.querySelector(".optimize").addEventListener("click", function(e) {
  app.optimizeLevel = e.target.dataset.level;
  document.querySelector('button.active').classList.remove('active')
  e.target.classList.add('active')
});

add.addEventListener("click", function(e) {
  cancelAnimationFrame(frame);
  app.count += incrementor;
  subtract.disabled = false;
  app.init();
  frame = requestAnimationFrame(app.update);
});

subtract.addEventListener("click", function() {
  cancelAnimationFrame(frame);
  app.count -= incrementor;
  app.init();
  frame = requestAnimationFrame(app.update);
  if (app.count === minimum) {
    subtract.disabled = true;
  }
});

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

var onResize = debounce(function() {
  if (app.enableApp) {
    cancelAnimationFrame(frame);
    app.init();
    frame = requestAnimationFrame(app.update);
  }
}, 500);

window.addEventListener("resize", onResize);

add.textContent = "Add " + incrementor;
subtract.textContent = "Subtract " + incrementor;
document.body.removeChild(proto);
proto.classList.remove(".proto");
app.init();
window.app = app;
frame = window.requestAnimationFrame(app.update);
