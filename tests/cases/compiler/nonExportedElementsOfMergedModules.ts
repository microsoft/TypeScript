namespace One {
    enum A { X }
    namespace B {
        export var x;
    }
}

namespace One {
    enum A { Y }
    namespace B {
        export var y;
    }
    B.x;
    B.y;
}
