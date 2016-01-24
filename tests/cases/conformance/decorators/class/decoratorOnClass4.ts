// @target:es5
// @experimentaldecorators: true
declare function dec(): <T>(target: T) => T;

@dec()
class C {
}