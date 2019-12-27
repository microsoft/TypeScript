////import React, { Component } from 'react';
////
////let component = () =>[| (
////    [|<div></div>|]
////)|]
////
////let componentParams =[| (
////    p: any
////) => (
////    [|<div></div>|]
////)|];
////let a: any[];
////a.map(() =>[|(
////    1 + 3
////)|]);
////a.map(() =>[|(
////    1 + 3
////)|]).filter(() =>[|(
////    true
////)|]);

verify.outliningSpansInCurrentFile(test.ranges(), "code");