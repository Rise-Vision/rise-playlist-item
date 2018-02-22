import '../../node_modules/gadgets/gadgets.min.js';
import RisePlaylistItem from "../../src/rise-playlist-item";

describe("RisePlaylistItem", () => {
  let component = null;
  const id = "test";
  beforeAll(() => {

    gadgets.Prefs.setInternal_("id", id);
    component = new RisePlaylistItem();
    component.shadowRoot = {};
    component.shadowRoot.appendChild = jest.genMockFn();
    component.shadowRoot.querySelectorAll = jest.genMockFn();

    component._handleSlotChange = jest.genMockFn();
    component.connectedCallback();

    component._play = jest.genMockFn();
    component._pause = jest.genMockFn();
    component._stop = jest.genMockFn();
    component._configure = jest.genMockFn();

  });

  it("should have component defined", () => {
    expect(RisePlaylistItem).toBeDefined();
    expect(component).toBeDefined();
  });

  it("should add listener for slotchange", (done) => {
    jest.useFakeTimers();
    setTimeout(()=>{
      expect(component._handleSlotChange).toHaveBeenCalled();
      done();
    }, 1000);
    jest.runAllTimers();
  });

  it("should call configure", (done) => {
    //gadgets.rpc.call('if_' + id, 'rscmd_play_' + id, null);
    jest.useFakeTimers();

    const param = ["companyId", "displayId", "additionalParams"];
    const value = ["companyTest", "displayTest", "{screenName: \"risevision\"}"];
    gadgets.rpc.call(null, 'rsparam_set_' + id, null, param, value);

    setTimeout(()=>{
      expect(component._configure).toHaveBeenCalledWith(param, value);
      done();
    }, 1000);

    jest.runAllTimers();
  });

  it("should call play", (done) => {
    jest.useFakeTimers();

    gadgets.rpc.call(null, 'rscmd_play_' + id, null);

    setTimeout(()=>{
      expect(component._play).toHaveBeenCalled();
      done();
    }, 1000);

    jest.runAllTimers();
  });

  it("should call pause", (done) => {
    jest.useFakeTimers();

    gadgets.rpc.call(null, 'rscmd_pause_' + id, null);

    setTimeout(()=>{
      expect(component._pause).toHaveBeenCalled();
      done();
    }, 1000);

    jest.runAllTimers();
  });

  it("should call stop", (done) => {
    jest.useFakeTimers();

    gadgets.rpc.call(null, 'rscmd_stop_' + id, null);

    setTimeout(()=>{
      expect(component._stop).toHaveBeenCalled();
      done();
    }, 1000);

    jest.runAllTimers();
  });

  it("should call stop", (done) => {
    jest.useFakeTimers();

    gadgets.rpc.call = jest.genMockFn();;

    component.callReady();

    setTimeout(()=>{
      expect(gadgets.rpc.call).toHaveBeenCalledWith("", "rsevent_ready", null, id,
        true, true, true, true, true);
      done();
    }, 1000);

    jest.runAllTimers();
  });

  it("should call stop", (done) => {
    jest.useFakeTimers();

    gadgets.rpc.call = jest.genMockFn();;

    component.callDone();

    setTimeout(()=>{
      expect(gadgets.rpc.call).toHaveBeenCalledWith("", "rsevent_done", null, id);
      done();
    }, 1000);

    jest.runAllTimers();
  });

  describe("RisePlaylistItem slotchange", () => {
    const slot = {
      addEventListener: jest.genMockFn()
    };
    beforeAll(() => {

      gadgets.Prefs.setInternal_("id", id);
      component = new RisePlaylistItem();
      component.shadowRoot = {};
      component.shadowRoot.appendChild = jest.genMockFn();
      component.shadowRoot.querySelectorAll = jest.fn().mockReturnValue([slot]);

    });

    it("should add slotchange event listener", (done) => {
      jest.useFakeTimers();
      component._handleSlotChange();
      setTimeout(()=>{
        expect(component.shadowRoot.querySelectorAll).toHaveBeenCalledWith("slot");
        expect(slot.addEventListener).toHaveBeenCalledWith("slotchange", expect.any(Function));
        done();
      }, 1000);
      jest.runAllTimers();
    });
  });

});
