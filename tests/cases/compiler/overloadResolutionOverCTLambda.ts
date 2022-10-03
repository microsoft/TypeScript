function foo(b: (item: number) => boolean) { }
foo(a => a); // can not convert (number)=>bool to (number)=>number