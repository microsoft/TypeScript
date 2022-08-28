declare function id<T>(x: T): T;
const { f = (x: string) => x.length } = id({ f: x => x.charAt });
