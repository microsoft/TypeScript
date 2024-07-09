/// <reference path="fourslash.ts" />

////  
////// 1 below   
////    
////// 2 above   
////    
////let x;
////  
////// abc
////  
////let y;
////  
////// 3 above
////   
////while (true) {
////    while (true) {
////    }
////      
////    // 4 above   
////}
////  
////// 5 above  
////   
////   

format.document();

verify.currentFileContentIs(`
// 1 below   

// 2 above   

let x;

// abc

let y;

// 3 above

while (true) {
    while (true) {
    }

    // 4 above   
}

// 5 above  

`);
