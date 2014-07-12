class List<T> {
    data: T;
    next: List<List<T>>;
}

class MyList<T> {
    data: T;
    next: MyList<MyList<T>>;
}

function foo<T>(x: List<T>);
function foo<U>(x: List<U>); // error, duplicate
function foo<T>(x: List<T>) {
}

function foo2<T>(x: List<T>);
function foo2<U>(x: MyList<U>); // ok, nominally compared with first overload
function foo2<T>(x: any) {
}

function other<T extends List<U>, U>() {
    // error but wrong error
    // BUG 838247
    function foo3<V>(x: T);
    function foo3<V>(x: MyList<V>) { }

    // should be error
    // BUG 838247
    function foo4<V>(x: T);
    function foo4<V>(x: List<V>) { }

    // ok
    function foo5<V>(x: T): string;
    function foo5<V>(x: List<V>): number;
    function foo5<V>(x: MyList<V>): boolean;
    function foo5<V>(x: any): any { return null; }

    var list: List<string>;
    var myList: MyList<string>;

    var r = foo5(list);
    var r2 = foo5(myList);
}