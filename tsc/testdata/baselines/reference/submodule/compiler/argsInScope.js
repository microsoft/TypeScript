//// [tests/cases/compiler/argsInScope.ts] ////

//// [argsInScope.ts]
class C {
    P(ii:number, j:number, k:number) {
       for (var i = 0; i < arguments.length; i++) {
           // WScript.Echo("param: " + arguments[i]);
       }
    }
}

var c = new C();
c.P(1,2,3);


//// [argsInScope.js]
class C {
    P(ii, j, k) {
        for (var i = 0; i < arguments.length; i++) {
            // WScript.Echo("param: " + arguments[i]);
        }
    }
}
var c = new C();
c.P(1, 2, 3);
