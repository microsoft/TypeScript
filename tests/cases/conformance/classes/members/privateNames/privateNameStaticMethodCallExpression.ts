// @target: es2015

class AA {
    static #method() { this.x = 10; };
    static #method2(a, ...b) {};
    static x = 1;
    test() {
        AA.#method();
        const func = AA.#method;
        func();
        new AA.#method();

        const arr = [ 1, 2 ];
        AA.#method2(0, ...arr, 3);

        const b = new AA.#method2(0, ...arr, 3); //Error 
        const str = AA.#method2`head${1}middle${2}tail`;
        AA.getClass().#method2`test${1}and${2}`;

        AA.getClass().#method2(0, ...arr, 3); 
        const b2 = new (AA.getClass().#method2)(0, ...arr, 3); //Error 
        const str2 = AA.getClass().#method2`head${1}middle${2}tail`;
    }
    static getClass() { return AA; }
}
