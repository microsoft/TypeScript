//// [es5andes6module.ts]
export default class A
{
    constructor ()
    {

    }

    public B()
    {
        return 42;
    }
}


//// [es5andes6module.js]
var A = (function () {
    function A() {
    }
    A.prototype.B = function () {
        return 42;
    };
    return A;
}());
export default A;
