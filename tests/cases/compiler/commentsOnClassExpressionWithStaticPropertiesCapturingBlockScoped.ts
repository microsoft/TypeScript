//@target: es5
//@sourcemap: true
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