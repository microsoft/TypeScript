//// [tests/cases/conformance/classes/members/classTypes/genericSetterInClassType.ts] ////

//// [genericSetterInClassType.ts]
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

//// [genericSetterInClassType.js]
var Generic;
(function (Generic) {
    class C {
        get y() {
            return 1;
        }
        set y(v) { }
    }
    var c = new C();
    c.y = c.y;
    class Box {
        #value;
        get value() {
            return this.#value;
        }
        set value(value) {
            this.#value = value;
        }
    }
    new Box().value = 3;
})(Generic || (Generic = {}));
