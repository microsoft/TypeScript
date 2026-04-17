//// function test(...rest: [first: number, ...middle: string[], last: string]) {}
//// test(10, 'a', 'b', 'c')
//// test(10, 'a', 'c')

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "all",
    includeInlayFunctionParameterTypeHints: true,
});
