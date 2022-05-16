//// [file.js]
x ? y => ({ y }) : z => ({ z })


//// [file.js]
x ? function (y) { return function (_a) {
    var y = _a.y;
    return ({ z: z });
}; }
    :
;
