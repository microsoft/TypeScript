/// <reference path="fourslash.ts" />

////function foo() {
////    /*1*/if (true) console.log(1);
////    else console.log(1);
////    if (true)
////        console.log(1);
////    else
////        console.log(1);
////
////    do console.log(1);
////    while (false);
////    do
////        console.log(1);
////    while (false);
////    
////    while (true) console.log(1);
////    while (true)
////        console.log(1);
////
////    for (let i = 1; i < 4; i++) console.log(1);  // 1,2,3
////    for (let i = 1; i < 4; i++)
////        console.log(1);  // 1,2,3
////
////    for (let i in [1, 2, 3]) console.log(1);
////    for (let i in [1, 2, 3])
////        console.log(1);
////
////    for (let i of [1, 2, 3]) console.log(1);
////    for (let i of [1, 2, 3])
////        console.log(1);
////
////    with ([1, 2, 3]) console.log(toString());
////    with ([1, 2, 3])
////        console.log(toString());/*2*/
////}

goTo.select("1", "2");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_1",
  actionDescription: "Extract to function in global scope",
  newContent:
`function foo() {
    /*RENAME*/newFunction();
}

function newFunction() {
    if (true) console.log(1);
    else console.log(1);
    if (true)
        console.log(1);

    else
        console.log(1);

    do console.log(1);
    while (false);
    do
        console.log(1);
    while (false);

    while (true) console.log(1);
    while (true)
        console.log(1);

    for (let i = 1; i < 4; i++) console.log(1); // 1,2,3
    for (let i = 1; i < 4; i++)
        console.log(1); // 1,2,3

    for (let i in [1, 2, 3]) console.log(1);
    for (let i in [1, 2, 3])
        console.log(1);

    for (let i of [1, 2, 3]) console.log(1);
    for (let i of [1, 2, 3])
        console.log(1);

    with ([1, 2, 3]) console.log(toString());
    with ([1, 2, 3])
    console.log(toString());
}
`
});
