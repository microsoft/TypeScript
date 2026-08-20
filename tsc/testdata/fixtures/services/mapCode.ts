import {
    Block,
    ClassElement,
    ClassLikeDeclaration,
    createSourceFile,
    FileTextChanges,
    find,
    findAncestor,
    findLast,
    flatten,
    forEach,
    formatting,
    getTokenAtPosition,
    isBlock,
    isClassElement,
    isClassLike,
    isForInOrOfStatement,
    isForStatement,
    isIfStatement,
    isInterfaceDeclaration,
    isLabeledStatement,
    isNamedDeclaration,
    isSourceFile,
    isTypeElement,
    isWhileStatement,
    LanguageServiceHost,
    Mutable,
    Node,
    NodeArray,
    or,
    some,
    SourceFile,
    Statement,
    SyntaxKind,
    textChanges,
    TextSpan,
    TypeElement,
    UserPreferences,
} from "./_namespaces/ts.js";
import { ChangeTracker } from "./textChanges.js";

/** @internal */
export function mapCode(
    sourceFile: SourceFile,
    contents: string[],
    focusLocations: TextSpan[][] | undefined,
    host: LanguageServiceHost,
    formatContext: formatting.FormatContext,
    preferences: UserPreferences,
): FileTextChanges[] {
    return textChanges.ChangeTracker.with(
        { host, formatContext, preferences },
        changeTracker => {
            const parsed = contents.map(c => parse(sourceFile, c));
            const flattenedLocations = focusLocations && flatten(focusLocations);
            for (const nodes of parsed) {
                placeNodeGroup(
                    sourceFile,
                    changeTracker,
                    nodes,
                    flattenedLocations,
                );
            }
        },
    );
}

/**
 * Tries to parse something into either "top-level" statements, or into blocks
 * of class-context definitions.
 */
function parse(sourceFile: SourceFile, content: string): NodeArray<Node> {
    // We're going to speculatively parse different kinds of contexts to see
    // which one makes the most sense, and grab the NodeArray from there. Do
    // this as lazily as possible.
    const nodeKinds = [
        {
            parse: () =>
                createSourceFile(
                    "__mapcode_content_nodes.ts",
                    content,
                    sourceFile.languageVersion,
                    /*setParentNodes*/ true,
                    sourceFile.scriptKind,
                ),
            body: (sf: SourceFile) => sf.statements,
        },
        {
            parse: () =>
                createSourceFile(
                    "__mapcode_class_content_nodes.ts",
                    `class __class {\n${content}\n}`,
                    sourceFile.languageVersion,
                    /*setParentNodes*/ true,
                    sourceFile.scriptKind,
                ),
            body: (cw: SourceFile) => (cw.statements[0] as ClassLikeDeclaration).members,
        },
    ];

    const parsedNodes = [];
    for (const { parse, body } of nodeKinds) {
        const sourceFile = parse();
        const bod = body(sourceFile);
        if (bod.length && sourceFile.parseDiagnostics.length === 0) {
            // If we run into a case with no parse errors, this is likely the right kind.
            return bod;
        }
        // We only want to keep the ones that have some kind of body.
        else if (bod.length) {
            // Otherwise, we'll need to look at others.
            parsedNodes.push({ sourceFile, body: bod });
        }
    }
    // Heuristic: fewer errors = more likely to be the right kind.
    parsedNodes.sort(
        (a, b) =>
            a.sourceFile.parseDiagnostics.length -
            b.sourceFile.parseDiagnostics.length,
    );
    const { body } = parsedNodes[0];
    return body;
}

function placeNodeGroup(
    originalFile: SourceFile,
    changeTracker: ChangeTracker,
    changes: NodeArray<Node>,
    focusLocations?: TextSpan[],
) {
    if (isClassElement(changes[0]) || isTypeElement(changes[0])) {
        placeClassNodeGroup(
            originalFile,
            changeTracker,
            changes as NodeArray<ClassElement>,
            focusLocations,
        );
    }
    else {
        placeStatements(
            originalFile,
            changeTracker,
            changes as NodeArray<Statement>,
            focusLocations,
        );
    }
}

