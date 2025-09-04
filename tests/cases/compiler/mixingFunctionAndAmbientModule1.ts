namespace A {
    declare module My {
        export var x: number;
    }
    function My(s: string) { }
}

namespace B {
    declare module My {
        export var x: number;
    }
    function My(s: boolean);
    function My(s: any) { }
}

namespace C {
    declare module My {
        export var x: number;
    }
    declare function My(s: boolean);
}

namespace D {
    declare module My {
        export var x: number;
    }
    declare function My(s: boolean);
    declare function My(s: any);
}


namespace E {
    declare module My {
        export var x: number;
    }
    declare function My(s: boolean);
    declare module My {
        export var y: number;
    }
    declare function My(s: any);
}
