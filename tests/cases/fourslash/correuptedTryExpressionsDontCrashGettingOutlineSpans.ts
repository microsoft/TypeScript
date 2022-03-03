/// <reference path="fourslash.ts"/>

// #33102

//// try[| {
////   var x = [
////     {% try[||] %}|][|{% except %}|] 
////   ]
//// } catch (e)[| {
////   
//// }|]

verify.outliningSpansInCurrentFile(test.ranges());
