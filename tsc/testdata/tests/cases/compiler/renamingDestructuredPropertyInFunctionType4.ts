// @noEmit: true
// @noTypesAndSymbols: true
const f0: <A>({a: A}: {a: A}) => void = () => {};
const f1: ({a: A}: {a: number}) => void = () => {};

type F1 = <A>({ a: A }: { a: A }) => A;
type F2 = <A>({ a: A }: { a: A }) => typeof A;
type F3 = <A>({ a: A }: { a: A }) => <A>(value: A) => A;
type F4 = <A>({ a: A }: { a: A }) => <A>(value: A) => typeof A;
type F5 = new <A>({ a: A }: { a: A }) => A;

function f2<A>({ a: A }: { a: A }) { return A; }
function f3<A>({ a: A }: { a: A }): A { return null!; }
