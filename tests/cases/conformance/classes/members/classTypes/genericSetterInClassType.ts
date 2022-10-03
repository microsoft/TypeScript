// @target: esnext

module Generic {
    class C<T> {
        get y(): T {
            return 1 as never;
        }
        set y(v) { }
    }

    var c = new C<number>();
    c.y = c.y;

    class Box<T> {
        #value!: T;
        
        get value() {
            return this.#value;
        }
    
        set value(value) {
            this.#value = value;
        }
    }
    
    new Box<number>().value = 3;
}