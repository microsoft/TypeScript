// @target: es2015

class A {
    get #fieldFunc() {  return function() { this.x = 10; } }
    get #fieldFunc2() { return  function(a, ...b) {}; }
    x = 1;
    test() {
        this.#fieldFunc();
        const func = this.#fieldFunc;
        func();
        new this.#fieldFunc();

        const arr = [ 1, 2 ];
        this.#fieldFunc2(0, ...arr, 3);
        const b = new this.#fieldFunc2(0, ...arr, 3);
        const str = this.#fieldFunc2`head${1}middle${2}tail`;
        this.getInstance().#fieldFunc2`test${1}and${2}`;
    }
    getInstance() { return new A(); }
}