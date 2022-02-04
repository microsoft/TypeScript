// @strict: true
// @declaration: true

type A = { kind: 'a' };
type B = { kind: 'b' };

declare const a: A;
declare const b: B;

declare function fab(arg: A | B): void;

declare function foo<T>(x: { kind: T }, f: (arg: { kind: T }) => void): void;

foo(a, fab);
foo(b, fab);

// Repro from #45603

interface Action<TName extends string,TPayload> {
    name: TName,
    payload: TPayload
}

const actionA = { payload: 'any-string' } as Action<'ACTION_A', string>;
const actionB = { payload: true } as Action<'ACTION_B', boolean>;

function call<TName extends string,TPayload>(
  action: Action<TName,TPayload>,
  fn: (action: Action<TName,TPayload>)=> any,
) {
  fn(action);
}

const printFn = (action: typeof actionA | typeof actionB)=> console.log(action);

call(actionA, printFn);
call(actionB, printFn);
