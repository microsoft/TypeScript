// @strict: true
// @target: esnext
// @declaration: true

let seed = 0;

export class Cls1 {
  static x;
  static y;
  static z;

  static 0;

  static {
    this["x"] = [seed];
    this["y"] = { seed };
    this["z"] = `${seed}`;

    this[0] = [seed];
  }
}

export class Cls2 {
  static accessor x;
  static accessor y;
  static accessor z;

  static accessor 0;

  static {
    this["x"] = [seed];
    this["y"] = { seed };
    this["z"] = `${seed}`;

    this[0] = [seed];
  }
}

export class Cls3 {
  static x;
  static y;
  static z;

  static 0;

  static {
    (() => {
      this["x"] = [seed];
      this["y"] = { seed };
      this["z"] = `${seed}`;

      this[0] = [seed];
    })();
  }
}

export class Cls4 {
  static accessor x;
  static accessor y;
  static accessor z;

  static accessor 0;

  static {
    (() => {
      this["x"] = [seed];
      this["y"] = { seed };
      this["z"] = `${seed}`;

      this[0] = [seed];
    })();
  }
}
