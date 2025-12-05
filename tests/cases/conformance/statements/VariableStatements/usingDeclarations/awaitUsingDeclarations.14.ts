// @target: esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

class C {
    static {
        await using x = null;
        {
            await using y = null;
        }
    }
}
