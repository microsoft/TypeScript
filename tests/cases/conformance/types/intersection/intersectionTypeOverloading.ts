// Check that order is preserved in intersection types for purposes of
// overload resolution

type F = (s: string) => string;
type G = (x: any) => any;

var fg: F & G;
var gf: G & F;

var x = fg("abc");
var x: string;

var y = gf("abc");
var y: any;
