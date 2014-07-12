module Foo {
    class Bar {
        private f() {
            var a:any[] = [[1, 2], [3, 4], 5];
            return ((1 + 1));
        }
        
        private f2() {
            if(true) { }{ };
        }
    }
}


// {    }
// (    )
// [    ]
// <    >

class TemplateTest <T1, T2 extends Array> {
    public foo(a, b) {
        return <any> a;
    }
    public bar(a, b) {
        return a < b || a > b;
    }
}