type EnhancedString = string & { enhancements: any };

var a = "foo" === "bar" as "baz";
var b = "foo" !== ("bar" as "foo");
var c = "foo" == (<number>"bar");
var d = "foo" === ("bar" as EnhancedString);