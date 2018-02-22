import '../../node_modules/gadgets/gadgets.min.js';
import RisePlaylistItem from "../../src/rise-playlist-item";

describe("Example test", () => {
  let component = null;
  const id = "test";
  beforeAll(() => {
    const slot = {
      addEventListener: jest.genMockFn()
    }
    gadgets.Prefs.setInternal_("id", id);
    component = new RisePlaylistItem();
    component.shadowRoot = {};
    component.shadowRoot.appendChild = jest.genMockFn();
    component.shadowRoot.querySelectorAll = jest.fn();
    component.shadowRoot.querySelectorAll.mockReturnValue([slot]);

    component.connectedCallback();

    component._play = jest.genMockFn();
    component._pause = jest.genMockFn();
    component._stop = jest.genMockFn();
    component._configure = jest.genMockFn();
    component._handleSlotChange = jest.genMockFn();

  });

  it("should have component defined", () => {
    expect(RisePlaylistItem).toBeDefined();
    expect(component).toBeDefined();
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
});
