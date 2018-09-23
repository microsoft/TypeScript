//// [enumConflictsWithGlobalIdentifier.ts]
enum Position { 
    IgnoreRulesSpecific = 0,
}
var x = IgnoreRulesSpecific.
var y = Position.IgnoreRulesSpecific;


//// [enumConflictsWithGlobalIdentifier.js]
var Position = Position || (Position = {});
(function (Position) {
    Position[Position["IgnoreRulesSpecific"] = 0] = "IgnoreRulesSpecific";
})(Position);
var x = IgnoreRulesSpecific.
;
var y = Position.IgnoreRulesSpecific;
