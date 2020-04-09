/* @internal */
namespace ts.codefix {
    const errorCodes = [
        Diagnostics._0_is_defined_as_an_accessor_in_class_1_but_is_overridden_here_in_2_as_an_instance_property.code,
        Diagnostics._0_is_defined_as_a_property_in_class_1_but_is_overridden_here_in_2_as_an_accessor.code,
    ];
    const fixId = "fixPropertyOverrideAccessor";
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const r = doChange(context);
            if (r) {
                return [createCodeFixAction(fixId, r.edits, Diagnostics.Generate_get_and_set_accessors, fixId, Diagnostics.Generate_get_and_set_accessors_for_all_overriding_properties)];
            }
        },
        fixIds: [fixId],

        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const codeFixContext = { ...context, span: { start: diag.start, length: diag.length }, errorCode: diag.code };
            const r = doChange(codeFixContext)
            if (r) {
                for (const e of r.edits) {
                    changes.pushRaw(context.sourceFile, e)
                }
            }
        }),
    });

    function doChange(context: CodeFixContext) {
        let startPosition: number
        let endPosition: number
        if (context.errorCode === Diagnostics._0_is_defined_as_an_accessor_in_class_1_but_is_overridden_here_in_2_as_an_instance_property.code) {
            startPosition = context.span.start
            endPosition = context.span.start + context.span.length
        }
        else if (context.errorCode === Diagnostics._0_is_defined_as_a_property_in_class_1_but_is_overridden_here_in_2_as_an_accessor.code) {
            const checker = context.program.getTypeChecker()
            const node = getTokenAtPosition(context.sourceFile, context.span.start).parent;
            Debug.assert(isAccessor(node), "it wasn't an accessor");
            const name = unescapeLeadingUnderscores(getTextOfPropertyName(node.name))
            const containingClass = node.parent;
            Debug.assert(isClassLike(containingClass), "it wasn't classlike")
            const bases = getAllSupers(containingClass, checker)
            const base = singleOrUndefined(bases)
            Debug.assert(!!base, "Porbably more than one super:" + bases.length)
            const baseType = checker.getTypeAtLocation(base)
            const baseProp = checker.getPropertyOfType(baseType, name)
            Debug.assert(!!baseProp, "Couldn't find base property for " + name)
            startPosition = baseProp.valueDeclaration.pos
            endPosition = baseProp.valueDeclaration.end
        }
        else {
            Debug.fail("fixPropertyOverrideAccessor codefix got unexpected error code " + context.errorCode);
        }
        const refactorContext = { ...context, file: context.sourceFile, startPosition, endPosition }
        // TODO: Maybe just move most of this into a neutral area.
        return ts.refactor.generateGetAccessorAndSetAccessor.getEditsForAction(refactorContext, Diagnostics.Generate_get_and_set_accessors.message);
    }

    // TODO: Stolen from a different codefix, should dedupe it somewhere.
    function getAllSupers(decl: ClassOrInterface | undefined, checker: TypeChecker): readonly ClassOrInterface[] {
        const res: ClassLikeDeclaration[] = [];
        while (decl) {
            const superElement = getClassExtendsHeritageElement(decl);
            const superSymbol = superElement && checker.getSymbolAtLocation(superElement.expression);
            const superDecl = superSymbol && find(superSymbol.declarations, isClassLike);
            if (superDecl) { res.push(superDecl); }
            decl = superDecl;
        }
        return res;
    }

    type ClassOrInterface = ClassLikeDeclaration | InterfaceDeclaration;
}
