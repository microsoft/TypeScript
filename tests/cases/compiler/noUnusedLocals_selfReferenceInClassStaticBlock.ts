// @strict: true
// @target: esnext
// @noUnusedLocals: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57620

let BluethootDevice_create;
class BluethootDevice {
  #id!: string;

  static #allowConstruct = false;

  private constructor() {
    if (!BluethootDevice.#allowConstruct) {
      throw new Error("You cannot instantiate this class directly");
    }
  }

  static {
    BluethootDevice_create = (id: string) => {
      BluethootDevice.#allowConstruct = true;
      const device = new BluethootDevice();
      BluethootDevice.#allowConstruct = false;
      device.#id = id;
      return device;
    };
  }

  get id() {
    return this.#id;
  }
}

BluethootDevice_create("aa");

export {};
