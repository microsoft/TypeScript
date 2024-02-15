import {
    Block,
    ClassElement,
    ClassLikeDeclaration,
    createSourceFile,
    factory,
    FileTextChanges,
    forEach,
    forEachChild,
    formatting,
    hasJSDocNodes,
    InterfaceDeclaration,
    isBlock,
    isClassElement,
    isClassLike,
    isNamedDeclaration,
    isSourceFile,
    isSourceFileJS,
    isTypeElement,
    LanguageServiceHost,
    NamedDeclaration,
    Node,
    NodeArray,
    Program,
    ScriptTarget,
    SourceFile,
    SourceMapper,
    Statement,
    SyntaxKind,
    sysLog,
    textChanges,
    TextSpan,
    TypeElement,
    UserPreferences,
} from "./_namespaces/ts";
import {
    ChangeTracker,
} from "./textChanges";

/** @internal */
export function mapCode(
    mappings: { sourceFile?: SourceFile; contents: string[]; focusLocations?: TextSpan[][]; }[],
    _program: Program,
    host: LanguageServiceHost,
    formatContext: formatting.FormatContext,
    preferences: UserPreferences,
    _sourceMapper: SourceMapper,
    _updates?: FileTextChanges[],
): FileTextChanges[] {
    try {
        return textChanges.ChangeTracker.with(
            { host, formatContext, preferences },
            changeTracker => {
                mappings.forEach(({ sourceFile, contents, focusLocations }) => {
                    if (!sourceFile) {
                        // TODO(@zkat): uhhh... do something about file-less mappings. Not supported for now.
                        return;
                    }
                    const parsed = contents.map(parse);
                    for (const nodes of parsed) {
                        placeNodeGroup(sourceFile, changeTracker, nodes, focusLocations);
                    }
                });
            },
        );
    }
    catch (e) {
        sysLog(`mapCode: ${e}`);
        return [];
    }
}

/**
 * Tries to parse something into either "top-level" statements, or into blocks
 * of class-context definitions.
 * @param content
 */
function parse(content: string): NodeArray<Node> {
    // We're going to speculatively parse different kinds of contexts to see
    // which one makes the most sense, and grab the NodeArray from there. Do
    // this as lazily as possible.
    const nodeKinds = [
        { parse: () => createSourceFile("__mapcode_content_nodes.ts", content, ScriptTarget.Latest, /*setParentNodes*/ true), body: (sf: SourceFile) => sf.statements },
        { parse: () => createSourceFile("__mapcode_class_content_nodes.ts", `class __class {\n${content}\n}`, ScriptTarget.Latest, /*setParentNodes*/ true), body: (cw: SourceFile) => (cw.statements[0] as ClassLikeDeclaration).members },
    ];
    const parsedNodes = [];
    for (const { parse, body } of nodeKinds) {
        const sourceFile = parse();
        if (sourceFile.parseDiagnostics.length === 0) {
            // If we run into a case with no parse errors, this is likely the right kind.
            return body(sourceFile);
        }
        else {
            // Otherwise, we'll need to look at others.
            parsedNodes.push({ sourceFile, body });
        }
    }
    // Heuristic: fewer errors = more likely to be the right kind.
    parsedNodes.sort((a, b) => a.sourceFile.parseDiagnostics.length - b.sourceFile.parseDiagnostics.length);
    return parsedNodes[0].body(parsedNodes[0].sourceFile);
}

function placeNodeGroup(file: SourceFile, changeTracker: ChangeTracker, nodes: NodeArray<Node>, focusLocations?: TextSpan[][]) {
    // 1. Grab the first node, see what kind it is, to see whether we'll need
    //    to expand our scope.
    // 2. Get nodes for each focusLocation by finding the specific node that
    //    contains it, and making a comparison with the first node type.
    // 3. Figure out how much of a range we're going to replace or insert by
    //    using first and last node from `nodes`. Use node types and names to
    //    match ranges.
    if (isClassElement(nodes[0])) {
        placeClassNodeGroup(file, changeTracker, nodes as NodeArray<ClassElement>, focusLocations);
    }
    else if (isTypeElement(nodes[0])) {
        placeClassNodeGroup(file, changeTracker, nodes as NodeArray<TypeElement>, focusLocations);
    }
    else {
        placeStatements(file, changeTracker, nodes as NodeArray<Statement>, focusLocations);
    }
}

