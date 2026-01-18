// all expected to be errors

class clodule1<T>{

    id: string;
    value: T;
}

namespace clodule1 {
    function f(x: T) { }
}

class clodule2<T>{

    id: string;
    value: T;
}

namespace clodule2 {
    var x: T;

    class D<U extends T>{
        id: string;
        value: U;
    }
}

class clodule3<T>{

    id: string;
    value: T;
}

namespace clodule3 {
    export var y = { id: T };
}

class clodule4<T>{

    id: string;
    value: T;
}

namespace clodule4 {
    class D {
        name: T;
    }
}
