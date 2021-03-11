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

// @another

x();

/* @ts-ignore */
/*another comment
 that could be multiline*/

x();

/* @ts-ignore
continuing comment
 that could be multiline*/

x();



// @ts-ignore: no call signature
x();