import $ from 'jquery';
import jPlayer from 'jplayer';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../component/progressBar';
import './player.less';
let duration = null;
class Player extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.state = {
      volume: 0,
      progress: 0,
      isPlay: true
    }
  }
  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, e => {
      duration = e.jPlayer.status.duration;
      this.setState({
        // 播放时间
        // progress: e.jPlayer.status.currentTime
        // 播放进度
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100
      })
    });
  }
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }
  progressChangeHandler(progress) {
    $('#player').jPlayer('play', duration * progress);
  }
  volumeChangeHandler(progress) {
    $('#player').jPlayer('volume', progress);
  }
  play(ev) {
    if (this.state.isPlay) {
      $('#player').jPlayer('pause')
    } else {
      $('#player').jPlayer('play')
    }
    this.setState({
      isPlay: !this.state.isPlay
    });
    ev.stopPropagation();
    ev.preventDefault();
  }
  render() {
    return (
      <div className="player">
        <h1 className="caption"><Link to="/musicList">我的私人音乐坊 &gt;</Link></h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
            <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
            <div className="row mt20">
              <div className="left-time -col-auto">-{this.state.leftTime}</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                <div className="volume-wrapper">
                  <ProgressBar
                    progress={this.state.volume}
                    onProgressChange={this.volumeChangeHandler}
                    progressBarColor="#999"
                  >
                  </ProgressBar>
                </div>
              </div>
            </div>
            <div style={{height: 10, lineHeight: '10px'}}>
              <ProgressBar
                progress = {this.state.progress}
                onProgressChange={this.progressChangeHandler}
              />
            </div>
            <div className="mt35 row">
              <div>
                <i className="icon prev" onClick={this.prev}></i>
                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
                <i className="icon next ml20" onClick={this.next}></i>
              </div>
              <div className="-col-auto">
                <i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
              </div>
            </div>
          </div>
          <div className="-col-auto cover">
            <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
