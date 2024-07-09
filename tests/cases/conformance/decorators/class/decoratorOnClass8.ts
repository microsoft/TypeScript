// @target:es5
// @experimentaldecorators: true
declare function dec(): (target: Function, paramIndex: number) => void;

@dec()
class C {
}