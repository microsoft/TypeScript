//// [letInLetOrConstDeclarations.ts]
{
    let let = 1; // should error
    for (let let in []) { } // should error
}
{
    const let = 1; // should error
}
{
    function let() { // should be ok
    }
}

//// [letInLetOrConstDeclarations.js]
{
    let let = 1; // should error
    for (let let in []) { } // should error
}
{
    const let = 1; // should error
}
{
    function let() {
    }
}
