function foo(a:string, b?:number, c?:string){}
foo('foo', 1); 
foo('foo'); 
foo();
foo(1, 'bar');
foo('foo', 1, 'bar');
foo('foo', 1, 3);
