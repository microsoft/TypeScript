// @strict: true
// @noEmit: true

type HowlErrorCallback = (soundId: number, error: unknown) => void;

interface HowlOptions {
  onplayerror?: HowlErrorCallback | undefined;
}

class Howl {
  constructor(public readonly options: HowlOptions) {}
  once(name: "unlock", fn: () => void) {
    console.log(name, fn);
  }
}

const instance = new Howl({
  onplayerror: () => instance.once("unlock", () => {}),
});

const instance2 = new Howl({
  onplayerror: () => {
    return instance2.once("unlock", () => {});
  },
});
