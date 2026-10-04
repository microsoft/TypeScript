// @target:es5, es2015
// @experimentaldecorators: true
declare function dec(): (target: Function, paramIndex: number) => void;

@dec()
class C {
}