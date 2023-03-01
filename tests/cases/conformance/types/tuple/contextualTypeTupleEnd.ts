// @strict: true
// @noEmit: true

type Funcs = [...((arg: number) => void)[], (arg: string) => void];

declare function num(x: number): void;
declare function str(x: string): void;

declare function f1(...args: Funcs): void;

f1();  // Error
f1(x => str(x));
f1(x => num(x), x => str(x));
f1(x => num(x), x => num(x), x => str(x));

const a0: Funcs = [];  // Error
const a1: Funcs = [x => str(x)];
const a2: Funcs = [x => num(x), x => str(x)];
const a3: Funcs = [x => num(x), x => num(x), x => str(x)];

// Repro from #43122

export type Selector<State> = (state: State) => unknown;
export type SelectorTuple<State> = Selector<State>[];

export type ExampleState = {
    foo: "foo";
    bar: 42;
};

export function createSelector<S extends SelectorTuple<ExampleState>>(...selectors: [...selectors: S, f: (x: any) => any]) {
    console.log(selectors);
}

createSelector(
    x => x.foo,
    x => x.bar,
    () => 42
);

// Repro from #43122

declare function example(...args: [...((n: number) => void)[], (x: any) => void]): void

example(
    x => x.foo,  // Error
    x => x.bar,  // Error
    x => x.baz,
);

// Repro from #52846

declare function test(...args: [...((arg: number) => void)[], (arg: string) => void]): void;
  
test(a => a, b => b, c => c);
