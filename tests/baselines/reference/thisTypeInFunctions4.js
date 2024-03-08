//// [tests/cases/conformance/types/thisType/thisTypeInFunctions4.ts] ////

//// [thisTypeInFunctions4.ts]
type WrongObject = {value: number};
type CorrectObject = {name: string};

declare function isCorrect(obj: any): obj is CorrectObject

declare function callsCallback(cb: (name: string)=>void)

function problemFunction(this: CorrectObject | WrongObject): void {
    //check type
    if (!isCorrect(this)) return;

    callsCallback((name)=>{
        this.name = name; //should not error
        type T = typeof this;
    });
}

//// [thisTypeInFunctions4.js]
function problemFunction() {
    var _this = this;
    //check type
    if (!isCorrect(this))
        return;
    callsCallback(function (name) {
        _this.name = name; //should not error
    });
}
