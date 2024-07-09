// @target: es5
module m1 {
    export module m2 {


        export function f1(c1: C1) {
        }
        export function f2(c2: C2) {
        }

        export class C2 implements m3.i3 {
            public get p1(arg) {
                return new C1();
            }

            public set p1(arg1: C1) {
            }

            public f55() {
                return "Hello world";
            }
        }
    }

    export function f2(arg1: { x?: C1, y: number }) {
    }

    export function f3(): {
        (a: number) : C1;
    } {
        return null;
    }

    export function f4(arg1: 
    {
    [number]: C1; // Used to be indexer, now it is a computed property
    }) {
    }


    export function f5(arg2: {
        new (arg1: C1) : C1
    }) {
    }
    module m3 {
        function f2(f1: C1) {
        }

        export interface i3 {
            f55(): string;
        }
    }

    class C1 {
    }

    interface i {
        x: number;
    }

    export class C5 implements i {
        public x: number;
    }

    export var v2: C1[];
}

class C2 {
}

module m2 {
    export module m3 {

        export class c_pr  implements mglo5.i5, mglo5.i6 {
            f1() {
                return "Hello";
            }
        }
        
        module m4 {
            class C {
            }
            module m5 {
                
                export module m6 {
                    function f1() {
                        return new C();
                    }
                }
            }
        }

    }
}

module mglo5 {
    export interface i5 {
        f1(): string;
    }

    interface i6 {
        f6(): number;
    }
}