function placeClassNodeGroup(file: SourceFile, changeTracker: ChangeTracker, nodes: NodeArray<ClassElement> | NodeArray<TypeElement>, focusLocations?: TextSpan[][]) {
    // We have one or more class-ish members.
    //
    // 1. If focusLocations is null/undefined, find the first class in the
    //    SourceFile and insert/replace into that class.
    // 2. If we have focusLocations, go over each one and:
    //   a. Find the nearest class or interface declaration that contains the focusLocation.
    let classOrInterface: ClassLikeDeclaration | InterfaceDeclaration | undefined;
    if (!focusLocations || !focusLocations.length) {
        for (const stmt of file.statements) {
            if (isClassLike(stmt)) {
                classOrInterface = stmt;
                break;
            }
            else if (stmt.kind === SyntaxKind.InterfaceDeclaration) {
                classOrInterface = stmt as InterfaceDeclaration;
                break;
            }
        }
    }
    else {
        let node: Node | undefined;
        top: for (const locationGroup of focusLocations) {
            for (const location of locationGroup) {
                node = findAncestor(getNodeAtPosition(file, location.start), node => {
                    return isClassLike(node) || node.kind === SyntaxKind.InterfaceDeclaration;
                });
                if (node && node.kind === SyntaxKind.InterfaceDeclaration) {
                    classOrInterface = node as InterfaceDeclaration;
                    break top;
                }
                else if (node) {
                    classOrInterface = node as ClassLikeDeclaration;
                    break top;
                }
            }
        }
    }

    if (!classOrInterface) {
        throw new Error("Failed to find a class or interface to map the given code into.");
    }
    else {
        const classEls: ClassElement[] = [];
        const typeEls: TypeElement[] = [];
        top: for (const node of nodes) {
            for (const member of classOrInterface.members) {
                if (matchNode(node, member)) {
                    // If we have corresponding nodes, replace the old one with the new member.
                    changeTracker.replaceNode(file, member, node);
                    continue top;
                }
            }
            // Otherwise, we insert this node at the end of the class/interface.
            if (isClassElement(node)) {
                classEls.push(node);
            }
            else if (isTypeElement(node)) {
                typeEls.push(node);
            }
        }
        if (classEls.length || typeEls.length) {
            if (classOrInterface.members.length === 0) {
                if (classEls.length) {
                    const newNode = { ...classOrInterface, members: factory.createNodeArray(classEls) };
                    changeTracker.replaceNode(file, classOrInterface, newNode);
                }
                else {
                    const newNode = { ...classOrInterface, members: factory.createNodeArray(typeEls) };
                    changeTracker.replaceNode(file, classOrInterface, newNode);
                }
            }
            else if (classEls.length) {
                changeTracker.insertNodesAfter(file, classOrInterface.members[classOrInterface.members.length - 1], classEls);
            }
            else if (typeEls.length) {
                changeTracker.insertNodesAfter(file, classOrInterface.members[classOrInterface.members.length - 1], typeEls);
            }
            else {
                throw new Error("Nothing to append");
            }
        }
    }
}

