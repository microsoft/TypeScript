// @target: es6
enum E1 { x }
enum E2 { x }
var o = {
    [E1.x || E2.x]: 0
};