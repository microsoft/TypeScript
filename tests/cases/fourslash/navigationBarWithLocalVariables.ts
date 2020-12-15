/// <reference path="fourslash.ts"/>

//// function x(){
//// 	const x = Object()
//// 	x.foo = ""
//// }

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "x",
            "kind": "function",
            "childItems": [
                {
                    "text": "x",
                    "kind": "const"
                }
            ]
        }
    ]
});
