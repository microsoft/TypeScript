// @target:es5
// @experimentaldecorators: true
// https://github.com/Microsoft/TypeScript/issues/28603
type T = number;
type U = number;
declare function decorator(fn: (param: T) => T): any;

@decorator((param: T) => param)
class C<T> {
    @decorator((param: U) => param)
    method<U>() {}
}