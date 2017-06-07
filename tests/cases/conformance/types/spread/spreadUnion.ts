var union: { a: number } | { b: string };

var o3: { a: number } | { b: string };
var o3 =  { ...union };

var o4: { a: boolean } | { b: string , a: boolean};
var o4 =  { ...union, a: false };

var o5: { a: number } | { b: string } | { a: number, b: string };
var o5 =  { ...union, ...union };