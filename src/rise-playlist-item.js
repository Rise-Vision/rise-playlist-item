import { WebComponent } from 'web-component';

@WebComponent('rise-playlist-item', {
  template: require('./rise-playlist-item.html'),
  shadowDOM: true
})

export default class RisePlaylistItem extends HTMLElement {
  constructor() {
    super();
    console.log('RisePlaylistItem');
  }
}
