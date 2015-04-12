//// [destructuringParameterDeclaration2ES6.ts]
"use strict"
function a({while}) { }
function a1({public}) { }
function a2({public: x}) { }
function a3({while: y}) { }
function a4([while, for, public]){ }
function a5(...while) { }
function a6(...public) { }
function a7(...a: string) { }

class C {
    constructor(public ...a) { }
}


a2({ public: 1 });
a3({ while: 1 });
a({ while: 1 });



//// [destructuringParameterDeclaration2ES6.js]
"use strict";
function a({ while }) { }
function a1({ public }) { }
function a2({ public: x }) { }
function a3({ while: y }) { }
while (, )
    for (, public; ; )
        ;
{ }
while () { }
function a6(...public) { }
function a7(...a) { }
class C {
    constructor(public, ...a) {
    }
}
a2({ public: 1 });
a3({ while: 1 });
a({ while: 1 });
