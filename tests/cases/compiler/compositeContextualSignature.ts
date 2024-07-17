// @strict: true
// @noEmit: true

// Repro from #55145

function f<T extends any[]>(v: ReadonlyArray<T>) { }

f([
    [
        undefined,
        () => { },
    ],
    [
        1,
        () => {
            console.log('Hello')
        },
    ],
]);
