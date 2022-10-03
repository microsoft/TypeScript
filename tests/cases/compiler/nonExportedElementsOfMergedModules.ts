module One {
    enum A { X }
    module B {
        export var x;
    }
}

module One {
    enum A { Y }
    module B {
        export var y;
    }
    B.x;
    B.y;
}
