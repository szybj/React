import React, { Component } from 'react';
import './progressBar.less';
import ReactDOM from "react-dom";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.progressBar = React.createRef();
    this.changeProgress = this.changeProgress.bind(this)
  }
  static defaultProps = {
    progressBarColor: '#2f9842'
  };
  changeProgress(ev) {
    let progressBarDOM = ReactDOM.findDOMNode(this.progressBar.current);
    let customPosition = (ev.clientX - progressBarDOM.getBoundingClientRect().left) / progressBarDOM.clientWidth;
    this.props.onProgressChange && this.props.onProgressChange(customPosition);
    ev.stopPropagation();
    ev.preventDefault();
  }
  render() {
    let styleObj = {};
    styleObj.width = `${this.props.progress}%`;
    styleObj.background = this.props.progressBarColor;
    return (
      <div className="progressBar" ref={this.progressBar} onClick={this.changeProgress}>
        <div className="progress" style={styleObj}></div>
      </div>
    );
  }
}

export default ProgressBar;