function placeClassNodeGroup(
    originalFile: SourceFile,
    changeTracker: ChangeTracker,
    changes: NodeArray<ClassElement> | NodeArray<TypeElement>,
    focusLocations?: TextSpan[],
) {
    let classOrInterface;
    if (!focusLocations || !focusLocations.length) {
        classOrInterface = find(originalFile.statements, or(isClassLike, isInterfaceDeclaration));
    }
    else {
        classOrInterface = forEach(focusLocations, location =>
            findAncestor(
                getTokenAtPosition(originalFile, location.start),
                or(isClassLike, isInterfaceDeclaration),
            ));
    }

    if (!classOrInterface) {
        // No class? don't insert.
        return;
    }

    const firstMatch = classOrInterface.members.find(member => changes.some(change => matchNode(change, member)));
    if (firstMatch) {
        // can't be undefined here, since we know we have at least one match.
        const lastMatch = findLast(
            classOrInterface.members as NodeArray<ClassElement | TypeElement>,
            member => changes.some(change => matchNode(change, member)),
        )!;

        forEach(changes, wipeNode);
        changeTracker.replaceNodeRangeWithNodes(
            originalFile,
            firstMatch,
            lastMatch,
            changes,
        );
        return;
    }

    forEach(changes, wipeNode);
    changeTracker.insertNodesAfter(
        originalFile,
        classOrInterface.members[classOrInterface.members.length - 1],
        changes,
    );
}

function placeStatements(
    originalFile: SourceFile,
    changeTracker: ChangeTracker,
    changes: NodeArray<Statement>,
    focusLocations?: TextSpan[],
) {
    if (!focusLocations?.length) {
        changeTracker.insertNodesAtEndOfFile(
            originalFile,
            changes,
            /*blankLineBetween*/ false,
        );
        return;
    }

    for (const location of focusLocations) {
        const scope = findAncestor(
            getTokenAtPosition(originalFile, location.start),
            (block): block is Block | SourceFile =>
                or(isBlock, isSourceFile)(block) &&
                some(block.statements, origStmt => changes.some(newStmt => matchNode(newStmt, origStmt))),
        );
        if (scope) {
            const start = scope.statements.find(stmt => changes.some(node => matchNode(node, stmt)));
            if (start) {
                // Can't be undefined here, since we know we have at least one match.
                const end = findLast(scope.statements, stmt => changes.some(node => matchNode(node, stmt)))!;
                forEach(changes, wipeNode);
                changeTracker.replaceNodeRangeWithNodes(
                    originalFile,
                    start,
                    end,
                    changes,
                );
                return;
            }
        }
    }

    let scopeStatements: NodeArray<Statement> = originalFile.statements;
    for (const location of focusLocations) {
        const block = findAncestor(
            getTokenAtPosition(originalFile, location.start),
            isBlock,
        );
        if (block) {
            scopeStatements = block.statements;
            break;
        }
    }
    forEach(changes, wipeNode);
    changeTracker.insertNodesAfter(
        originalFile,
        scopeStatements[scopeStatements.length - 1],
        changes,
    );
}

function matchNode(a: Node, b: Node): boolean {
    if (a.kind !== b.kind) {
        return false;
    }

    if (a.kind === SyntaxKind.Constructor) {
        return a.kind === b.kind;
    }

    if (isNamedDeclaration(a) && isNamedDeclaration(b)) {
        return a.name.getText() === b.name.getText();
    }

    if (isIfStatement(a) && isIfStatement(b)) {
        return (
            a.expression.getText() === b.expression.getText()
        );
    }

    if (isWhileStatement(a) && isWhileStatement(b)) {
        return (
            a.expression.getText() ===
                b.expression.getText()
        );
    }

    if (isForStatement(a) && isForStatement(b)) {
        return (
            a.initializer?.getText() ===
                b.initializer?.getText() &&
            a.incrementor?.getText() ===
                b.incrementor?.getText() &&
            a.condition?.getText() === b.condition?.getText()
        );
    }

    if (isForInOrOfStatement(a) && isForInOrOfStatement(b)) {
        return (
            a.expression.getText() ===
                b.expression.getText() &&
            a.initializer.getText() ===
                b.initializer.getText()
        );
    }

    if (isLabeledStatement(a) && isLabeledStatement(b)) {
        // If we're actually labeling/naming something, we should be a bit
        // more lenient about when we match, so we don't care what the actual
        // related statement is: we just replace.
        return a.label.getText() === b.label.getText();
    }

    if (a.getText() === b.getText()) {
        return true;
    }

    return false;
}

function wipeNode(node: Mutable<Node>) {
    resetNodePositions(node);
    node.parent = undefined!;
}

function resetNodePositions(node: Mutable<Node>) {
    node.pos = -1;
    node.end = -1;
    node.forEachChild(resetNodePositions);
}
