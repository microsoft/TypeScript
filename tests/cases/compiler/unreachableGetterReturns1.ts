// @strict: true
// @noEmit: true

declare function assert(cond: unknown): asserts cond;

const obj1 = {
  get prop() {
    assert(false);
  },
};

const obj2 = {
  get prop(): never {
    assert(false);
  },
};

const obj3 = {
  get prop() {
    if (Math.random()) {
      assert(false);
    }
    return 42;
  },
};

type Obj = { prop: number };

const obj4: Obj = {
  get prop() {
    assert(false);
  },
};

const obj5: Obj = {
  get prop(): never {
    assert(false);
  },
};

const obj6: Obj = {
  get prop() {
    if (Math.random()) {
      assert(false);
    }
    return 42;
  },
};
