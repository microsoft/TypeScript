namespace A {
    declare namespace My {
        export var x: number;
    }
    function My(s: string) { }
}

namespace B {
    declare namespace My {
        export var x: number;
    }
    function My(s: boolean);
    function My(s: any) { }
}

namespace C {
    declare namespace My {
        export var x: number;
    }
    declare function My(s: boolean);
}

namespace D {
    declare namespace My {
        export var x: number;
    }
    declare function My(s: boolean);
    declare function My(s: any);
}


namespace E {
    declare namespace My {
        export var x: number;
    }
    declare function My(s: boolean);
    declare namespace My {
        export var y: number;
    }
    declare function My(s: any);
}
