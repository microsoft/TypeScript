//// [tests/cases/compiler/anonymousModules.ts] ////

//// [anonymousModules.ts]
module {
	export var foo = 1;

	module {
		export var bar = 1;
	}

	var bar = 2;

	module {
		var x = bar;
	}
}

//// [anonymousModules.js]
module;
{
    export var foo = 1;
    module;
    {
        export var bar = 1;
    }
    var bar = 2;
    module;
    {
        var x = bar;
    }
}
