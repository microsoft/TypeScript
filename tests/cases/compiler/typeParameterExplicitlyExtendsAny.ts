function fee<T>() {
    var t: T;
    t.blah; // Error
    t.toString; // ok
}

function fee2<T extends any>() {
    var t: T;
    t.blah; // ok
    t.toString; // ok
}

function f<T extends any>(x: T) {
    x.children;
    x();
    new x();
    x[100];
    x['hello'];
}


// Generic Tree structure
type Tree<T> = T & {
    children?: Tree<T>[];
}

class MyClass {
    public static displayTree1<T extends Tree<any>>(tree: T) {
        // error "Property 'children' does not exist on type 'T'"
        tree.children;
    }
}
