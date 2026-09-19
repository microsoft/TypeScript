// @target: es2022
// @lib: es2022,dom
// @noEmit: true

new File((function* () {
    yield "a";
})(), "name");
