// @target: es2015

class AA {
    #method() { this.x = 10; };
    #method2(a, ...b) {};
    x = 1;
    test() {
        this.#method();
        const func = this.#method;
        func();
        new this.#method();

        const arr = [ 1, 2 ];
        this.#method2(0, ...arr, 3);

        const b = new this.#method2(0, ...arr, 3); //Error 
        const str = this.#method2`head${1}middle${2}tail`;
        this.getInstance().#method2`test${1}and${2}`;

        this.getInstance().#method2(0, ...arr, 3); 
        const b2 = new (this.getInstance().#method2)(0, ...arr, 3); //Error 
        const str2 = this.getInstance().#method2`head${1}middle${2}tail`;
    }
    getInstance() { return new AA(); }
}
