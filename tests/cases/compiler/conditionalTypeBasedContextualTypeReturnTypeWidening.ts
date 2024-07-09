declare function useState1<S>(initialState: (S extends (() => any) ? never : S) | (() => S)): S; // No args
declare function useState2<S>(initialState: (S extends ((...args: any[]) => any) ? never : S) | (() => S)): S; // Any args

const func1 = useState1(() => () => 0);
const func2 = useState2(() => () => 0);

declare function useState3<S, T extends S>(initialState: (T extends (() => any) ? never : T) | (() => S)): S; // No args
declare function useState4<S, T extends S>(initialState: (T extends ((...args: any[]) => any) ? never : T) | (() => S)): S; // Any args

const func3 = useState1(() => () => 0);
const func4 = useState2(() => () => 0);
