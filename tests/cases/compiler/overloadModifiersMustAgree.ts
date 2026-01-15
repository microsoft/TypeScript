//@module: commonjs
class baz {
    public foo();
    private foo(bar?: any) { } // error - access modifiers do not agree
}

declare function bar();
export function bar(s: string);
function bar(s?: string) { }

interface I {
    foo? ();
    foo(s: string);
}

