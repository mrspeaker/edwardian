const React = require("react");
const {
  Component
} = React;

class Sidebar extends Component {
  render () {
    const {running, onEditorToggle, onReset} = this.props;

    return <sidebar>
      <div>
        <div>{running}</div>
        <button onClick={onEditorToggle}>{running ? "Edit" : "Run"}</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </sidebar>;
  }

}

export default Sidebar;
