//// [callWithSpread3.ts]
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
fs2_(...s_, ...s_); // error         FIXME: bad error message
fs2_(...s_, ...s_, ...s_); // error  FIXME: worse error message
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


//// [callWithSpread3.js]
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// error
fs2.apply(void 0, __spreadArrays(['a'], s2)); // error on ...s2
fs2.apply(void 0, __spreadArrays(['a', 'b', 'c'], s2)); // error on 'c' and ...s2
fs2.apply(void 0, __spreadArrays(['a', 'b'], s2, ['c'])); // error on ...s2 and 'c'
fs2.apply(void 0, __spreadArrays(['a', 'b', 'c'], s2, ['d'])); // error on 'c', ...s2 and 'd'
fs2.apply(void 0, __spreadArrays(s2, ['a'])); // error on 'a'
fs2.apply(void 0, s3); // error on ...s3
fs2_.apply(void 0, s_); // error on ...s_
fs2_.apply(void 0, s2n_); // error on ...s2n_
fs2_.apply(void 0, __spreadArrays(s_, s_)); // error         FIXME: bad error message
fs2_.apply(void 0, __spreadArrays(s_, s_, s_)); // error  FIXME: worse error message
// fs2n_(...s2, ...s_); //           FIXME: should be a type error
fs2n_.apply(void 0, s2_); // error on ...s2_
// ok
fs2_.apply(void 0, s2_);
fs2_.apply(void 0, __spreadArrays(s2_, s_));
fs2_.apply(void 0, __spreadArrays(s2_, s2_));
fs2_.apply(void 0, __spreadArrays(s_, s2_));
fs2n_.apply(void 0, s2n_);
fs2n_.apply(void 0, s2);
// fs2n_(...s2, ...n_); // FIXME: should compile
fs5.apply(void 0, __spreadArrays(s2, ["foo"], s2));
