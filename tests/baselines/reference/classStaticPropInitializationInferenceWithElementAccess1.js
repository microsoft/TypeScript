//// [tests/cases/conformance/classes/classStaticBlock/classStaticPropInitializationInferenceWithElementAccess1.ts] ////

//// [classStaticPropInitializationInferenceWithElementAccess1.ts]
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


//// [classStaticPropInitializationInferenceWithElementAccess1.js]
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


//// [classStaticPropInitializationInferenceWithElementAccess1.d.ts]
export declare class Cls1 {
    static x: number[];
    static y: {
        seed: number;
    };
    static z: string;
    static 0: number[];
}
export declare class Cls2 {
    static accessor x: number[];
    static accessor y: {
        seed: number;
    };
    static accessor z: string;
    static accessor 0: number[];
}
export declare class Cls3 {
    static x: number[];
    static y: {
        seed: number;
    };
    static z: string;
    static 0: number[];
}
export declare class Cls4 {
    static accessor x: number[];
    static accessor y: {
        seed: number;
    };
    static accessor z: string;
    static accessor 0: number[];
}
