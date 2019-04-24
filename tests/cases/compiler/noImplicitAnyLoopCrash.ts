// @noImplicitAny: true
let foo = () => {};     // if you remove or change foo definition to not a function, bug disappears
let bar;                // if you add type annotation here, bug disappears
while (1)               // if you remove while, bug disappears
    bar = ~foo(...bar); // if you remove unary or spread operator, bug disappears