function placeStatements(file: SourceFile, changeTracker: ChangeTracker, nodes: NodeArray<Statement>, focusLocations?: TextSpan[][]) {
    // If there's an empty or null focusLocation, we just shove everything at
    // the end of the file and call it a day.
    if (!focusLocations || !focusLocations.length) {
        changeTracker.insertNodesAtEndOfFile(file, nodes, /*blankLineBetween*/ false);
        return;
    }

    // Otherwise, we'll need to find the right place to insert or replace.

    // First, we try and find a nearby frame of reference: are there
    // declarations with similar names nearby?
    for (const locationGroup of focusLocations) {
        for (const location of locationGroup) {
            const scope: Node | undefined = findAncestor(getNodeAtPosition(file, location.start), node => {
                if (!isBlock(node) && !isSourceFile(node)) {
                    return false;
                }
                for (const stmt of node.statements) {
                    for (const node of nodes) {
                        if (matchNode(node, stmt)) {
                            return true;
                        }
                    }
                }
                return false;
            });
            if (scope) {
                // We found a scope that contains a matching node.

                // First we find the last match of the range we're replacing.
                // That is, assuming we have the following code to start with:
                //
                // ```ts
                // function foo() {
                //     console.log("hello");
                // }
                // function bar() {
                //     console.log("world");
                // }
                // function baz() {
                //     console.log("!");
                // }
                // function other() {
                //    console.log("Leave me alone!");
                // }
                // ```
                //
                // And we get a map request with the following code:
                //
                // ```ts
                // function bar() {
                //     console.log("world");
                // }
                // function baz() {
                //     console.log("!");
                // }
                // function qux() {
                //     console.log("?");
                // }
                // ```
                //
                // `bar` will be the beginning of our range, and we want to
                // have `baz` in the original be the end of our replacement
                // range. `other` should be left intact, while `qux` should be
                // "injected" before it.
                //
                // We do this by scanning the scope for all nodes that have a
                // match in the incoming map request code, then sorting and
                // picking first and last by position, and that will be our
                // range for replacement.
                const matches = (scope as Block).statements.filter(stmt => nodes.some(node => matchNode(node, stmt)));
                matches.sort((a, b) => a.pos - b.pos);
                changeTracker.replaceNodeRangeWithNodes(file, matches[0], matches[matches.length - 1], nodes);
                // はい、できました！
                return;
            }
        }
    }

    // If we have no frame of reference, we'll just insert at the end of the
    // nearest statements scope, or, if we can't find a block, at the top
    // level of the source file.
    let scopeStatements: NodeArray<Statement> = file.statements;
    top: for (const locationGroup of focusLocations) {
        for (const location of locationGroup) {
            const block = findAncestor(getNodeAtPosition(file, location.start), isBlock);
            if (block) {
                scopeStatements = (block as Block).statements;
                break top;
            }
        }
    }
    changeTracker.insertNodesAfter(file, scopeStatements[scopeStatements.length - 1], nodes);
}

function getNodeAtPosition(sourceFile: SourceFile, position: number): Node {
    const isJavaScriptFile = isSourceFileJS(sourceFile);
    let current: Node = sourceFile;
    const getContainingChild = (child: Node) => {
        if (child.pos <= position && (position < child.end || (position === child.end && (child.kind === SyntaxKind.EndOfFileToken)))) {
            return child;
        }
    };
    while (true) {
        const child = isJavaScriptFile && hasJSDocNodes(current) && forEach(current.jsDoc, getContainingChild) || forEachChild(current, getContainingChild);
        if (!child) {
            return current;
        }
        current = child;
    }
}

function getIdentifier(node: NamedDeclaration): string | undefined {
    const name = node.name;
    if (!name) return undefined;
    switch (name.kind) {
        case SyntaxKind.Identifier:
            return name.text;
        case SyntaxKind.PrivateIdentifier:
            return name.escapedText as string;
        case SyntaxKind.JsxNamespacedName:
            return name.namespace.text + ":" + name.name.text;
        default:
            return name.getText();
    }
}

function matchNode(a: Node, b: Node): boolean {
    if (a.kind !== b.kind) {
        return false;
    }

    if (a.kind === SyntaxKind.Constructor) {
        return a.kind === b.kind;
    }

    if (isNamedDeclaration(a) && isNamedDeclaration(b)) {
        const aName = getIdentifier(a);
        const bName = getIdentifier(b);
        return !!(aName && aName === bName);
    }

    if (a.getText() === b.getText()) {
        return true;
    }

    // TODO: Maybe match by other characteristics?
    return false;
}

function findAncestor(node: Node, f: (node: Node) => boolean): Node | undefined {
    while (node) {
        if (f(node)) {
            return node;
        }
        node = node.parent;
    }
}
