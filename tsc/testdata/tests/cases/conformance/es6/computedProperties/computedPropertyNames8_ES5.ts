// @target: es5, es2015
function f<T, U extends string>() {
    var t!: T;
    var u!: U;
    var v = {
        [t]: 0,
        [u]: 1
    };
}