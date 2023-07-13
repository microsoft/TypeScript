//// [tests/cases/compiler/selfReferencingFile3.ts] ////

//// [selfReferencingFile3.ts]
///<reference path='./selfReferencingFile3.ts'/>

class selfReferencingFile3 {

}

//// [selfReferencingFile3.js]
///<reference path='./selfReferencingFile3.ts'/>
var selfReferencingFile3 = /** @class */ (function () {
    function selfReferencingFile3() {
    }
    return selfReferencingFile3;
}());
