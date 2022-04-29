class C {
    foo(x: number): number;
    foo(x: string): string;
    foo(x: any): any {
        return null;
    }
}

var c = new C();
var r: string = c['foo'](1);
var r2: number = c['foo']('');