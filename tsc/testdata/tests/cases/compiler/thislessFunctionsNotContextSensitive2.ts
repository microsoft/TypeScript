// @strict: true
// @target: esnext
// @noEmit: true

interface Options<Context, Data> {
  context: Context;
  produce(this: Context): Data;
  consume(this: Context, data: Data): void;
}

declare function defineOptions<Context, Data>(
  options: Options<Context, Data>,
): [Context, Data];

const result1 = defineOptions({
  context: { tag: "A", value: 1 },
  consume(_data) {},
  produce() {
    return 42;
  },
});

const result2 = defineOptions({
  context: { tag: "B", value: 2 },
  consume(_data) {},
  produce() {
    return this.value;
  },
});

const result3 = defineOptions({
  context: { tag: "C", value: 3 },
  consume(_data) {},
  produce: () => 123,
});

const result4 = defineOptions({
  context: { tag: "D", value: 4 },
  consume(_data) {},
  produce() {
    class Local {
      value = 'foo';
      get() {
        return this.value;
      }
    }
    return new Local().get();;
  },
});

const result5 = defineOptions({
  context: { tag: "E", value: 5 },
  consume(_data) {},
  produce() {
    function inner() {
      return this;
    }
    return inner();
  },
});

const result6 = defineOptions({
  context: { tag: "F", value: 6 },
  consume(_data) {},
  produce() {
    const arrow = () => this.value;
    return arrow();
  },
});

const result7 = defineOptions({
  context: { tag: "G", value: 7 },
  consume(_data) {},
  produce() {
    const self = this;
    function inner() {
      return self.value;
    }
    return inner();
  },
});

const result8 = defineOptions({
  context: { tag: "H", value: 8 },
  consume(_data) {},
  produce: () => {
    return this;
  },
});

const result9 = defineOptions({
  context: { tag: "I", value: 9 },
  consume(_data) {},
  produce() {
    const obj = {
      value: 'foo',
      get() {
        return this.value;
      },
    };
    return obj.get();
  },
});

const result10 = defineOptions({
  context: { tag: "I", value: 9 },
  consume(_data) {},
  produce() {
    interface Foo {
        prop: this;
    }
    return {} as Foo;
  },
});

const result11 = defineOptions({
  context: { tag: "I", value: 9 },
  consume(_data) {},
  produce() {
    function fn(this: { prop: string }) {
      return this.prop;
    }
    return fn;
  },
});
