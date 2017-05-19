var x = { one: 1 };
var y: { [index: string]: any };
var z: { [index: number]: any };
x = y;  // Error
y = x;  // Ok because index signature type is any
x = z;  // Error
z = x;  // Ok because index signature type is any
y = "foo"; // Error
z = "foo"; // OK, string has numeric indexer
z = false; // Error

