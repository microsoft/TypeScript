module A {
    declare module My {
        export var x: number;
    }
    function My(s: string) { }
}

module B {
    declare module My {
        export var x: number;
    }
    function My(s: boolean);
    function My(s: any) { }
}

module C {
    declare module My {
        export var x: number;
    }
    declare function My(s: boolean);
}

module D {
    declare module My {
        export var x: number;
    }
    declare function My(s: boolean);
    declare function My(s: any);
}


module E {
    declare module My {
        export var x: number;
    }
    declare function My(s: boolean);
    declare module My {
        export var y: number;
    }
    declare function My(s: any);
}
