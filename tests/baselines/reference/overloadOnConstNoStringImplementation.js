//// [overloadOnConstNoStringImplementation.js]
function x2(a, cb) {
    cb('hi');
    cb('bye');
    var hm = 'hm';
    cb(hm); // should this work without a string definition?
    cb('uh');
    cb(1);
}

var cb = function (x) {
    return 1;
};
x2(1, cb); // error
x2(1, function (x) {
    return 1;
}); // error
x2(1, function (x) {
    return 1;
});
