enum Position2 {
    IgnoreRulesSpecific = 0
}
var x = IgnoreRulesSpecific. // error
var y = 1;
var z = Position2.IgnoreRulesSpecific; // no error
