///<reference path="fourslash.ts"/>

/////*1*/  var x: () =>           void    ;
/////*2*/  var y:     void    ;
/////*3*/  function test(a:void,b:string){}
/////*4*/  var a, b, c, d;
/////*5*/  void    a    ;
/////*6*/  void        (0);
/////*7*/  b=void(c=1,d=2);

format.document();

// formatting on function return type => void
goTo.marker("1");
verify.currentLineContentIs('var x: () => void;');

// formatting on variable type
goTo.marker("2");
verify.currentLineContentIs('var y: void;');

// formatting on function with void argument type
goTo.marker("3");
verify.currentLineContentIs('function test(a: void, b: string) { }');

// formatting on void operator
goTo.marker("5");
verify.currentLineContentIs('void a;');

goTo.marker("6");
verify.currentLineContentIs('void (0);');

goTo.marker("7");
verify.currentLineContentIs('b = void (c = 1, d = 2);');


