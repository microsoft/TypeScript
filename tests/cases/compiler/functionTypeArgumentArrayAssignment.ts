// @target: es2015
namespace test {
    interface Array<T> {
        foo: T;
        length: number;
    }

    function map<U>() {
        var ys: U[] = [];
    }
}
