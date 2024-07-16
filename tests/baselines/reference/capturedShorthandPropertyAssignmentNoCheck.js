//// [tests/cases/compiler/capturedShorthandPropertyAssignmentNoCheck.ts] ////

//// [capturedShorthandPropertyAssignmentNoCheck.ts]
const fns = [];
for (const value of [1, 2, 3]) {
    fns.push(() => ({ value }));
}
const result = fns.map(fn => fn());
console.log(result)


//// [capturedShorthandPropertyAssignmentNoCheck.js]
var fns = [];
var _loop_1 = function (value) {
    fns.push(function () { return ({ value: value }); });
};
for (var _i = 0, _a = [1, 2, 3]; _i < _a.length; _i++) {
    var value = _a[_i];
    _loop_1(value);
}
var result = fns.map(function (fn) { return fn(); });
console.log(result);


!!!! File capturedShorthandPropertyAssignmentNoCheck.js differs from original emit in noCheck emit
//// [capturedShorthandPropertyAssignmentNoCheck.js]
===================================================================
--- Expected	The full check baseline
+++ Actual	with noCheck set
@@ -1,10 +1,7 @@
 var fns = [];
-var _loop_1 = function (value) {
-    fns.push(function () { return ({ value: value }); });
-};
 for (var _i = 0, _a = [1, 2, 3]; _i < _a.length; _i++) {
     var value = _a[_i];
-    _loop_1(value);
+    fns.push(function () { return ({ value: value }); });
 }
 var result = fns.map(function (fn) { return fn(); });
 console.log(result);
