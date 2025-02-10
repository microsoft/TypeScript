// @strict: true
// @target: esnext
// @noEmit: true

class Foo {
  #foo = "foo";
  doStuff(cb: (arg: string) => void) {}
}

interface FooLike {
  doStuff: (cb: (arg: number) => void) => void;
}

declare function useIt(arg: Foo | FooLike): void;

useIt({
  doStuff: (arg) => {},
});

declare function useIt2(arg: Foo): void;

useIt2({
  doStuff: (arg) => {},
});

declare function useIt3(arg: FooLike): void;

useIt3({
  doStuff: (arg) => {},
});
