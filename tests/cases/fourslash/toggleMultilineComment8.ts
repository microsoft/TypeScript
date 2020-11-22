// If the range only contains comments, uncomment all.

//// /*let var[|1 = 1;*/
//// /*let var2 = 2;*/
//// 
//// /*let var3 |]= 3;*/

verify.toggleMultilineComment(
    `let var1 = 1;
let var2 = 2;

let var3 = 3;`);