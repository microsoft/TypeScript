// When there's is only whitespace, insert comment. If there is whitespace but theres a comment in bewteen, then uncomment.

//// /*let var1[| = 1;*/
////     |]
//// 
//// [|    
//// /*let var2 = 2;*/|]
//// 
//// [|
//// 
//// |]
//// 
////     [||]
//// 
//// let var3[||] = 3;

verify.toggleMultilineComment(
    `let var1 = 1;
    

    
let var2 = 2;

/*

*/

    /**/

let var3/**/ = 3;`);