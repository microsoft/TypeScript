module Foo {

    class Bar {

        private foo:string = "";

        private f() {
            var a:any[] = [[1, 2], [3, 4], 5];

            return ((1 + 1));
        }

        private f2() {
            if(true) { }{ };
        }
    }

    interface Foo {

        x:number;

        foo():number;

    }

    module Foo2 {

        function f() {
        }

        var x: number;

    }

    enum Foo3 {

        val1,

        val2,

    }

}

function foo(bar,
             blah,

);


function test() {
    for (var i = 0; i < 10; i++) {

    }

    for (var e in foo.bar) {

    }

    with (foo.bar) {

    }

    switch(foo.bar) {

    }

    switch (foo.bar) {

        case 1:

            break;

    }

}

function tryCatch() {

    try {

    }

    catch(err) {

    }

}


function tryFinally() {

    try {

    }

    finally {

    }

}

function tryCatchFinally() {

    try {

    }

    catch(err) {

    }

    finally {

    }

}


module SwitchTest {
    var a = 3;

    if (a == 5) {
        switch (a) {
            case 1:
                if (a == 5) {

                }
                break;
        }
    }
}