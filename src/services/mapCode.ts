import {
    Block,
    ClassElement,
    ClassLikeDeclaration,
    createSourceFile,
    factory,
    FileTextChanges,
    findAncestor,
    flatten,
    formatting,
    getNodeAtPosition,
    InterfaceDeclaration,
    isBlock,
    isClassElement,
    isClassLike,
    isInterfaceDeclaration,
    isNamedDeclaration,
    isSourceFile,
    isTypeElement,
    LanguageServiceHost,
    Node,
    NodeArray,
    Program,
    ScriptTarget,
    SourceFile,
    SourceMapper,
    Statement,
    SyntaxKind,
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
                    const flattenedLocations = focusLocations && flatten(focusLocations);
                    for (const nodes of parsed) {
                        placeNodeGroup(sourceFile, changeTracker, nodes, flattenedLocations);
                    }
                });
            },
        );
    }
    catch (e) {
        host.error?.(`mapCode: ${e}`);
        return [];
    }
}

/**
 * Tries to parse something into either "top-level" statements, or into blocks
 * of class-context definitions.
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
    const { sourceFile, body } = parsedNodes.sort((a, b) => a.sourceFile.parseDiagnostics.length - b.sourceFile.parseDiagnostics.length)[0];
    return body(sourceFile);
}

function placeNodeGroup(original: SourceFile, changeTracker: ChangeTracker, changes: NodeArray<Node>, focusLocations?: TextSpan[]) {
    // 1. Grab the first node, see what kind it is, to see whether we'll need
    //    to expand our scope.
    // 2. Get nodes for each focusLocation by finding the specific node that
    //    contains it, and making a comparison with the first node type.
    // 3. Figure out how much of a range we're going to replace or insert by
    //    using first and last node from `nodes`. Use node types and names to
    //    match ranges.
    if (isClassElement(changes[0]) || isTypeElement(changes[0])) {
        placeClassNodeGroup(original, changeTracker, changes as NodeArray<ClassElement>, focusLocations);
    }
    else {
        placeStatements(original, changeTracker, changes as NodeArray<Statement>, focusLocations);
    }
}

function placeClassNodeGroup(original: SourceFile, changeTracker: ChangeTracker, changes: NodeArray<ClassElement> | NodeArray<TypeElement>, focusLocations?: TextSpan[]) {
    // We have one or more class-ish members.
    //
    // 1. If focusLocations is null/undefined, find the first class in the
    //    SourceFile and insert/replace into that class.
    // 2. If we have focusLocations, go over each one and:
    //   a. Find the nearest class or interface declaration that contains the focusLocation.
    let classOrInterface: ClassLikeDeclaration | InterfaceDeclaration | undefined;
    if (!focusLocations || !focusLocations.length) {
        classOrInterface = original.statements.find(stmt => isClassLike(stmt) || isInterfaceDeclaration(stmt)) as ClassLikeDeclaration | InterfaceDeclaration | undefined;
    }
    else {
        let node: Node | undefined;
        for (const location of focusLocations) {
            node = findAncestor(getNodeAtPosition(original, location.start), node => {
                return isClassLike(node) || node.kind === SyntaxKind.InterfaceDeclaration;
            });
            if (node) {
                classOrInterface = node as ClassLikeDeclaration | InterfaceDeclaration;
                break;
            }
        }
    }

    if (!classOrInterface) {
        throw new Error("Failed to find a class or interface to map the given code into.");
    }
    else {
        const classEls: ClassElement[] = [];
        const typeEls: TypeElement[] = [];
        top: for (const node of changes) {
            for (const member of classOrInterface.members) {
                if (matchNode(node, member)) {
                    // If we have corresponding nodes, replace the old one with the new member.
                    changeTracker.replaceNode(original, member, node);
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
                    changeTracker.replaceNode(original, classOrInterface, newNode);
                }
                else {
                    const newNode = { ...classOrInterface, members: factory.createNodeArray(typeEls) };
                    changeTracker.replaceNode(original, classOrInterface, newNode);
                }
            }
            else if (classEls.length) {
                changeTracker.insertNodesAfter(original, classOrInterface.members[classOrInterface.members.length - 1], classEls);
            }
            else if (typeEls.length) {
                changeTracker.insertNodesAfter(original, classOrInterface.members[classOrInterface.members.length - 1], typeEls);
            }
            else {
                throw new Error("Nothing to append");
            }
        }
    }
}

function placeStatements(original: SourceFile, changeTracker: ChangeTracker, changes: NodeArray<Statement>, focusLocations?: TextSpan[]) {
    // If there's an empty or null focusLocation, we just shove everything at
    // the end of the file and call it a day.
    if (!focusLocations?.length) {
        changeTracker.insertNodesAtEndOfFile(original, changes, /*blankLineBetween*/ false);
        return;
    }

    // Otherwise, we'll need to find the right place to insert or replace.

    // First, we try and find a nearby frame of reference: are there
    // declarations with similar names nearby?
    for (const location of focusLocations) {
        const scope: Node | undefined = findAncestor(getNodeAtPosition(original, location.start), block =>
            (isBlock(block) || isSourceFile(block))
            && block.statements.some(origStmt => changes.some(newStmt => matchNode(newStmt, origStmt))));
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
            const matches = (scope as Block).statements.filter(stmt => changes.some(node => matchNode(node, stmt)));
            matches.sort((a, b) => a.pos - b.pos);
            changeTracker.replaceNodeRangeWithNodes(original, matches[0], matches[matches.length - 1], changes);
            // はい、できました！
            return;
        }
    }

    // If we have no frame of reference, we'll just insert at the end of the
    // nearest statements scope, or, if we can't find a block, at the top
    // level of the source file.
    let scopeStatements: NodeArray<Statement> = original.statements;
    for (const location of focusLocations) {
        const block = findAncestor(getNodeAtPosition(original, location.start), isBlock);
        if (block) {
            scopeStatements = block.statements;
            break;
        }
    }
    changeTracker.insertNodesAfter(original, scopeStatements[scopeStatements.length - 1], changes);
}

function matchNode(a: Node, b: Node): boolean {
    if (a.kind !== b.kind) {
        return false;
    }

    if (a.kind === SyntaxKind.Constructor) {
        return a.kind === b.kind;
    }

    if (isNamedDeclaration(a) && isNamedDeclaration(b)) {
        const aName = a.name.getText();
        const bName = b.name.getText();
        return !!(aName && aName === bName);
    }

    if (a.getText() === b.getText()) {
        return true;
    }

    // TODO(@zkat): Maybe match by other characteristics?
    return false;
}
