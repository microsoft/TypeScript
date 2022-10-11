import * as ts from "../_namespaces/ts";

const errorCodes = [
    ts.Diagnostics._0_is_defined_as_an_accessor_in_class_1_but_is_overridden_here_in_2_as_an_instance_property.code,
    ts.Diagnostics._0_is_defined_as_a_property_in_class_1_but_is_overridden_here_in_2_as_an_accessor.code,
];
const fixId = "fixPropertyOverrideAccessor";
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const edits = doChange(context.sourceFile, context.span.start, context.span.length, context.errorCode, context);
        if (edits) {
            return [ts.codefix.createCodeFixAction(fixId, edits, ts.Diagnostics.Generate_get_and_set_accessors, fixId, ts.Diagnostics.Generate_get_and_set_accessors_for_all_overriding_properties)];
        }
    },
    fixIds: [fixId],

    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const edits = doChange(diag.file, diag.start, diag.length, diag.code, context);
        if (edits) {
            for (const edit of edits) {
                changes.pushRaw(context.sourceFile, edit);
            }
        }
    }),
});

function doChange(file: ts.SourceFile, start: number, length: number, code: number, context: ts.CodeFixContext | ts.CodeFixAllContext) {
    let startPosition: number;
    let endPosition: number;
    if (code === ts.Diagnostics._0_is_defined_as_an_accessor_in_class_1_but_is_overridden_here_in_2_as_an_instance_property.code) {
        startPosition = start;
        endPosition = start + length;
    }
    else if (code === ts.Diagnostics._0_is_defined_as_a_property_in_class_1_but_is_overridden_here_in_2_as_an_accessor.code) {
        const checker = context.program.getTypeChecker();
        const node = ts.getTokenAtPosition(file, start).parent;
        ts.Debug.assert(ts.isAccessor(node), "error span of fixPropertyOverrideAccessor should only be on an accessor");
        const containingClass = node.parent;
        ts.Debug.assert(ts.isClassLike(containingClass), "erroneous accessors should only be inside classes");
        const base = ts.singleOrUndefined(ts.codefix.getAllSupers(containingClass, checker));
        if (!base) return [];

        const name = ts.unescapeLeadingUnderscores(ts.getTextOfPropertyName(node.name));
        const baseProp = checker.getPropertyOfType(checker.getTypeAtLocation(base), name);
        if (!baseProp || !baseProp.valueDeclaration) return [];

        startPosition = baseProp.valueDeclaration.pos;
        endPosition = baseProp.valueDeclaration.end;
        file = ts.getSourceFileOfNode(baseProp.valueDeclaration);
    }
    else {
        ts.Debug.fail("fixPropertyOverrideAccessor codefix got unexpected error code " + code);
    }
    return ts.codefix.generateAccessorFromProperty(file, context.program, startPosition, endPosition, context, ts.Diagnostics.Generate_get_and_set_accessors.message);
}
