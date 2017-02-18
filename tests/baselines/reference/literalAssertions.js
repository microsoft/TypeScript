//// [literalAssertions.ts]
0 as 0; // OK
0 as 1; // Error

false as (false | string); // OK
false as (true | string);  // Error
false as (boolean | string);  // OK

'hello' as 'str'; // Error
'hello' as 'hello'; // OK
'hello' as ('str' | 123); // Error
'hello' as ('hello' | 123); // OK
'hello' as ('str' & 'hello'); // OK
'hello' as ('str' | 'hello'); // OK
'hello' as (1 | 2 | string); // OK
'hello' as ('str' & { _brand: any }); // Error
'hello' as ('hello' & { _brand: any }); // OK
'hello' as ('str' & { _brand: any } | 1); // Error
'hello' as ('hello' & { _brand: any } | 1); // OK

('string' as string as 'literal'); // OK


//// [literalAssertions.js]
0; // OK
0; // Error
false; // OK
false; // Error
false; // OK
'hello'; // Error
'hello'; // OK
'hello'; // Error
'hello'; // OK
'hello'; // OK
'hello'; // OK
'hello'; // OK
'hello'; // Error
'hello'; // OK
'hello'; // Error
'hello'; // OK
'string'; // OK
