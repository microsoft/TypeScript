// @strict: true
// @target: esnext
// @noEmit: true

interface Effect<A> {
  _A: A;
}
  
declare function effectGen<AEff>(f: () => AEff): Effect<AEff>;

declare function effectFn<AEff, Args extends Array<any>>(
  body: (...args: Args) => unknown,
): (...args: Args) => Effect<AEff>;
  
declare function layerEffect<S>(tag: Tag<S>, effect: Effect<S>): unknown;
  
interface Tag<Type> {
  _Type: Type;
}
  
declare const Foo: Tag<{
  fn: (a: string) => unknown;
}>;
  
layerEffect(
  Foo,
  effectGen(function () {
    return {
      fn: effectFn(function (a) {
        a; // string
      }),
    };
  }),
);
