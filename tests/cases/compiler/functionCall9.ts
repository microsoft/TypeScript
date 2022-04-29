function foo(a?:string, b?:number){};
foo('foo', 1); 
foo('foo'); 
foo('foo','bar');
foo('foo', 1, 'bar');
foo();