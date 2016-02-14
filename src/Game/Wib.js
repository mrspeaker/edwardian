import pop from "pop";
import env from "./env";

const {
  TileSprite,
  Texture
} = pop;

class Wib extends TileSprite {
  constructor () {
    super(new Texture(env.baseURL + "/res/eball.png"), 16, 16);

    this._frame = 0;
    this._frameNum = 0;
    this._frames = [[1,0],[2,0],[3,0],[4,0],[1,1],[2,1],[3,1],[4,1]];
    this.frame.x = 4;
    this.runSpeed = Math.random() * 20 + 80;
  }

  update (dt) {
    var sprite = this;
    sprite._frame += dt;
    if (sprite._frame > this.runSpeed) {
      var frame = sprite._frames[sprite._frameNum++ % sprite._frames.length];
      sprite.frame.x = frame[0];
      sprite.frame.y = frame[1];
      sprite._frame -= this.runSpeed;
    }
    sprite.pos.x += this.runSpeed * 0.0003 * dt;
    if (sprite.pos.x > 640) {
      sprite.pos.x = -16;
    }
  }
}

export default Wib;
