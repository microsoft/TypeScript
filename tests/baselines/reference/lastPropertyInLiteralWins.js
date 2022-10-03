//// [lastPropertyInLiteralWins.ts]
interface Thing {
    thunk: (str: string) => void;
}
function test(thing: Thing) {
    thing.thunk("str");
}
test({ // Should error, as last one wins, and is wrong type
    thunk: (str: string) => {},
    thunk: (num: number) => {}
});

test({ // Should be OK.  Last 'thunk' is of correct type
    thunk: (num: number) => {},
    thunk: (str: string) => {}
});


//// [lastPropertyInLiteralWins.js]
function test(thing) {
    thing.thunk("str");
}
test({
    thunk: function (str) { },
    thunk: function (num) { }
});
test({
    thunk: function (num) { },
    thunk: function (str) { }
});
