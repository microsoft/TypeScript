//// [incrementAndDecrement.ts]
enum E { A, B, C };
var x = 4;
var e = E.B;
var a: any;
var w = window;

// Assign to expression++
x++ = 4; // Error

// Assign to expression--
x-- = 5; // Error

// Assign to++expression
++x = 4; // Error

// Assign to--expression
--x = 5; // Error

// Pre and postfix++ on number
x++;
x--;
++x;
--x;
++x++; // Error
--x--; // Error
++x--; // Error
--x++; // Error

// Pre and postfix++ on enum
e++;
e--;
++e;
--e;
++e++; // Error
--e--; // Error
++e--; // Error
--e++; // Error

// Pre and postfix++ on value of type 'any'
a++;
a--;
++a;
--a;
++a++; // Error
--a--; // Error
++a--; // Error
--a++; // Error


// Pre and postfix++ on other types
w++; // Error
w--; // Error
++w; // Error
--w; // Error
++w++; // Error
--w--; // Error
++w--; // Error
--w++; // Error




//// [incrementAndDecrement.js]
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
})(E || (E = {}));
;
var x = 4;
var e = E.B;
var a;
var w = window;
// Assign to expression++
x++;
4; // Error
// Assign to expression--
x--;
5; // Error
// Assign to++expression
++x;
4; // Error
// Assign to--expression
--x;
5; // Error
// Pre and postfix++ on number
x++;
x--;
++x;
--x;
++x;
++; // Error
--x;
--; // Error
++x;
--; // Error
--x;
++; // Error
// Pre and postfix++ on enum
e++;
e--;
++e;
--e;
++e;
++; // Error
--e;
--; // Error
++e;
--; // Error
--e;
++; // Error
// Pre and postfix++ on value of type 'any'
a++;
a--;
++a;
--a;
++a;
++; // Error
--a;
--; // Error
++a;
--; // Error
--a;
++; // Error
// Pre and postfix++ on other types
w++; // Error
w--; // Error
++w; // Error
--w; // Error
++w;
++; // Error
--w;
--; // Error
++w;
--; // Error
--w;
++; // Error
