//// [tests/cases/compiler/contextualTypingOfAccessors.ts] ////

//// [contextualTypingOfAccessors.ts]
// not contextually typing accessors

var x: {
   foo: (x: number) => number;
}
 
x = {
   get foo() {
      return (n)=>n
   },
   set foo(x) {}
}


//// [contextualTypingOfAccessors.js]
// not contextually typing accessors
var x;
x = {
    get foo() {
        return function (n) { return n; };
    },
    set foo(x) { }
};
