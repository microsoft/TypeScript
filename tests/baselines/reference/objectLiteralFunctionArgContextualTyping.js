//// [objectLiteralFunctionArgContextualTyping.js]
function f2(args) {
}

f2({ hello: 1 });
f2({ value: '' });
f2({ value: '', what: 1 });
f2({ toString: function (s) {
        return s;
    } });
f2({ toString: function (s) {
        return s;
    } });
f2({ value: '', toString: function (s) {
        return s.uhhh;
    } });
