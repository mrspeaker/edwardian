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
    this.anims = {
      run: [[1,0],[2,0],[3,0],[4,0],[1,1],[2,1],[3,1],[4,1]],
      jump: [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [1, 3]]
    };
    this.anim = "run";
    this.frame.x = 4;
    this.runSpeed = Math.random() * 20 + 80;
  }

  update (dt) {
    var sprite = this;
    sprite._frame += dt;
    if (sprite._frame > this.runSpeed) {
      var frame = sprite.anims[sprite.anim][sprite._frameNum++ % sprite.anims[sprite.anim].length];
      sprite.frame.x = frame[0];
      sprite.frame.y = frame[1];
      sprite._frame -= this.runSpeed;
    }

    if (this.anim === "run") {
      sprite.pos.x += this.runSpeed * 0.0003 * dt;
      if (sprite.pos.x > 640) {
        sprite.pos.x = -16;
      }

      if (Math.random() < 0.01) {
        this.anim = "jump";
        this._frame = 0;
        this._frameNum = 0;
      }
    } else {
      if (this._frameNum === this.anims.jump.length) {
        this.anim = "run";
        this._frame = 0;
        this._frameNum = 0;
      }
    }
  }

}

export default Wib;
