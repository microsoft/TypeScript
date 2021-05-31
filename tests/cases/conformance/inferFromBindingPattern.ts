// @strict: true

declare function f1<T extends string>(): T;
declare function f2<T extends string>(): [T];
declare function f3<T extends string>(): { x: T };

let x1 = f1();         // string
let [x2] = f2();       // string
let { x: x3 } = f3();  // string

// Repro from #30379

function foo<T = number>(): [T] {
	return [42 as any]
}
const [x] = foo();  // [number]

// Repro from #35291

interface SelectProps<T, K> {
  selector?: (obj: T) => K;
}

type SelectResult<T, K> = [K, T];

interface Person {
  name: string;
  surname: string;
}

declare function selectJohn<K = Person>(props?: SelectProps<Person, K>): SelectResult<Person, K>;

const [person] = selectJohn();
const [any, whatever] = selectJohn();
const john = selectJohn();
const [personAgain, nufinspecial] = john;

// Repro from #35291

declare function makeTuple<T1>(arg: T1): [T1];
declare function stringy<T = string>(arg?: T): T;

const isStringTuple = makeTuple(stringy());  // [string]
const [isAny] = makeTuple(stringy());  // [string]
