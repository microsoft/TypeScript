// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/1789

declare function flat<T>(args: T[] | T[][]): void;
type Value = 1 | 2;
declare const n: Value[] | Value[][];
flat(n);

type Box<T> = { value: T };

declare function flat0<T>(args: Box<T> | Box<Box<T>>): void;
declare const arg0: Box<string> | Box<Box<string>>;
flat0(arg0);

declare function flat1<T>(args: Array<T> | Array<Box<T>>): void;
declare const arg1: Array<string> | Array<Box<string>>;
flat1(arg1);

declare function flat2<T>(args: Box<T> | Box<Array<T>>): void;
declare const arg2: Box<string> | Box<Array<string>>;
flat2(arg2);

// https://github.com/oxc-project/tsgolint/issues/1058

interface Column<T> {
  dataIndex?: (T | (string & {}))[]
}

declare function table<T>(rows: readonly T[], columns: Column<T>[]): void

declare const rows: { id: number }[]

table(rows, [{ dataIndex: ['id'] }])
