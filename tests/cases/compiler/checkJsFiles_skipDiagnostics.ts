// @allowJs: true
// @checkJs: true
// @noEmit: true

// @fileName: a.js
var x = 0;


/// @ts-suppress
x();

/// @ts-suppress
x();

/// @ts-suppress
x(
    2,
    3);



// @ts-suppress
// come comment
// some other comment

// @anohter

x();



// @ts-suppress: no call signature
x();