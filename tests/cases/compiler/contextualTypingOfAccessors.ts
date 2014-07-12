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
