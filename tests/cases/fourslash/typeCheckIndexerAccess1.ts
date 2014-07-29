/// <reference path="fourslash.ts" />

//// // @sourcemap: true
//// module Foo.Bar {
////     "use strict";
//// 
////     class Greeter {
////         constructor(public greeting: string) {
////         }
//// 
////         greet() {
////         }
////     }
//// 
//// 
////     function foo(greeting: string): Foo.Bar.Greeter {
////         return new Greeter(greeting);
////     }
//// 
////     var greeter = new Greeter("Hello, world!");
////     var str = greeter.greet();
//// 
////     function foo2(greeting: string, ...restGreetings) {
////         var greeters: Greeter[] = [];
//// new Greeter(greeting);
////         for (var i = 0; restGreetings.length; i++) {
////             greeters.push(new Greeter(restGreetings[i]));
////         }
//// 
////         return greeters;
////     }
//// 
////     var b = foo2("Hello", "World");
////     for (var j = 0; j < b.length; j++) {
////         b[j].greet();
////     }
//// }

edit.disableFormatting();
diagnostics.validateTypesAtPositions(705);