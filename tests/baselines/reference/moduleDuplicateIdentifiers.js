//// [moduleDuplicateIdentifiers.ts]
export var Foo = 2;
export var Foo = 42; // Should error

export interface Bar {
	_brand1: any;
}

export interface Bar { // Shouldn't error
	_brand2: any;
}

export namespace FooBar {
	export var member1 = 2;
}

export namespace FooBar { // Shouldn't error
	export var member2 = 42;
}

export class Kettle {
	member1 = 2;
}

export class Kettle { // Should error
	member2 = 42;
}

export var Pot = 2;
Pot = 42; // Shouldn't error

export enum Utensils {
	Spoon,
	Fork,
	Knife
}

export enum Utensils { // Shouldn't error
	Spork = 3
}


//// [moduleDuplicateIdentifiers.js]
"use strict";
exports.__esModule = true;
exports.Utensils = exports.Pot = exports.Kettle = exports.FooBar = exports.Foo = void 0;
exports.Foo = 2;
exports.Foo = 42; // Should error
var FooBar;
(function (FooBar) {
    FooBar.member1 = 2;
})(FooBar = exports.FooBar || (exports.FooBar = {}));
(function (FooBar) {
    FooBar.member2 = 42;
})(FooBar = exports.FooBar || (exports.FooBar = {}));
var Kettle = /** @class */ (function () {
    function Kettle() {
        this.member1 = 2;
    }
    return Kettle;
}());
exports.Kettle = Kettle;
var Kettle = /** @class */ (function () {
    function Kettle() {
        this.member2 = 42;
    }
    return Kettle;
}());
exports.Kettle = Kettle;
exports.Pot = 2;
exports.Pot = 42; // Shouldn't error
var Utensils;
(function (Utensils) {
    Utensils[Utensils["Spoon"] = 0] = "Spoon";
    Utensils[Utensils["Fork"] = 1] = "Fork";
    Utensils[Utensils["Knife"] = 2] = "Knife";
})(Utensils = exports.Utensils || (exports.Utensils = {}));
(function (Utensils) {
    Utensils[Utensils["Spork"] = 3] = "Spork";
})(Utensils = exports.Utensils || (exports.Utensils = {}));
