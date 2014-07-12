function foo(a:string, b?:string, c?:number, ...d:number[]){}
foo('foo', 1); 
foo('foo'); 
foo();
foo(1, 'bar');
foo('foo', 1, 3);
foo('foo', 'bar', 3, 4);
