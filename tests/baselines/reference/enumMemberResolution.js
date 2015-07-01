//// [enumMemberResolution.ts]
enum Position2 {
    IgnoreRulesSpecific = 0
}
var x = IgnoreRulesSpecific. // error
var y = 1;
var z = Position2.IgnoreRulesSpecific; // no error


//// [enumMemberResolution.js]
var Position2;
(function (Position2) {
    Position2[Position2["IgnoreRulesSpecific"] = 0] = "IgnoreRulesSpecific";
})(Position2 || (Position2 = {}));
var x = IgnoreRulesSpecific.
; // error
var y = 1;
var z = Position2.IgnoreRulesSpecific; // no error
