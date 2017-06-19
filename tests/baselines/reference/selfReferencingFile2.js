//// [selfReferencingFile2.ts]
///<reference path='../selfReferencingFile2.ts'/>

class selfReferencingFile2 {

}

//// [selfReferencingFile2.js]
///<reference path='../selfReferencingFile2.ts'/>
var selfReferencingFile2 = /** @class */ (function () {
    function selfReferencingFile2() {
    }
    return selfReferencingFile2;
}());
