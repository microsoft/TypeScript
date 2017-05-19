//// [classCannotExtendVar.ts]
var Markup;

class Markup {
    constructor() {
    }
}


//// [classCannotExtendVar.js]
var Markup;
var Markup = (function () {
    function Markup() {
    }
    return Markup;
}());
