type Boxified<T> = { [P in keyof T]: { value: T[P]} };

declare function unboxify<T>(obj: Boxified<T>): T;

function foo<U, V>(obj: { u: { value: U }, v: { value: V } }) {
    return unboxify(obj);
}

let qq = foo({ u: { value: 10 }, v: { value: 'hello'} });  // { u: U, v: V } but should be { u: number, v: string }

// From #42385
interface Targets<A> {
    left: A
    right: A
}
type Target = keyof Targets<any>
type Result<F extends Target, A> = Targets<A>[F]

type LR<F extends Target, L, R> = [F] extends ["left"] ? L : R

interface Ops<F extends Target> {
    _f: F
    str: Result<F, string>
    num: Result<F, number>
    lr<I, O>(a: Result<F, I>, o: Result<F, O>): Result<F, LR<F, I, O>>
    dict: <P>(p: {[k in keyof P]: Result<F, P[k]>}) => Result<F, P>
}
const left: Ops<"left"> = {} as any
const right: Ops<"right"> = {} as any

const ok = <F extends Target>(at: Ops<F>) => ({lr: at.lr(at.str, at.num)})
const orphaned = <F extends Target>(at: Ops<F>) => at.dict(ok(at))

const leftOk = ok(left)
const leftOrphaned = orphaned(left)

const rightOk = ok(right)
const rightOrphaned = orphaned(right)