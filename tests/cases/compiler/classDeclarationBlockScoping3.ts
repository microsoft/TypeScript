var c;
function foo() {
    class c { }
    new c();
}

module M {
    class c { }
    new c();
}

function foo2() {
    {
        class c { }
        new c()
    }
}

module M2 {
    {
        class c { }
        new c();
    }
}

function foo3() {
    {
        class c { }
        new c();
        for (var c; ;);
    }
}

module M3 {
    {
        class c { }
        new c();
        for (var c; ;);
    }
}
