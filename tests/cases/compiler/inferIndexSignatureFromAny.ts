declare function f<T>(x: { [key: string]: T }): T;
const a = f(<any>null);
