const pop = require("pop");
const {
  CanvasRenderer,
  Container,
  Texture,
  Sprite
} = pop;

const baseURL = "/src/Game";

class Game {

  constructor () {
    this.reset();
    this.loopy();
    this.handlers = {};
  }

  loadGame () { }

  addHandlers () { }

  removeHandlers () { }

  reset () {
    this.running = false;
    this.removeHandlers();

    this.x = 0;
    this.y = 50;
    this.size = 10;
    this.setColor();

    this.sprite = new Sprite(new Texture(baseURL + "/res/tennis_ball.png"));

    this.addHandlers();
  }

  setColor () {
    this.color = `hsl(${Math.random() * 360 | 0}, 50%, 50%)`;
  }

  loopy = (t) => {
    requestAnimationFrame(this.loopy);
    if (!this.time) this.time = t;
    const dt = t - this.time;
    if (this.running) {
      this.tick(dt, t);
      this.render();
    }
    this.time = t;
  };

  start () {
    this.running = true;
    this.addHandlers();
  }

  stop () {
    this.running = false;
    this.removeHandlers();
  }

  setContainer (container) {
    if (!this.renderer) {
      this.renderer = new CanvasRenderer(640, 300);
      container.appendChild(this.renderer.view);
      this.ctx = this.renderer.ctx;
      this.scene = new Container();
      this.scene.add(this.sprite);
    } else {
      // move to container?
    }
  }

  tick (dt, t) {
    if (!this.running) {
      return;
    }
    this.time = t;
    this.x += dt * 0.01;
    this.sprite.pos.x += Math.sin(t / 1000);
  }

  render (force) {
    if (force) {}
    else if(!this.running || !this.renderer) {
      return;
    }
    const {ctx} = this;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.renderer.render(this.scene);

    ctx.fillStyle = this.color;
    ctx.fillText(this.time, 20, 20);
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

export default Game;
