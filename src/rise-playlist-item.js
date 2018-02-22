/* global gadgets */
import { WebComponent } from 'web-component';
import '../node_modules/gadgets/gadgets.min.js';

@WebComponent('rise-playlist-item', {
  template: require('./rise-playlist-item.html'),
  shadowDOM: true
})

export default class RisePlaylistItem extends HTMLElement {
  constructor() {
    super();
    // eslint-disable-next-line
    this.id = new gadgets.Prefs().getString('id');
    console.log('RisePlaylistItem', this.id);
  }

  connectedCallback() {
    if (this.id && this.id !== '') {
      gadgets.rpc.register('rscmd_play_' + this.id, () => {
        this._play();
      });
      gadgets.rpc.register('rscmd_pause_' + this.id, () => {
        this._pause();
      });
      gadgets.rpc.register('rscmd_stop_' + this.id, () => {
        this._stop();
      });
      gadgets.rpc.register('rsparam_set_' + this.id, (names, values) => {
        this._configure(names, values);
      });

      // only makes the initial call to viewer if content has been add to the slot
      this._handleSlotChange();
    }
  }

  _handleSlotChange() {
    const slots = this.shadowRoot.querySelectorAll('slot');
    slots[0].addEventListener('slotchange', () => {
      gadgets.rpc.call('', 'rsparam_get', null, this.id, [ 'companyId', 'displayId', 'additionalParams' ]);
    });
  }

  _configure(names, values) {
    let additionalParams;
    let companyId = '';
    let displayId = '';

    if (Array.isArray(names) && names.length > 0 && Array.isArray(values) && values.length > 0) {
      // company id
      if (names[0] === 'companyId') {
        companyId = values[0];
      }

      // display id
      if (names[1] === 'displayId') {
        if (values[1]) {
          displayId = values[1];
        } else {
          displayId = 'preview';
        }
      }

      // additional params
      if (names[2] === 'additionalParams') {
        additionalParams = JSON.parse(values[2]);
      }

      this._dispatchEvent('configure', Object.assign({}, {companyId, displayId}, additionalParams));
    }
  }

  _play() {
    this._dispatchEvent('play');
  }

  _pause() {
    this._dispatchEvent('pause');
  }

  _stop() {
    this._dispatchEvent('stop');
  }

  _dispatchEvent(name, detail) {
    const event = new CustomEvent(name, {detail});

    this.dispatchEvent(event);
  }

  callReady() {
    gadgets.rpc.call('', 'rsevent_ready', null, this.id,
      true, true, true, true, true);
  }

  callDone() {
    gadgets.rpc.call('', 'rsevent_done', null, this.id);
  }
}
