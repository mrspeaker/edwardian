import React from "react";
import Sidebar from "./Sidebar";

const {
  Component
} = React;

class App extends Component {

  constructor () {
    super();

    this.state = {
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
      break;
    default:
      //console.log(e.type);
      break;
    }
  };

  render () {
    const {game} = this.props;
    const {running} = this.state;

    game.render();

    return <div>
      <header></header>

      <Sidebar game={game}
        running={running}
        onEditorToggle={this.onEditorToggle}
        onReset={this.onReset} />

      <div ref={"board"}
        onMouseDown={this.onControls}
        onMouseUp={this.onControls}
        onClick={this.onControls}
        onKeyUp={this.onControls}
        ></div>
    </div>;
  }
}

export default App;
