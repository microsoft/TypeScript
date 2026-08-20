// @target: es6
function * foo2() {
    /*comment1*/ yield 1;
    yield /*comment2*/ 2;
    yield 3 /*comment3*/
    yield */*comment4*/ [4];
    yield /*comment5*/* [5];
}
