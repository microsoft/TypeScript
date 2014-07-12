// Should still highlight even though it's invalid assignment
var ^^[|foo|] = function() { };

[|fo^^o|] = [|f^^oo|] + 1;