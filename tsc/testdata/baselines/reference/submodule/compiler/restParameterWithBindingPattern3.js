//// [tests/cases/compiler/restParameterWithBindingPattern3.ts] ////

//// [restParameterWithBindingPattern3.ts]
function a(...[a = 1, b = true]: string[]) { }

function b(...[...foo = []]: string[]) { }

function c(...{0: a, length, 3: d}: [boolean, string, number]) { }

function d(...[a, , , d]: [boolean, string, number]) { }

function e(...{0: a = 1, 1: b = true, ...rest: rest}: [boolean, string, number]) { }

//// [restParameterWithBindingPattern3.js]
function a(...[a = 1, b = true]) { }
function b(...[...foo = []]) { }
function c(...{ 0: a, length, 3: d }) { }
function d(...[a, , , d]) { }
function e(...{ 0: a = 1, 1: b = true, ...rest: rest }) { }
