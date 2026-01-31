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
        const x = 12;
        const y = 12;
        const z = 12;
    }
}
