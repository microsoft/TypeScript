import * as Lint from "tslint/lib/lint";
import * as ts from "typescript";

function isStringOrNumericLiteral(kind: ts.SyntaxKind) {
    return kind === ts.SyntaxKind.StringLiteral || kind === ts.SyntaxKind.NumericLiteral;
}

function getTextOfPropertyName(name: ts.PropertyName): string {
    switch (name.kind) {
        case ts.SyntaxKind.Identifier:
            return (<ts.Identifier>name).text;
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NumericLiteral:
            return (<ts.LiteralExpression>name).text;
        case ts.SyntaxKind.ComputedPropertyName:
            if (isStringOrNumericLiteral((<ts.ComputedPropertyName>name).expression.kind)) {
                return (<ts.LiteralExpression>(<ts.ComputedPropertyName>name).expression).text;
            }
    }

    return undefined;
}

function arraysEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length)
        return false;
    for (let i: number = arr1.length; i-- ; ) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

function isSameName(signature1: ts.SignatureDeclaration, signature2: ts.SignatureDeclaration): boolean {
    if ((signature1.name !== undefined && signature2.name === undefined) || (signature1.name === undefined && signature2.name !== undefined)) {
        return false;
    }
    if (signature1.name !== undefined && signature2.name !== undefined && (getTextOfPropertyName(signature1.name) !== getTextOfPropertyName(signature2.name))) {
        return false;
    }
    return true;
}

export class Rule extends Lint.Rules.AbstractRule {

    public static FAILURE_STRING_OMITTING_SINGLE_PARAMETER = `Error, write one signature with one optional parameter`;
    public static FAILURE_STRING_SINGLE_PARAMETER_DIFFERENCE = (type1: string, type2: string) => `Error, write one signature taking '${type1}'|'${type2}' instead`;

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const program = ts.createProgram([sourceFile.fileName], Lint.createCompilerOptions());
        const checker = program.getTypeChecker();
        return this.applyWithWalker(new UnifiedSignaturesRule(checker, program.getSourceFile(sourceFile.fileName), this.getOptions()));
    }
}

class UnifiedSignaturesRule extends Lint.BlockScopeAwareRuleWalker<{}, ScopeInfo> {

    constructor(private checker: ts.TypeChecker, file: ts.SourceFile, opts: Lint.IOptions) {
        super(file, opts);
    }

    createScope(): any {
        return undefined;
    }

    createBlockScope(): ScopeInfo {
        return new ScopeInfo();
    }

    isSameSignatureOnChangingSingleParameterType(signature1: ts.SignatureDeclaration, signature2: ts.SignatureDeclaration): string[] {
        const that = this;
        const signature1ParametersType: string[] = signature1.parameters.map(function (parameter: ts.ParameterDeclaration) { return that.checker.typeToString(that.checker.getTypeAtLocation(parameter)); });
        const signature2ParametersType: string[] = signature2.parameters.map(function (parameter: ts.ParameterDeclaration) { return that.checker.typeToString(that.checker.getTypeAtLocation(parameter)); });

        let index = 0;
        while (index < signature1ParametersType.length && index < signature2ParametersType.length && signature1ParametersType[index] === signature2ParametersType[index]) {
            index = index + 1;
        }
        // If index reaches end of either of both the arrays, return []
        if (index === signature1ParametersType.length || index === signature2ParametersType.length) {
            return [];
        }
        // If remaining arrays are equal, the signatures differ by just one parameter type
        if (arraysEqual(signature1ParametersType.slice(index + 1), signature2ParametersType.slice(index + 1))) {
            return [signature1ParametersType[index], signature2ParametersType[index]];
        }
        else {
            return [];
        }
    }

    isSameSignatureOnOmittingSingleParameter(signature1: ts.SignatureDeclaration, signature2: ts.SignatureDeclaration): boolean {
        const that = this;
        const signature1ParametersType: string[] = signature1.parameters.map(function (parameter: ts.ParameterDeclaration) { return that.checker.typeToString(that.checker.getTypeAtLocation(parameter)); });
        const signature2ParametersType: string[] = signature2.parameters.map(function (parameter: ts.ParameterDeclaration) { return that.checker.typeToString(that.checker.getTypeAtLocation(parameter)); });

        let index = 0;
        while (index < signature1ParametersType.length && index < signature2ParametersType.length && signature1ParametersType[index] === signature2ParametersType[index]) {
            index = index + 1;
        }
        // If index reaches end of both the arrays, they are exactly the same signatures
        if (index === signature1ParametersType.length && index === signature2ParametersType.length) {
            return false;
        }
        // If one of them reaches the end, return true if the other has just one element more
        if (signature1ParametersType.slice(index).length === 0) {
            return (signature2ParametersType.slice(index).length === 1);
        }
        else if (signature2ParametersType.slice(index).length === 0) {
            return (signature1ParametersType.slice(index).length === 1);
        }
        // Else check if the arrays are the same on skipping this element
        else {
            return arraysEqual(signature1ParametersType.slice(index), signature2ParametersType.slice(index + 1)) || arraysEqual(signature1ParametersType.slice(index + 1), signature2ParametersType.slice(index));
        }
    }

    isSameReturnType(signature1: ts.SignatureDeclaration, signature2: ts.SignatureDeclaration): boolean {
        const type1: string = this.checker.typeToString(this.checker.getReturnTypeOfSignature(this.checker.getSignatureFromDeclaration(signature1)));
        const type2: string = this.checker.typeToString(this.checker.getReturnTypeOfSignature(this.checker.getSignatureFromDeclaration(signature2)));
        return (type1 === type2);
    }

    visitInterfaceDeclaration(node: ts.InterfaceDeclaration): void {
        const members = node.members;
        for (const member of members) {
            if (member.kind === ts.SyntaxKind.MethodSignature) {
                this.validateSignature(<ts.MethodDeclaration><ts.Node>member);
            }
        }
        super.visitInterfaceDeclaration(node);
    }

    visitMethodDeclaration(node: ts.MethodDeclaration): void {
        this.validateSignature(node);
        super.visitMethodDeclaration(node);
    }

    visitConstructorDeclaration(node: ts.ConstructorDeclaration): void {
        this.validateSignature(node);
        super.visitConstructorDeclaration(node);
    }

    visitArrowFunction(node: ts.FunctionLikeDeclaration): void {
        this.validateSignature(node);
        super.visitArrowFunction(node);
    }

    visitFunctionDeclaration(node: ts.FunctionDeclaration): void {
        this.validateSignature(node);
        super.visitFunctionDeclaration(node);
    }

    visitFunctionExpression(node: ts.FunctionExpression): void {
        this.validateSignature(node);
        super.visitFunctionExpression(node);
    }

    validateSignature(node: ts.SignatureDeclaration) {
        const currentBlockScope = this.getCurrentBlockScope();
        currentBlockScope.methodSignatures.forEach((methodSignature: ts.SignatureDeclaration): void => {
            if (isSameName(methodSignature, node) && this.isSameReturnType(methodSignature, node)) {
                if (this.isSameSignatureOnOmittingSingleParameter(methodSignature, node)) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING_OMITTING_SINGLE_PARAMETER));
                }
                const parameterTypes: string[] = this.isSameSignatureOnChangingSingleParameterType(methodSignature, node);
                if (parameterTypes.length > 0) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING_SINGLE_PARAMETER_DIFFERENCE(parameterTypes[0], parameterTypes[1])));
                }
            }
        });
        currentBlockScope.methodSignatures.push(node);
    }
}

class ScopeInfo {
    public methodSignatures: ts.SignatureDeclaration[] = [];
}
