//// [tests/cases/compiler/overloadOnConstNoStringImplementation2.ts] ////

//// [overloadOnConstNoStringImplementation2.ts]
interface I {
    x1(a: number, callback: (x: 'hi') => number);
}

class C implements I {
    x1(a: number, callback: (x: 'hi') => number);
    x1(a: number, callback: (x: any) => number) {
        callback('hi');
        callback('bye');
        var hm = "hm";
        callback(hm);
        callback(1);
    }
}

var c: C;
c.x1(1, (x: 'hi') => { return 1; } );
c.x1(1, (x: 'bye') => { return 1; } ); 
c.x1(1, (x: string) => { return 1; } );
c.x1(1, (x: number) => { return 1; } );

//// [overloadOnConstNoStringImplementation2.js]
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
