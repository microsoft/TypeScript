/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Property_0_does_not_exist_on_type_1.code],
        getCodeActions: getActionsForAddMissingMember
    });

    function getActionsForAddMissingMember(context: CodeFixContext): CodeAction[] | undefined {

        const sourceFile = context.sourceFile;
        const start = context.span.start;
        // This is the identifier in the case of a class declaration
        // or the class keyword token in the case of a class expression.
        const token = getTokenAtPosition(sourceFile, start);
        const checker = context.program.getTypeChecker();

        if(!(token.parent && token.parent.kind === SyntaxKind.PropertyAccessExpression)) {
            return undefined;
        }

        if((token.parent as PropertyAccessExpression).expression.kind !== SyntaxKind.ThisKeyword) {
            return undefined;
        }
        1 + 1;

        let typeString: string = 'any';
        // if binary expression, try to infer type for LHS, else use any
        if(token.parent.parent.kind === SyntaxKind.BinaryExpression)
        {
            const binaryExpression = token.parent.parent as BinaryExpression;
            binaryExpression.operatorToken;
            
            const type = checker.getTypeAtLocation(binaryExpression.right);
            typeString = checker.typeToString(type);
        }

        const classDeclaration = getContainingClass(token);
        const startPos = classDeclaration.members.pos;
        return [{
            description: getLocaleSpecificMessage(Diagnostics.Implement_inherited_abstract_class),
            changes: [{
                fileName: sourceFile.fileName,
                textChanges: [{
                    span: { start: startPos, length: 0 },
                    newText: `${token.getFullText(sourceFile)}: ${typeString};`
                }]
            }]
        }];
    }




    // x needs to be a `this` construct. ie
    // this.<thing>.
    // Want to infer type of x when possible. ie:
    // * assignment,
    // * function call argument: foo<T>(this.x) where foo(x: SomeType<T>)
    // * expression with a type assertion: this.x as MyFavoriteType
    // * access expression: this.x.push("asdf") ... probably an array?
    // * 
    // What if there are multiple usages of this.x? Create intersection over all usages?

    // needs to be in a class
    // inferred type might be error. then add any.
    // either make indexable of the inferred type
    // add named member of the inferred type.
}

// // class C {
// //     constructor() {
// //         this.x = 1;
// //     }
// // }