//// [lastPropertyInLiteralWins.js]
function test(thing) {
    thing.thunk("str");
}
test({
    thunk: function (str) {
    },
    thunk: function (num) {
    }
});

test({
    thunk: function (num) {
    },
    thunk: function (str) {
    }
});
