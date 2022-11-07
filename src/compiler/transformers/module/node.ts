/*@internal*/
namespace ts {
export function transformNodeModule(context: ts.TransformationContext) {
    const previousOnSubstituteNode = context.onSubstituteNode;
    const previousOnEmitNode = context.onEmitNode;

    const esmTransform = ts.transformECMAScriptModule(context);

    const esmOnSubstituteNode = context.onSubstituteNode;
    const esmOnEmitNode = context.onEmitNode;

    context.onSubstituteNode = previousOnSubstituteNode;
    context.onEmitNode = previousOnEmitNode;

    const cjsTransform = ts.transformModule(context);

    const cjsOnSubstituteNode = context.onSubstituteNode;
    const cjsOnEmitNode = context.onEmitNode;

    context.onSubstituteNode = onSubstituteNode;
    context.onEmitNode = onEmitNode;
    context.enableSubstitution(ts.SyntaxKind.SourceFile);
    context.enableEmitNotification(ts.SyntaxKind.SourceFile);

    let currentSourceFile: ts.SourceFile | undefined;
    return transformSourceFileOrBundle;

    function onSubstituteNode(hint: ts.EmitHint, node: ts.Node) {
        if (ts.isSourceFile(node)) {
            currentSourceFile = node;
            // Neither component transform wants substitution notifications for `SourceFile`s, and, in fact, relies on
            // the source file emit notification to setup scope variables for substitutions (so we _cannot_ call their substitute
            // functions on source files safely, as that context only gets setup in a later pipeline phase!)
            return previousOnSubstituteNode(hint, node);
        }
        else {
            if (!currentSourceFile) {
                return previousOnSubstituteNode(hint, node);
            }
            if (currentSourceFile.impliedNodeFormat === ts.ModuleKind.ESNext) {
                return esmOnSubstituteNode(hint, node);
            }
            return cjsOnSubstituteNode(hint, node);
        }
    }

    function onEmitNode(hint: ts.EmitHint, node: ts.Node, emitCallback: (hint: ts.EmitHint, node: ts.Node) => void): void {
        if (ts.isSourceFile(node)) {
            currentSourceFile = node;
        }
        if (!currentSourceFile) {
            return previousOnEmitNode(hint, node, emitCallback);
        }
        if (currentSourceFile.impliedNodeFormat === ts.ModuleKind.ESNext) {
            return esmOnEmitNode(hint, node, emitCallback);
        }
        return cjsOnEmitNode(hint, node, emitCallback);
    }

    function getModuleTransformForFile(file: ts.SourceFile): (typeof esmTransform) {
        return file.impliedNodeFormat === ts.ModuleKind.ESNext ? esmTransform : cjsTransform;
    }

    function transformSourceFile(node: ts.SourceFile) {
        if (node.isDeclarationFile) {
            return node;
        }

        currentSourceFile = node;
        const result = getModuleTransformForFile(node)(node);
        currentSourceFile = undefined;
        ts.Debug.assert(ts.isSourceFile(result));
        return result;
    }

    function transformSourceFileOrBundle(node: ts.SourceFile | ts.Bundle) {
        return node.kind === ts.SyntaxKind.SourceFile ? transformSourceFile(node) : transformBundle(node);
    }

    function transformBundle(node: ts.Bundle) {
        return context.factory.createBundle(ts.map(node.sourceFiles, transformSourceFile), node.prepends);
    }
}
}
