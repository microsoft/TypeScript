function foo1<T extends Date>(test: T);
function foo1<T extends Number>(test: string);
function foo1<T extends String>(test: any) { }
foo1<Date>(""); // should error



function foo2<T extends Date>(test: T): T;
function foo2<T extends Number>(test: string): T; 
function foo2<T extends String>(test: any): any { return null; }
foo2<Date>(""); // Type Date does not satisfy the constraint 'Number' for type parameter 'T extends Number'
