// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @filename: file.js
const SomeConstructor = function () {
	this.x = 1;
};

const SomeConstructor2 = function () {
};
SomeConstructor2.staticMember = "str";

const SomeConstructor3 = function () {
	this.x = 1;
};
SomeConstructor3.staticMember = "str";
