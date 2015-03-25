// @target:es5
// @module: commonjs
declare function dec<T>(target: T): T;

export
@dec
class C {
}