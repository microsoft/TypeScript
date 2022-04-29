var aString: string;
for (aString in {}) { }

var anAny: any;
for (anAny in {}) { }

for (var x in {}) { }
for (var x in []) { }
for (var x in [1, 2, 3, 4, 5]) { }

function fn(): any { }
for (var x in fn()) { }

for (var x in /[a-z]/) { }
for (var x in new Date()) { }

var c: any, d: any, e: any;

for (var x in c || d) { }
for (var x in e ? c : d) { }
for (var x in 42 ? c : d) { }
for (var x in '' ? c : d) { }
for (var x in 42 ? d[x] : c[x]) { }
for (var x in c[d]) { }

for (var x in (<T>(x: T) => x)) { }
for (var x in function (x: string, y: number) { return x + y }) { }

class A {
    biz() {
        for (var x in this.biz()) { }
        for (var x in this.biz) { }
        for (var x in this) { }
        return null;
    }

    static baz() {
        for (var x in this) { }
        for (var x in this.baz) { }
        for (var x in this.baz()) { }

        return null;
    }
}

class B extends A {
    boz() {
        for (var x in this.biz()) { }
        for (var x in this.biz) { }
        for (var x in this) { }

        for (var x in super.biz) { }
        for (var x in super.biz()) { }
        return null;
    }
}

interface I {
    id: number;
    [idx: number]: I;
}
var i: I;

for (var x in i[42]) { } 


module M {
    export class X<T> {
        name:string
    }
}

for (var x in M) { }
for (var x in M.X) { }

enum Color { Red, Blue }

for (var x in Color) { }
for (var x in Color.Blue) { }
