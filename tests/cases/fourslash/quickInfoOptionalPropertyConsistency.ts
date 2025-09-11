/// <reference path='fourslash.ts'/>

//// interface Options {
////     width?: number;
////     height?: number;
////     color?: ColorOptions;
////     border?: BorderOptions;
//// }
////
//// interface ColorOptions {
////     primary: string;
////     secondary: string;
//// }
////
//// interface BorderOptions {
////     style: string;
////     width: number;
//// }
////
//// function processOptions(options: Options) {
////     return options.wi/*1*/dth + options.he/*2*/ight + options.co/*3*/lor + options.bo/*4*/rder;
//// }

// Test that optional properties show consistently with '?' and not '| undefined'
verify.quickInfoAt("1", "(property) Options.width?: number");
verify.quickInfoAt("2", "(property) Options.height?: number"); 
verify.quickInfoAt("3", "(property) Options.color?: ColorOptions");
verify.quickInfoAt("4", "(property) Options.border?: BorderOptions");