declare function filter<S>(f: (this: void, x: any) => x is S): S[];
const numbers = filter<number>((x): x is number => 'number' == typeof x)
