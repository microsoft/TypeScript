// If selection is outside of a multiline comment then insert comment
// instead of removing.

//// let var1/* = 1;
//// let var2 [|= 2;
//// let var3 */= 3;|]
////
//// [|let var4/* = 1;
//// let var5 |]= 2;
//// let var6 */= 3;
////
//// [|let var7/* = 1;
//// let var8 = 2;
//// let var9 */= 3;|]
////
//// /*let va[|r10 = 1;*/
//// let var11 = 2;
//// /*let var12|] = 3;*/

verify.toggleMultilineComment(
    `let var1/* = 1;
let var2 *//*= 2;
let var3 *//*= 3;*/

/*let var4*//* = 1;
let var5 *//*= 2;
let var6 */= 3;

/*let var7*//* = 1;
let var8 = 2;
let var9 *//*= 3;*/

/*let va*//*r10 = 1;*//*
let var11 = 2;
*//*let var12*//* = 3;*/`);