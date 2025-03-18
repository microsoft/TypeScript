//// [tests/cases/compiler/overloadOnConstNoAnyImplementation2.ts] ////

//// [overloadOnConstNoAnyImplementation2.ts]
interface I {
    x1(a: number, callback: (x: 'hi') => number);
}

class C {
    x1(a: number, callback: (x: 'hi') => number);
    x1(a: number, callback: (x: string) => number) {
        callback('hi');
        callback('bye');
        var hm = "hm";
        callback(hm);
        callback(1); // error
    }
}

var c: C;
c.x1(1, (x: 'hi') => { return 1; } );
c.x1(1, (x: 'bye') => { return 1; } );
c.x1(1, (x) => { return 1; } );

c.x1(1, (x: number) => { return 1; } );

//// [overloadOnConstNoAnyImplementation2.js]
class C {
    x1(a, callback) {
        callback('hi');
        callback('bye');
        var hm = "hm";
        callback(hm);
        callback(1);
    }
}
var c;
c.x1(1, (x) => { return 1; });
c.x1(1, (x) => { return 1; });
c.x1(1, (x) => { return 1; });
c.x1(1, (x) => { return 1; });
