//// [thisTypeInFunctions4.ts]
type WrongObject = {value: number};
type CorrectObject = {name: string};

declare function isCorrect(obj: any): obj is CorrectObject

declare function callsCallback(cb: (name: string)=>void)

function problemFunction(this: CorrectObject | WrongObject): void {
    //check type
    if (!isCorrect(this)) return;

    callsCallback((name)=>{
        this.name = name; //This throws error, even though "this" should be bound by the arrow function, where it's specified to be the correct type
    });
}

//// [thisTypeInFunctions4.js]
function problemFunction() {
    var _this = this;
    //check type
    if (!isCorrect(this))
        return;
    callsCallback(function (name) {
        _this.name = name; //This throws error, even though "this" should be bound by the arrow function, where it's specified to be the correct type
    });
}
