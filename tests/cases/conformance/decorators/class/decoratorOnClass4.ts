// @target:es5
declare function dec(): <T>(target: T) => T;

@dec()
class C {
}