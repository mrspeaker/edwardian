import pop from "pop";
import env from "./env";
import Wib from "./Wib";

const {
  CanvasRenderer,
  Container,
  Texture,
  TileSprite
} = pop;


class Game {

  constructor () {
    this.renderer = new CanvasRenderer(640, 300);
    this.ctx = this.renderer.ctx;
    this.scene = new Container();

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

    this.scene && this.scene.children.forEach(c => {
      this.scene.remove(c);
    });

    this.sprite = new Wib();
    this.sprite.pos.y = 50;
    this.sprite.scale.x = 2;
    this.sprite.scale.y = 2;

    this.scene.add(this.sprite);

    for (var i = 0; i < 100; i++) {
      const w = new Wib();
      w.pos.x = -50 - Math.random() * 640 | 0;
      w.pos.y = Math.random() * 300 | 0;
      this.scene.add(w);
    }

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
    container.appendChild(this.renderer.view);
  }

  tick (dt, t) {
    if (!this.running) {
      return;
    }

    this.time = t;
    this.x += dt * 0.01;

    var sprite = this.sprite;
    sprite.pos.x += Math.sin(t / 1000) * 0.5;
    //sprite.pos.x = Math.max(0, sprite.pos.x);

    this.scene.update(dt);

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
