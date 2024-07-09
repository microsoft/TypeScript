//// [tests/cases/compiler/objectLitTargetTypeCallSite.ts] ////

//// [objectLitTargetTypeCallSite.ts]
function process( x: {a:number; b:string;}) {
	return x.a;
}

process({a:true,b:"y"});

//// [objectLitTargetTypeCallSite.js]
function process(x) {
    return x.a;
}
process({ a: true, b: "y" });
