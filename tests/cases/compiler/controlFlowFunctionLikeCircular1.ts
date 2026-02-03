// @strict: true
// @noEmit: true

// @filename: controlFlowFunctionLikeCircular_1.ts
unionOfDifferentReturnType1(true);
const unionOfDifferentReturnType1: { (a: any): number; } | { (a: number): typeof Date; };

// @filename: controlFlowFunctionLikeCircular_2.ts
unionOfDifferentReturnType1(true);
const unionOfDifferentReturnType1 = Math.random() ? (a: any) => 1 : (a: number) => ({}) as typeof Date;

// @filename: controlFlowFunctionLikeCircular_3.ts
function test(arg: () => string) {
  fn();
  const fn: typeof fn = Math.random() ? arg : (): (() => arg) => {};
}

// @filename: controlFlowFunctionLikeCircular_4.ts
function test(arg: () => string) {
  fn();
  const fn = Math.random() ? arg : (): (() => arg) => {};
}

// @filename: controlFlowFunctionLikeCircular_5.ts
function test(arg: string | number) {
  if (typeof arg === "string") {
    fn();
    const fn: () => typeof arg = () => arg;
    return fn;
  }
  return undefined;
}

// @filename: controlFlowFunctionLikeCircular_6.ts
function test(arg: string | number) {
  if (typeof arg === "string") {
    fn();
    const fn = (): typeof arg => arg;
    return fn;
  }
  return undefined;
}

// @filename: controlFlowFunctionLikeCircular_7.ts
function test(arg: string | number) {
  if (typeof arg === "string") {
    fn();
    const fn: { (): typeof arg } = () => arg;
    return fn;
  }
  return undefined;
}

// @filename: controlFlowFunctionLikeCircular_8.ts
function test(arg: string | number, whatever: any) {
  if (typeof arg === "string") {
    b();
    type First = typeof arg;
    type Test = (arg: unknown) => arg is First;
    const b: Test = whatever;
    return b;
  }
  return undefined;
}

// @filename: controlFlowFunctionLikeCircular_9.ts
function test(arg: string | number, whatever: any) {
  if (typeof arg === "string") {
    o.x();
    const o: { [k: string]: () => typeof arg; x: (() => typeof Date) | (() => void) } = whatever
    return o.x;
  }
  return undefined;
}

// @filename: controlFlowFunctionLikeCircular_10.ts
function test(arg: string | number, whatever: any) {
  if (typeof arg === "string") {
    o.foo();
    const o: { [k: string]: () => typeof arg } = whatever
    return o.foo;
  }
  return undefined;
}
