declare const s2: [string, string];
declare const s3: [string, string, string];
declare const s2_: [string, string, ...string[]];
declare const s_: string[];
declare const n_: number[];
declare const s2n_: [string, string, ...number[]];

declare function fs2(a: string, b: string): void;
declare function fs2_(a: string, b: string, ...c: string[]): void;
declare function fs2n_(a: string, b: string, ...c: number[]): void;
declare function fs5(a: string, b: string, c: string, d: string, e: string): void;

// error
fs2('a', ...s2); // error on ...s2
fs2('a', 'b', 'c', ...s2); // error on 'c' and ...s2
fs2('a', 'b', ...s2, 'c'); // error on ...s2 and 'c'
fs2('a', 'b', 'c', ...s2, 'd'); // error on 'c', ...s2 and 'd'
fs2(...s2, 'a'); // error on 'a'
fs2(...s3); // error on ...s3
fs2_(...s_); // error on ...s_
fs2_(...s2n_); // error on ...s2n_
fs2_(...s_, ...s_); // error on ...s_
fs2_(...s_, ...s_, ...s_); // error on ...s_
// fs2n_(...s2, ...s_); //           FIXME: should be a type error
fs2n_(...s2_); // error on ...s2_

// ok
fs2_(...s2_);
fs2_(...s2_, ...s_);
fs2_(...s2_, ...s2_);
fs2_(...s_, ...s2_);
fs2n_(...s2n_);
fs2n_(...s2);
// fs2n_(...s2, ...n_); // FIXME: should compile
fs5(...s2, "foo", ...s2);
