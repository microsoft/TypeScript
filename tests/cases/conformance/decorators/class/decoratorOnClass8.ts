// @target:es5
declare function dec(): (target: Function, paramIndex: number) => void;

@dec()
class C {
}