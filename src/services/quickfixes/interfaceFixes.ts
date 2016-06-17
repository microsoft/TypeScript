/* @internal */
namespace ts.quickFix {
    registerQuickFix({
        name: "Implement Interface on Reference",
        errorCode: "TS2322",
        getFix: (sourceFile: SourceFile, start: number, end: number, program: Program): { newText: string; span: { start: number, length: number } }[] => {
            const token = getTokenAtPosition(sourceFile, start);
            let changesArray: { newText: string; span: { start: number, length: number } }[] = [];

            if (token.kind === SyntaxKind.Identifier && token.parent.kind === SyntaxKind.VariableDeclaration) {
                let variableDeclaration = <VariableDeclaration>token.parent;
                let membersAndStartPosObject: { startPos: number, members: Array<string> } = getMembersAndStartPosFromReference(variableDeclaration);
                let variableMembers: Array<string> = membersAndStartPosObject.members;
                let trackingAddedMembers: Array<string> = [];
                let startPos: number = membersAndStartPosObject.startPos;

                if (variableDeclaration.type.kind === SyntaxKind.TypeReference) {
                    changesArray = changesArray.concat(getChanges(variableDeclaration.type, variableMembers, startPos, program, true, trackingAddedMembers));
                }
                else if(variableDeclaration.type.kind === SyntaxKind.UnionType) {
                    let types = (<UnionTypeNode>variableDeclaration.type).types;
                    for (let i = 0; i < types.length; i++) {
                        changesArray = changesArray.concat(getChanges(types[i], variableMembers, startPos, program, true, trackingAddedMembers));
                    }
                }
            }

            if (changesArray.length !== 0)
                return changesArray;

            throw new Error("No Quick Fix found");
        }
    });

    registerQuickFix({
        name: "Implement Interface On Class",
        errorCode: "TS2420",
        getFix: (sourceFile: SourceFile, start: number, end: number, program: Program): { newText: string; span: { start: number, length: number } }[] => {
            const token = getTokenAtPosition(sourceFile, start);
            let changesArray: { newText: string; span: { start: number, length: number } }[] = [];

            if (token.kind === SyntaxKind.Identifier && token.parent.kind === SyntaxKind.ClassDeclaration) {
                let classDeclaration = <ClassDeclaration>token.parent;
                let startPos: number = classDeclaration.members.pos;
                let classMembers: Array<string> = getClassMembers(classDeclaration);
                let trackingAddedMembers: Array<string> = [];
                let interfaceClauses = ts.getClassImplementsHeritageClauseElements(classDeclaration);

                for (let i = 0; interfaceClauses && i < interfaceClauses.length; i++) {
                    changesArray = changesArray.concat(getChanges(interfaceClauses[i], classMembers, startPos, program, false, trackingAddedMembers));
                }
            }

            if (changesArray.length !== 0)
                return changesArray;

            throw new Error("No Quick Fix found");
        }
    });

