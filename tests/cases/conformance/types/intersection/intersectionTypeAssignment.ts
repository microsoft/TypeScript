declare var a: { a: string };
declare var b: { b: string };
declare var x: { a: string, b: string };
declare var y: { a: string } & { b: string };

a = x;
a = y;
x = a;  // Error
y = a;  // Error

b = x;
b = y;
x = b;  // Error
y = b;  // Error

x = y;
y = x;
