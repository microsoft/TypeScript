//@target: ES6
function method<T>(iterable: Iterable<T>): T {
    function inner<U extends Iterable<T>>() {
        var u: U;
        var res: T = method(u);
    }
    return;
}