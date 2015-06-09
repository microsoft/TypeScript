function make1(obj) {
    return <test1 {...obj}/>; // OK
}
function make2(obj) {
    return <test1 {...obj}/>; // Error (x is number, not string)
}
function make3(obj) {
    return <test1 {...obj}/>; // Error, missing x
}
<test1 {...{}}/>; // Error, missing x
<test2 {...{}}/>; // OK
