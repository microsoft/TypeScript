// @noImplicitAny: true
let foo = () => {};
let bar;
while (1) {
    bar = ~foo(...bar);
}
