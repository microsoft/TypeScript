//// [staticsInAFunction.ts]
function boo{
   static test()
   static test(name:string)
   static test(name?:any){}
}


//// [staticsInAFunction.js]
function boo() {
    test();
    test(name, string);
    test(name ?  : any);
    { }
}
