//// [tests/cases/compiler/prettyFileWithErrorsAndTabs.ts] ////

//// [prettyFileWithErrorsAndTabs.ts]
function f() {
	{
		const x: string = 12;
		const y: string = 12;
		const z: string = 12;
	}
}

//// [prettyFileWithErrorsAndTabs.js]
function f() {
    {
        var x = 12;
        var y = 12;
        var z = 12;
    }
}
