function foo(a:string, b?:string, ...c:number[]){}
foo('foo', 1); 
foo('foo'); 
foo('foo', 'bar'); 
foo();
foo(1, 'bar');
foo('foo', 'bar', 3);
