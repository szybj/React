import $ from 'jquery';
import jPlayer from 'jplayer';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import Pubsub from 'pubsub-js';
import Header from './component/header';
import Player from './page/player';
import MusicList from './page/musicList';
import {MUSIC_LIST} from './config/musicList'
class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[4]
    }
  }
  componentDidMount() {
    $('#player').jPlayer({
      ready () {
        $(this).jPlayer('setMedia',{
          mp3: 'http://pg6m9fbfp.bkt.clouddn.com/4ca6614529370c9b331577d6347b697c2.mp3'
        }).jPlayer('play');
      },
      supplied: 'mp3',
      wmode: 'window'
    });
    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {

    });
    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter(item => {
          return item !== musicItem
        })
      })
    })
  }
  componentWillUnmount() {
    Pubsub.unsubscribe('PLAY_MUSIC');
    Pubsub.unsubscribe('DELETE_MUSIC');
  }
  render() {
    return (
      <div>
        <Header />
        <HashRouter>
          <Switch>
            <Route exact path="/" render={() => (
              <Player  currentMusicItem={this.state.currentMusicItem}/>
            )} />
            <Route path="/musicList" render={() => (
              <MusicList
                currentMusicItem={this.state.currentMusicItem}
                musicList={this.state.musicList}
              />
            )}/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default Root;
