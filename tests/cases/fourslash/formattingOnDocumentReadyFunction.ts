/// <reference path='fourslash.ts' />

/////*1*/$    (   document   )   .  ready  (   function   (   )   {
/////*2*/    alert    (           'i am ready'  )   ;
/////*3*/           }                 );
format.document();
goTo.marker("1");
verify.currentLineContentIs("$(document).ready(function() {");
goTo.marker("2");
verify.currentLineContentIs("    alert('i am ready');");
goTo.marker("3");
verify.currentLineContentIs("});");