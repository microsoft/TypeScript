//// [commentsOnClassExpressionWithStaticPropertiesCapturingBlockScoped.ts]
"use strict"
declare var console: any;
const arr: any[] = [];
for (let i = 0; i < 3; i++) {
    /* comment1 */
    arr.push(/* comment2 */ class C {
        /* static-comment1 */ static x = i;
        /* static-comment2 */ static y = () => C.x * 2;
    });
    arr.push(
        /* comment3 */
        class C {
            /* static-comment3 */ 
            static x = i;
            /* static-comment4 */ 
            static y = () => C.x * 2;
        }
    );
}
arr.forEach(C => console.log(C.y()));

//// [commentsOnClassExpressionWithStaticPropertiesCapturingBlockScoped.js]
"use strict";
var arr = [];
var _loop_1 = function (i) {
    /* comment1 */
    arr.push((function () {
        var _a = (function () {
                function C() {
                }
                return C;
            }());
        /* static-comment1 */ _a.x = i;
        /* static-comment2 */ _a.y = function () { return C.x * 2; };
        return _a;
    })());
    arr.push((function () {
        var _a = (function () {
                /* comment3 */
                function C() {
                }
                return C;
            }());
        /* static-comment3 */
        _a.x = i;
        /* static-comment4 */
        _a.y = function () { return C.x * 2; };
        return _a;
    })());
};
for (var i = 0; i < 3; i++) {
    _loop_1(i);
}
arr.forEach(function (C) { return console.log(C.y()); });
//# sourceMappingURL=commentsOnClassExpressionWithStaticPropertiesCapturingBlockScoped.js.map