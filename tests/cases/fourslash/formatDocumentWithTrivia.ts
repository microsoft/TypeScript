/// <reference path="fourslash.ts" />

////  
////// whitespace below   
////    
////// whitespace above   
////    
////let x;
////  
////// abc
////  
////let y;
////  
////// whitespace above again
////   
////while (true) {
////    while (true) {
////    }
////      
////    // whitespace above   
////}
////  
////// whitespace above again  
////   
////   

format.document();

verify.currentFileContentIs(`
// whitespace below   

// whitespace above   

let x;

// abc

let y;

// whitespace above again

while (true) {
    while (true) {
    }

    // whitespace above   
}

// whitespace above again  

`);
