import React from "react";
import Sidebar from "./Sidebar";

const {
  Component
} = React;

class App extends Component {

  constructor () {
    super();

    this.state = {
      selected: null,
      running: false
    };
  }

  componentDidMount () {
    const {game} = this.props;
    game.setContainer(this.refs.board);
  }

  onEditorToggle = () => {
    const {game} = this.props;
    const wasRunning = this.state.running;
    this.setState({
      running: !wasRunning
    });

    if (wasRunning) {
      game.stop();
      this.refs.board.focus(); // For keyboard input?
    } else {
      game.start();
    }
    game.render(true);
  };

  onReset = () => {
    const {game} = this.props;
    const {running} = this.state;
    if (running) {
      this.onEditorToggle();
    }
    game.reset();
    game.render(true);
  };

  isRunning = () => this.state.running;

  onControls = e => {
    if (this.isRunning()) return;
    const {game} = this.props;

    switch (e.type) {
    case "click":
      game.setColor();
      game.render(true);
      if (game.scene) {
        this.selectElement(e, game);
      }
      break;
    default:
      //console.log(e.type);
      break;
    }
  };

  selectElement (e, game) {
    //console.log(Object.assign({}, e))
    const {clientX, clientY} = e;
    const selected = game.scene.children[0];
    const type = selected.constructor.name;
    switch (type.toLowerCase()) {
    case "sprite":
      this.setState({
        selected: selected.texture.img.src
      });
      break;
    default:
      console.log("No handling ", type);
    }
  }

  render () {
    const {game} = this.props;
    const {running, selected} = this.state;
    game.render();

    return <div>
      <header></header>

      <div ref={"board"}
        onMouseDown={this.onControls}
        onMouseUp={this.onControls}
        onClick={this.onControls}
        onKeyUp={this.onControls}
        ></div>

      <Sidebar game={game}
        running={running}
        onEditorToggle={this.onEditorToggle}
        onReset={this.onReset}
        selected={selected} />
      
    </div>;
  }
}

export default App;
