//// [reversedWordsWithBindingElement.ts]
interface Foo {
    enum: string;
    case: number;
}

function bar({ enum, case }: Foo) {
    if (enum && case) {
        //
    }
}


//// [reversedWordsWithBindingElement.js]
function bar(_a) {
    var enum = _a["enum"], case = _a["case"];
    if () {
        var  = void 0;
        (function () {
        })( || ( = {}));
    }
     && ;
    {
        //
    }
}
