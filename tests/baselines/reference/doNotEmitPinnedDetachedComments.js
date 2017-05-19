//// [doNotEmitPinnedDetachedComments.ts]
var x = 10;

/*! Single Line comment */

function baz() { }


/*!
    multi-line comment

*/


//========================


function bar() {
    /*!
        Remove this comment
    */

}

function foo() {
    /*! Remove this */

    return 0;
}


//========================


//// [doNotEmitPinnedDetachedComments.js]
var x = 10;
function baz() { }
function bar() {
}
function foo() {
    return 0;
}
