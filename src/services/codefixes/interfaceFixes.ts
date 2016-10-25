/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Class_0_incorrectly_implements_interface_1.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start);
            const checker = context.program.getTypeChecker();

            if (token.kind === SyntaxKind.Identifier && isClassLike(token.parent)) {
                const classDeclaration = <ClassDeclaration>token.parent;
                const startPos: number = classDeclaration.members.pos;
                const classMembers = ts.map(getNamedClassMemberDeclarations(classDeclaration), member => member.name.getText());
                const trackingAddedMembers: string[] = [];
                const interfaceClauses = ts.getClassImplementsHeritageClauseElements(classDeclaration);

                let textChanges: TextChange[] = undefined;

                for (let i = 0; interfaceClauses && i < interfaceClauses.length; i++) {
                    let newChanges = getChanges(interfaceClauses[i], classMembers, startPos, checker, /*reference*/ false, trackingAddedMembers, context.newLineCharacter);
                    textChanges = textChanges ? textChanges.concat(newChanges) : newChanges;
                }

                if (textChanges && textChanges.length > 0) {
                    return [{
                        description: getLocaleSpecificMessage(Diagnostics.Implement_interface_on_class),
                        changes: [{
                            fileName: sourceFile.fileName,
                            textChanges: textChanges
                        }]
                    }];
                }
            }

            return undefined;
        }
    });

    registerCodeFix({
        errorCodes: [Diagnostics.Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start);
            const checker = context.program.getTypeChecker();

            let textChanges: TextChange[] = [];

            if (token.kind === SyntaxKind.Identifier &&  isClassLike(token.parent)) {
                const classDeclaration = <ClassDeclaration>token.parent;
                const startPos = classDeclaration.members.pos;
                const abstractClassMembers = ts.map(getNamedClassAbstractMemberDeclarations(classDeclaration), member => member.name.getText());
                const trackingAddedMembers: string[] = [];
                const extendsClause = ts.getClassExtendsHeritageClauseElement(classDeclaration);
                textChanges = textChanges.concat(getChanges(extendsClause, abstractClassMembers, startPos, checker, /*reference*/ false, trackingAddedMembers, context.newLineCharacter));
            }

            if (textChanges.length > 0) {
                return [{
                    description: getLocaleSpecificMessage(Diagnostics.Implement_inherited_abstract_class),
                    changes: [{
                        fileName: sourceFile.fileName,
                        textChanges: textChanges
                    }]
                }];
            }

            return undefined;
        }
    });

    function getChanges(interfaceClause: Node, existingMembers: string[], startPos: number, checker: TypeChecker, reference: boolean, trackingAddedMembers: string[], newLineCharacter: string): TextChange[] {
        const type = checker.getTypeAtLocation(interfaceClause);
        const changesArray: TextChange[] = [];

        if (type && type.symbol && type.symbol.declarations) {
            const interfaceMembers = getMembers(<InterfaceDeclaration>type.symbol.declarations[0], checker);
            for (let j = 0; interfaceMembers && j < interfaceMembers.length; j++) {
                if (interfaceMembers[j].name && existingMembers.indexOf(interfaceMembers[j].name.getText()) === -1) {
                    if (interfaceMembers[j].kind === SyntaxKind.PropertySignature) {
                        const interfaceProperty = <PropertySignature>interfaceMembers[j];
                        if (trackingAddedMembers.indexOf(interfaceProperty.name.getText()) === -1) {
                            let propertyText = "";
                            if (reference) {
                                propertyText = `${interfaceProperty.name.getText()} : ${getDefaultValue(interfaceProperty.type.kind)},${newLineCharacter}`;
                            }
                            else {
                                propertyText = interfaceProperty.getText();
                                const stringToAdd = !(propertyText.match(/;$/)) ? `;${newLineCharacter}` : newLineCharacter;
                                propertyText += stringToAdd;
                            }
                            changesArray.push({ newText: propertyText, span: { start: startPos, length: 0 } });
                            trackingAddedMembers.push(interfaceProperty.name.getText());
                        }
                    }
                    else if (interfaceMembers[j].kind === SyntaxKind.MethodSignature || interfaceMembers[j].kind === SyntaxKind.MethodDeclaration) {
                        const interfaceMethod = <MethodSignature>interfaceMembers[j];
                        handleMethods(interfaceMethod, startPos, reference, trackingAddedMembers, changesArray, newLineCharacter);
                    }
                }
            }
        }

        if (reference && existingMembers.length === 0 && changesArray.length > 0) {
            let lastValue = changesArray[changesArray.length - 1].newText;
            lastValue = `${lastValue.substr(0, lastValue.length - (newLineCharacter.length + 1))} ${newLineCharacter}`;
            changesArray[changesArray.length - 1].newText = lastValue;
        }

        return changesArray;
    }

    function getMembers(declaration: InterfaceDeclaration, checker: TypeChecker): TypeElement[] {
        const clauses = getInterfaceBaseTypeNodes(declaration);
        let result: TypeElement[] = [];
        for (let i = 0; clauses && i < clauses.length; i++) {
            const type = checker.getTypeAtLocation(clauses[i]);
            if (type && type.symbol && type.symbol.declarations) {
                result = result.concat(getMembers(<InterfaceDeclaration>type.symbol.declarations[0], checker));
            }
        }

        if (declaration.members) {
            result = result.concat(declaration.members);
        }

        return result;
    }

    function getNamedClassMemberDeclarations(classDeclaration: ClassDeclaration): ClassElement[] {
        return classDeclaration.members.filter(member => member.name);
    }

    function getNamedClassAbstractMemberDeclarations(classDeclaration: ClassDeclaration): ClassElement[] {
        return getNamedClassMemberDeclarations(classDeclaration).filter(member => getModifierFlags(member) & ModifierFlags.Abstract);
    }

    function getMembersAndStartPosFromReference(variableDeclaration: VariableDeclaration): { startPos: number, members: string[] } {
        const children = variableDeclaration.getChildren();
        const variableMembers: string[] = [];
        let startPos = 0;

        ts.forEach(children, child => {
            if (child.kind === SyntaxKind.ObjectLiteralExpression) {
                const properties = (<ObjectLiteralExpression>child).properties;
                if (properties) {
                    startPos = properties.pos;
                }
                for (let j = 0; properties && j < properties.length; j++) {
                    if (properties[j].name) {
                        variableMembers.push(properties[j].name.getText());
                    }
                }
            }
        });

        return { startPos: startPos, members: variableMembers };
    }

    function getDefaultValue(kind: SyntaxKind): string {
        switch (kind) {
            case SyntaxKind.StringKeyword:
                return '""';
            case SyntaxKind.BooleanKeyword:
                return "false";
            case SyntaxKind.NumberKeyword:
                return "0";
            default:
                return "null";
        }
    }

    function handleMethods(interfaceMethod: MethodSignature, startPos: number, isReference: boolean, trackingAddedMembers: string[], textChanges: TextChange[], newLineCharacter: string) {
        const methodBody = "throw new Error('Method not Implemented');";

        if (trackingAddedMembers.indexOf(interfaceMethod.name.getText())) {
            const methodName = interfaceMethod.name.getText();
            const typeParameterArray: string[] = [];

            for (let i = 0; interfaceMethod.typeParameters && i < interfaceMethod.typeParameters.length; i++) {
                typeParameterArray.push(interfaceMethod.typeParameters[i].getText());
            }

            const parameterArray: string[] = [];
            for (let j = 0; interfaceMethod.parameters && j < interfaceMethod.parameters.length; j++) {
                parameterArray.push(interfaceMethod.parameters[j].getText());
            }

            let methodText = methodName;
            if (typeParameterArray.length > 0) {
                methodText += "<";
            }

            for (let k = 0; k < typeParameterArray.length; k++) {
                methodText += typeParameterArray[k];
                if (k !== typeParameterArray.length - 1) {
                    methodText += ",";
                }
            }

            if (typeParameterArray.length > 0) {
                methodText += ">";
            }

            methodText += "(";
            for (let k = 0; k < parameterArray.length; k++) {
                methodText += parameterArray[k];
                if (k !== parameterArray.length - 1) {
                    methodText += ",";
                }
            }

            methodText += `)`;
            if (interfaceMethod.type) {
                methodText += ":" + interfaceMethod.type.getText();
            }

            methodText += `{${newLineCharacter}${methodBody}${newLineCharacter}`;
            methodText = isReference ? methodText.concat(`},${newLineCharacter}`) : methodText.concat(`}${newLineCharacter}`);

            textChanges.push({ newText: methodText, span: { start: startPos, length: 0 } });
            trackingAddedMembers.push(interfaceMethod.name.getText());
        }
    }
}
