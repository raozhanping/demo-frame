const distance = 3

export default function update() {
  const { movers, maxHeight, count, optimizeLevel, resetAnimationBall } = this
  for (let i = 0; i < count; i++) {
    const m = movers[i];
    if (optimizeLevel === '0') {
      resetAnimationBall(m)
      let pos = m.classList.contains("down")
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
    } else if(optimizeLevel === '1') {
      resetAnimationBall(m)
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

  this.frame = window.requestAnimationFrame(this.update);
}
