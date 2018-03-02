// @allowJs: true
// @checkJs: true
// @noEmit: true

// @fileName: a.js
var x = 0;


/// @ts-ignore
x();

/// @ts-ignore
x();

/// @ts-ignore
x(
    2,
    3);



// @ts-ignore
// come comment
// some other comment

// @anohter

x();



// @ts-ignore: no call signature
x();

// @ts-ignore TS2349
x();

// @ts-ignore TS2349, TS2350
x();

// @ts-ignore TS2349 , TS2350 // space before comma and additioanl comment
x();

// @ts-ignore TS2349 , TS2350, // trailing comma
x();

// @ts-ignore TS2350 here should be error
x();