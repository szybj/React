
import React, {Component} from 'react';
import './musicListItem.less';
import Pubsub from 'pubsub-js';
class MusicListItem extends Component {
  constructor(props) {
    super(props);
  }
  playMusic(musicItem, ev) {
    Pubsub.publish('PLAY_MUSIC', musicItem);
    ev.stopPropagation();
    ev.preventDefault();
  }
  deleteMusic(musicItem, ev) {
    Pubsub.publish('DELETE_MUSIC', musicItem);
    ev.stopPropagation();
    ev.preventDefault();
  }
  render() {
    let musicItem = this.props.musicItem;
    return (
      <li onClick={this.playMusic.bind(this, musicItem)} className={`musiclistitem row${this.props.focus ? ' focus' : ''}`}>
        <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
        <p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
      </li>
    );
  }
}

export default MusicListItem;
