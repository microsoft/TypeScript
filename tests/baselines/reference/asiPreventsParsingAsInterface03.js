//// [asiPreventsParsingAsInterface03.ts]
var interface: number, I: string;

namespace n {
    interface   // This should be the identifier 'interface'
    I           // This should be the identifier 'I'
    {}          // This should be a block body
}

//// [asiPreventsParsingAsInterface03.js]
var interface, I;
var n;
(function (n) {
    interface; // This should be the identifier 'interface'
    I; // This should be the identifier 'I'
    { } // This should be a block body
})(n || (n = {}));
