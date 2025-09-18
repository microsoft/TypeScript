// @strict: true
// @target: esnext
// @noEmit: true

const obj1: {
  prop:
    | string
    | {
        a: string;
      }
    | [];
} = {
  prop: {
    a: 1,
  },
};

type WithCallSignature = {
    (): void;
    a: boolean;
}

const obj2: {
  prop:
    | WithCallSignature
    | {
        a: string;
      };
} = {
  prop: {
    a: 1,
  },
};

class ClsWithPrivateModifier {
  a = true
  private b = 10;
}

const obj3: {
  prop:
    | ClsWithPrivateModifier
    | {
        a: string;
      };
} = {
  prop: {
    a: 1,
  },
};

class ClsWithPrivateField {
  a = true
  #b = 10;
}

const obj4: {
  prop:
    | ClsWithPrivateField
    | {
        a: string;
      };
} = {
  prop: {
    a: 1,
  },
};

const obj5: {
  prop:
    | (ClsWithPrivateField & { c: string })
    | {
        a: string;
      };
} = {
  prop: {
    a: 1,
  },
};

const obj6: {
  prop:
    | {
        type: "foo";
        prop: string;
      }
    | {
        type: "bar";
        prop: number;
      };
} = {
  prop: {
    type: "foo",
    prop: true,
  },
};

const obj7: {
  prop:
    | {
        type: "foo";
        prop: string;
      }
    | {
        type: "bar";
        prop: number;
      };
} = {
  prop: {
    type: "foo",
    prop: 42,
  },
};
