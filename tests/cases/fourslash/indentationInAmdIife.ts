/// <reference path="fourslash.ts"/>

//// function foo(a?,b?) { b(a); }
//// 
//// (foo)(1, function() {/*4_1*/
//// });
//// 
//// // No line-breaks in the expression part of the call expression
//// 
//// (foo)
////     (1, function () {/*8_0*/
////     });
//// (foo)(1,
////     function () {/*8_1*/
////     });
//// (foo)(1, function() 
//// {/*4_2*/
//// });
//// 
//// // Contains line-breaks in the expression part of the call expression.
////
//// (
////     foo)(1, function () {/*8_4*/
////     });
//// (foo
//// )(1, function () {/*4_3*/
//// });
//// (foo
//// )
////     (1, function () {/*8_2*/
////     });
//// (foo
//// )(1,
////     function () {/*8_3*/
////     });
//// (foo
//// )(1, function()
//// {/*4_4*/
//// });

for (let i = 1; i < 5; ++i) {
    goTo.marker(`4_${i}`);
    edit.insertLine("");
    verify.indentationIs(4);
}

for (let i = 1; i < 5; ++i) {
    goTo.marker(`8_${i}`);
    edit.insertLine("");
    verify.indentationIs(8);
}
