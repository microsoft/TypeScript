//// [contextualTypingOfGenericFunctionTypedArguments1.js]
var c2;
var _;

// errors on all 3 lines, bug was that r5 was the only line with errors
var f = function (x) {
    return x.toFixed();
};
var r5 = _.forEach(c2, f);
var r6 = _.forEach(c2, function (x) {
    return x.toFixed();
});
