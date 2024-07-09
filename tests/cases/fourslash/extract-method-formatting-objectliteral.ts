/// <reference path='fourslash.ts' />

//// 
//// namespace M {
////     class C {
////         foo() {
////             /*a*/let x = {a:1};
////             let y = {
////             b: 2
////             };
////             let z =
////             {
////             c: 3
////             };/*b*/
////             return x.a + y.b + z.c;
////         }
////     }
//// }
//// 

goTo.select('a', 'b');
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to method in class 'C'",
    newContent:
`
namespace M {
    class C {
        foo() {
            let { x, y, z } = this./*RENAME*/newMethod();
            return x.a + y.b + z.c;
        }

        private newMethod() {
            let x = { a: 1 };
            let y = {
                b: 2
            };
            let z = {
                c: 3
            };
            return { x, y, z };
        }
    }
}
`
});


