// @strict: true
// @noEmit: true

// @filename: yieldOutsideGenerator.ts
function notAGenerator() {
    // The operand is now checked even though the yield is not in a generator.
    yield yieldOperandName;
}

// @filename: returnInStaticBlock.ts
class C {
    static {
        // The expression is now checked even though `return` is illegal here.
        return returnOperandName;
    }
}

// @filename: exportAssignmentInNamespace.ts
namespace N {
    // The expression is now checked even though `export =` is illegal here.
    export = exportOperandName;
}
