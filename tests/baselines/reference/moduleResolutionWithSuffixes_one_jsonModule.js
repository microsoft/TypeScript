//// [tests/cases/compiler/moduleResolutionWithSuffixes_one_jsonModule.ts] ////

//// [foo.ios.json]
{
	"ios": "platform ios"
}
//// [foo.json]
{
	"base": "platform base"
}

//// [index.ts]
import foo from "./foo.json";
console.log(foo.ios);

//// [/bin/foo.ios.json]
{
    "ios": "platform ios"
}
//// [/bin/index.js]
import foo from "./foo.json";
console.log(foo.ios);
