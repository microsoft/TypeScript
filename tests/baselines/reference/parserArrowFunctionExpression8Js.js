//// [file.js]
x ? y => ({ y }) : z => ({ z })


//// [file.js]
x ? function (y) { return ({ y: y }); } : function (z) { return ({ z: z }); };
