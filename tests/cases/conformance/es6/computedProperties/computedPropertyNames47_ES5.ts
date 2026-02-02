// @target: es5, es2015
enum E1 { x }
enum E2 { x }
var o = {
    [E1.x || E2.x]: 0
};