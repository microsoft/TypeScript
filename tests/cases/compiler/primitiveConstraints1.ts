function foo1<T extends U, U>(t: T, u: U) { }
foo1<string, number>('hm', 1); // no error
 
function foo2<T, U extends T>(t: T, u: U) { }
foo2<number, string>(1, 'hm'); // error