    function getChanges(interfaceClause: Node, existingMembers: Array<string>, startPos: number, program: Program, reference: boolean, trackingAddedMembers: Array<string>): { newText: string; span: { start: number, length: number } }[] {
        let type = program.getTypeChecker().getTypeAtLocation(interfaceClause);
        let changesArray: { newText: string; span: { start: number, length: number } }[] = [];

        if (type && type.symbol && type.symbol.declarations) {
            let interfaceMembers = getMembers(<InterfaceDeclaration>type.symbol.declarations[0], program);
            for (let j = 0; interfaceMembers && j < interfaceMembers.length; j++) {
                if (interfaceMembers[j].name && existingMembers.indexOf(interfaceMembers[j].name.getText()) === -1) {
                    if (interfaceMembers[j].kind === SyntaxKind.PropertySignature) {
                        let interfaceProperty = <PropertySignature>interfaceMembers[j];
                        if(trackingAddedMembers.indexOf(interfaceProperty.name.getText()) === -1) {
                            let propertyText:string = "";
                            if(reference) {
                                propertyText = interfaceProperty.name.getText();
                                propertyText += " : ";
                                propertyText += getDefaultValue(interfaceProperty.type.kind)
                                propertyText += ",sys.newLine";
                            } else {
                                propertyText = interfaceProperty.getText();
                                let stringToAdd:string = (propertyText.match(/;$/) === null) ? ";sys.newLine" : "sys.newLine";
                                propertyText += stringToAdd;
                            }
                            changesArray.push({ newText: propertyText, span: { start: startPos, length: 0 } });
                            trackingAddedMembers.push(interfaceProperty.name.getText());
                        }
                    } else if (interfaceMembers[j].kind === SyntaxKind.MethodSignature) {
                        let interfaceMethod = <MethodSignature>interfaceMembers[j];
                        if (trackingAddedMembers.indexOf(interfaceMethod.name.getText())) {
                            let methodName = interfaceMethod.name.getText();
                            let typeParameterArray: Array<string> = [];
                            for (let k = 0; interfaceMethod.typeParameters && k < interfaceMethod.typeParameters.length; k++) {
                                typeParameterArray.push(interfaceMethod.typeParameters[k].getText());
                            }
                            let parameterArray: Array<string> = [];
                            for (let k = 0; interfaceMethod.parameters && k < interfaceMethod.parameters.length; k++) {
                                parameterArray.push(interfaceMethod.parameters[k].getText());
                            }
                            let methodBody = "throw new Error('Method not Implemented');";

                            let methodText: string = methodName;
                            if (typeParameterArray.length > 0) {
                                methodText += "<"
                            }
                            for (let k = 0; k < typeParameterArray.length; k++) {
                                methodText += typeParameterArray[k];
                                if(k !== typeParameterArray.length - 1) {
                                    methodText += ",";
                                }
                            }
                            if (typeParameterArray.length > 0) {
                                methodText += ">"
                            }
                            methodText += "(";
                            for (let k = 0; k < parameterArray.length; k++) {
                                methodText += parameterArray[k];
                                if (k !== parameterArray.length - 1) {
                                    methodText += ",";
                                }
                            }
                            methodText += ")";
                            methodText += "{sys.newLine ";
                            methodText += methodBody;
                            methodText += "sys.newLine";
                            methodText = reference ? methodText.concat("},sys.newLine") : methodText.concat("}sys.newLine");
                            changesArray.push({ newText: methodText, span: { start: startPos, length: 0 } });
                            trackingAddedMembers.push(interfaceMethod.name.getText());
                        }
                    } else if (interfaceMembers[j].kind === SyntaxKind.MethodDeclaration) {
                        let classMethod = <MethodSignature>interfaceMembers[j];
                        if (trackingAddedMembers.indexOf(classMethod.name.getText())) {
                            let methodName = classMethod.name.getText();
                            let typeParameterArray: Array<string> = [];
                            for (let k = 0; classMethod.typeParameters && k < classMethod.typeParameters.length; k++) {
                                typeParameterArray.push(classMethod.typeParameters[k].getText());
                            }
                            let parameterArray: Array<string> = [];
                            for (let k = 0; classMethod.parameters && k < classMethod.parameters.length; k++) {
                                parameterArray.push(classMethod.parameters[k].getText());
                            }
                            let methodBody = "throw new Error('Method not Implemented');";

                            let methodText: string = methodName;
                            if (typeParameterArray.length > 0) {
                                methodText += "<"
                            }
                            for (let k = 0; k < typeParameterArray.length; k++) {
                                methodText += typeParameterArray[k];
                                if (k !== typeParameterArray.length - 1) {
                                    methodText += ",";
                                }
                            }
                            if (typeParameterArray.length > 0) {
                                methodText += ">"
                            }
                            methodText += "(";
                            for (let k = 0; k < parameterArray.length;k++) {
                                methodText += parameterArray[k];
                                if(k !== parameterArray.length -1) {
                                    methodText += ",";
                                }
                            }
                            methodText += ")";
                            methodText += "{sys.newLine ";
                            methodText += methodBody;
                            methodText += "sys.newLine";
                            methodText = reference ? methodText.concat("},sys.newLine") : methodText.concat("}sys.newLine");
                            changesArray.push({ newText: methodText, span: { start: startPos, length: 0 } });
                            trackingAddedMembers.push(classMethod.name.getText());
                        }
                    }
                }
            }
        }

        if(reference && existingMembers.length === 0 && changesArray.length > 0) {
            let lastValue:string = changesArray[changesArray.length - 1].newText;
            lastValue = lastValue.substr(0, lastValue.length - 12);
            lastValue = lastValue + " sys.newLine";
            changesArray[changesArray.length - 1].newText = lastValue;
        }

        return changesArray;
    }

    function getMembers(declaration: InterfaceDeclaration, program: Program): Array<TypeElement> {
        let clauses = getInterfaceBaseTypeNodes(declaration);
        let result = new Array<TypeElement>();
        for (let i = 0; clauses && i < clauses.length; i++) {
            let type = program.getTypeChecker().getTypeAtLocation(clauses[i]);
            if (type && type.symbol && type.symbol.declarations) {
                result = result.concat(getMembers(<InterfaceDeclaration>type.symbol.declarations[0], program));
            }
        }

        if (declaration.members) {
            result = result.concat(declaration.members);
        }

        return result;
    }

    function getClassMembers(classDeclaration: ClassDeclaration): Array<string> {
        let classMembers: Array<string> = [];
        for (let i = 0; classDeclaration.members && i < classDeclaration.members.length; i++) {
            if (classDeclaration.members[i].name) {
                classMembers.push(classDeclaration.members[i].name.getText());
            }
        }
        return classMembers;
    }

    function getMembersAndStartPosFromReference(variableDeclaration: VariableDeclaration): { startPos: number, members: Array<string> } {
        let children: Node[] = variableDeclaration.getChildren();
        let variableMembers: Array<string> = new Array<string>();
        let startPos: number = 0;

        for (let i = 0; i < children.length; i++) {
            if (children[i].kind === SyntaxKind.ObjectLiteralExpression) {
                startPos = children[i].pos + 1;
                let properties = (<ObjectLiteralExpression>children[i]).properties;
                for (let j = 0; properties && j < properties.length; j++) {
                    if (properties[j].name) {
                        variableMembers.push(properties[j].name.getText());
                    }
                }
            }
        }

        return { startPos: startPos, members: variableMembers };
    }

    function getDefaultValue(kind: SyntaxKind): string {
        switch(kind) {
            case SyntaxKind.StringKeyword:
                return '""';
            case SyntaxKind.BooleanKeyword:
                return "false";
            case SyntaxKind.NumberKeyword:
                return "0";
        }
        return "null";
    }
}
