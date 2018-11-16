
import React, {Component} from 'react';
import MusicListItem from '../component/musicListItem';
class MusicList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let listEle = null;
    listEle = this.props.musicList.map(item => {
      return <MusicListItem focus={item === this.props.currentMusicItem} key={item.id} musicItem={item}/>
    })
    return (
      <ul>
        {listEle}
      </ul>
    );
  }
}

export default MusicList;
