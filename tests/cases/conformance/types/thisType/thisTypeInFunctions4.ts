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