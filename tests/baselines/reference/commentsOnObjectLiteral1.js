//// [tests/cases/compiler/commentsOnObjectLiteral1.ts] ////

//// [commentsOnObjectLiteral1.ts]
var Person = makeClass( 
   /** 
     @scope Person 
   */ 
   {
   } 
);

//// [commentsOnObjectLiteral1.js]
"use strict";
var Person = makeClass(
/**
  @scope Person
*/
{});
