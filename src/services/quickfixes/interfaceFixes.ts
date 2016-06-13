/* @internal */
namespace ts.quickFix {
    registerQuickFix({
        name: "Implement Interface",
        errorCode: "TS2420",
        getFix: (sourceFile: SourceFile, start: number, end: number, program: Program): { newText: string; span: { start: number, length: number } }[] => {
            const token = getTokenAtPosition(sourceFile, start);
            let changesArray: { newText: string; span: { start: number, length: number } }[] = [];

            if(token.kind === SyntaxKind.Identifier) {
                if(token.parent.kind === SyntaxKind.ClassDeclaration) {
                    let classDeclaration = <ClassDeclaration>token.parent;
                    let typeChecker = program.getTypeChecker();

                    let classMembers: Array<string> = [];
                    for (let i = 0; classDeclaration.members && i < classDeclaration.members.length; i++) {
                            if (classDeclaration.members[i].name) {
                                    classMembers.push(classDeclaration.members[i].name.getText());
                            }
                    }

                    let interfaceClauses = ts.getClassImplementsHeritageClauseElements(classDeclaration);
                    let startPos: number = classDeclaration.members.pos;

                    for (let i = 0; interfaceClauses && i < interfaceClauses.length; i++) {
                        let type = typeChecker.getTypeAtLocation(interfaceClauses[i]);
                        if (type && type.symbol && type.symbol.declarations) {
                            let interfaceMembers = (<InterfaceDeclaration>type.symbol.declarations[0]).members;
                            for (let j = 0; interfaceMembers && j < interfaceMembers.length; j++) {
                                    if (interfaceMembers[j].name && classMembers.indexOf(interfaceMembers[j].name.getText()) === -1) {
                                        if (interfaceMembers[j].kind === SyntaxKind.PropertySignature) {
                                            let interfaceProperty = <PropertySignature>interfaceMembers[j];
                                            let propertyText = interfaceProperty.getText() + "sys.newLine";
                                            changesArray.push({ newText: propertyText, span: { start: startPos, length: 0 } });

                                        } else if (interfaceMembers[j].kind === SyntaxKind.MethodSignature) {
                                            let interfaceMethod = <MethodSignature>interfaceMembers[j];
                                            let methodBody = "throw new Error('Method not Implemented');";

                                            let methodText:string = interfaceMethod.getText();
                                            if(methodText.match(/;$/)) {
                                                methodText = methodText.substr(0, methodText.length - 1);
                                            }

                                            methodText = methodText.concat("{sys.newLine");
                                            methodText = methodText.concat(methodBody, "sys.newLine");
                                            methodText = methodText.concat("}sys.newLine");
                                            changesArray.push({ newText: methodText, span: { start: startPos, length: 0 } });
                                        }
                                    }
                            }
                        }
                    }
                }
            }

            if (changesArray.length !== 0)
                return changesArray;

            throw new Error("No Quick Fix found");
        }
    });
}
