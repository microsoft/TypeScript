var my;
(function (my) {
})(my || (my = {}));
// OK
<my.div n='x'/>;
// Error
<my.other />;
var q;
(function (q) {
    // OK
    <mine.div n='x'/>;
    // Error
    <mine.non />;
})(q || (q = {}));
