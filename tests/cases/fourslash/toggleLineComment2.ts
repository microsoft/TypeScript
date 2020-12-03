// When indentation is different between lines it should get the left most indentation
// and use that for all lines.
// When uncommeting, doesn't matter what indentation the line has.

////         let var1[| = 1;
////     let var2 = 2;
////             let var3 |]= 3;
////
//// //    let var4[| = 1;
//// //let var5 = 2;
//// //        let var6 |]= 3;

verify.toggleLineComment(
    `    //    let var1 = 1;
    //let var2 = 2;
    //        let var3 = 3;

    let var4 = 1;
let var5 = 2;
        let var6 = 3;`);