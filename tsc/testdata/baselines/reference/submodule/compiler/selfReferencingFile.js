//// [tests/cases/compiler/selfReferencingFile.ts] ////

//// [selfReferencingFile.ts]
///<reference path='selfReferencingFile.ts'/>

class selfReferencingFile {

}

//// [selfReferencingFile.js]
///<reference path='selfReferencingFile.ts'/>
class selfReferencingFile {
}
