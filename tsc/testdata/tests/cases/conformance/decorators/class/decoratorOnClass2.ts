// @target:es5, es2015
// @module: commonjs
// @experimentaldecorators: true
declare function dec<T>(target: T): T;

@dec
export class C {
}