//// [typeAliasDeclarationEmit3.ts]
function f1(): void {
    for (let i = 0; i < 1; i++)
        type foo = [];
        console.log('f1');
}

function f2(): void {
    while (true)
        type foo = [];
        console.log('f2');
}

function f3(): void {
    if (true)
        type foo = [];
        console.log('f3');
}


//// [typeAliasDeclarationEmit3.js]
function f1() {
    for (var i = 0; i < 1; i++)
        ;
    console.log('f1');
}
function f2() {
    while (true)
        ;
    console.log('f2');
}
function f3() {
    if (true)
        ;
    console.log('f3');
}
