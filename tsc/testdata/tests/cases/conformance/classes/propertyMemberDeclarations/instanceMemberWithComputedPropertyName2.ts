// https://github.com/microsoft/TypeScript/issues/33857
// @useDefineForClassFields: true
// @target: es2015
"use strict";
const x = 1;
class C {
    [x]: string;
}
