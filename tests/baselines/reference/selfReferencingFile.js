//// [selfReferencingFile.ts]
///<reference path='selfReferencingFile.ts'/>

class selfReferencingFile {

}

//// [selfReferencingFile.js]
///<reference path='selfReferencingFile.ts'/>
var selfReferencingFile = (function () {
    function selfReferencingFile() {
    }
    return selfReferencingFile;
}());
