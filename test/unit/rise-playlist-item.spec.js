import RisePlaylistItem from "../../src/rise-playlist-item";

describe("Example test", () => {
  it("works", () => {
    expect(RisePlaylistItem).toBeDefined();

    const component = new RisePlaylistItem();
    expect(component).toBeDefined();
  });
});
