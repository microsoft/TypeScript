//// [deepElaborationsIntoArrowExpressions.ts]
const a: {
    y(): "a"
} = {
    y: () => "b"
};


//// [deepElaborationsIntoArrowExpressions.js]
var a = {
    y: function () { return "b"; }
};
