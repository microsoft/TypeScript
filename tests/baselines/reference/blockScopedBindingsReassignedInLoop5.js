//// [tests/cases/compiler/blockScopedBindingsReassignedInLoop5.ts] ////

//// [blockScopedBindingsReassignedInLoop5.ts]
for (let x = 1, y = 2; x < y; ++x, --y) {
    let a = () => x++ + y++;
    if (x == 1) 
        break;
    else 
        y = 5;
}


//// [blockScopedBindingsReassignedInLoop5.js]
for (let x = 1, y = 2; x < y; ++x, --y) {
    let a = () => x++ + y++;
    if (x == 1)
        break;
    else
        y = 5;
}
