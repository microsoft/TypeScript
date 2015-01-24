/// <reference path="../src/compiler/sys.ts" />
module ts {
    enum Ternary {
        False = 0,
        Maybe = 1,
        True = -1,
    }

    function main(): void {
        if (sys.args.length < 1) {
            sys.write("Usage:" + sys.newLine);
            sys.write("\tnode processSyntax.js <synatx-json-input-file>" + sys.newLine);
            return;
        }

        var inputFilePath = sys.args[0].replace(/\\/g, "/");
        var inputStr = sys.readFile(inputFilePath);
        var syntax: SyntaxNodeType[] = JSON.parse(inputStr);
        var output = buildSyntaxOutput(syntax);
        var inputDirectory = inputFilePath.substr(0, inputFilePath.lastIndexOf("/"));
        var outputPath = inputDirectory + "/factory.generated.ts";
        sys.writeFile(outputPath, output);
    }

    function buildSyntaxOutput(syntax: SyntaxNodeType[]): string {
        var syntaxKindTable: Map<SyntaxNodeType>;
        var syntaxTypeTable: Map<SyntaxNodeType>;
        var syntaxSubTypesTable: Map<SyntaxNodeType[]>;
        var lastWriteSucceeded: boolean;
        var writer: TextWriter;

        return writeFileWorker();

        function computeSyntaxTables(): void {
            syntaxKindTable = {};
            syntaxTypeTable = {};
            syntaxSubTypesTable = {};
            for (var i = 0; i < syntax.length; i++) {
                var nodeType = syntax[i];
                nodeType.handlerType = normalizeType(nodeType.handlerType);
                nodeType.types = normalizeType(nodeType.types);
                nodeType.type = normalizeType(nodeType.type);
                if (nodeType.kind) {
                    nodeType.kind = nodeType.kind.replace(/\s+/g, "");
                    syntaxKindTable[nodeType.kind] = nodeType;
                }
                if (!nodeType.type) {
                    nodeType.type = nodeType.types;
                }
                if (nodeType.type) {
                    syntaxTypeTable[nodeType.type] = nodeType;
                }
                if (nodeType.baseType) {
                    nodeType.baseType = normalizeType(nodeType.baseType);
                    var subTypes = getProperty(syntaxSubTypesTable, nodeType.baseType);
                    if (!subTypes) {
                        subTypes = [];
                        syntaxSubTypesTable[nodeType.baseType] = subTypes;
                    }
                    subTypes.push(nodeType);
                }
                if (nodeType.name) {
                    nodeType.name = nodeType.name.replace(/\s+/g, "");
                }
                else {
                    nodeType.name = nodeType.kind || nodeType.type;
                }

                var children = nodeType.children;
                if (children) {
                    for (var j = 0; j < children.length; j++) {
                        var member = children[j];
                        member.type = normalizeType(member.type);
                    }
                }
            }
        }

        function writeFileWorker(): string {
            writer = new TextWriter();
            computeSyntaxTables();
            writeFile();
            return writer.toString();
        }

        function writeFile(): void {
            writer.writeln(`/// <reference path="parser.ts"/>`);
            writer.writeln(`/// <reference path="factory.ts"/>`);
            writer.writeln();
            writer.writeln(`module ts {`);
            writer.indent();
            writeFactoryModule();
            writeVisitorInterface();
            writeVisitorModule();
            writer.dedent();
            writer.writeln(`}`);
            writer.dedent();
        }

        function writeFactoryModule(): void {
            writer.writeln(`export module Factory {`);
            writer.indent();

            lastWriteSucceeded = false;
            for (var i = 0; i < syntax.length; i++) {
                var nodeType = syntax[i];
                writeFactoryModuleCreateFunctionForNode(nodeType);
                writeFactoryModuleUpdateFunctionForNode(nodeType);
            }

            writer.dedent();
            writer.writeln(`}`);
            writer.writeln();
        }

        function writeFactoryModuleCreateFunctionForNode(nodeType: SyntaxNodeType): void {
            if (!nodeType.kind || !nodeType.children) {
                return;
            }

            if (lastWriteSucceeded) {
                writer.writeln();
            }

            var kind = nodeType.kind;
            var type = nodeType.type || nodeType.baseType;
            var name = nodeType.name || kind || type;
            var children = nodeType.children;

            writer.write(`export function create${formatName(name) }(`);

            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                writer.write(member.paramName || member.name);
                if (member.optional) {
                    writer.write(`?`);
                }

                writer.write(`: ${formatType(member.type) }`);

                if (member.isNodeArray) {
                    writer.write(`[]`);
                }

                writer.write(`, `);
            }

            writer.write(`location?: TextRange, flags?: NodeFlags`);

            if (nodeType.modifiers) {
                writer.write(`, modifiers?: Node[]`);
            }

            writer.writeln(`): ${formatType(type) } {`);
            writer.indent();
            writer.writeln(`var node = beginNode<${formatType(type) }>(SyntaxKind.${kind});`);

            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                var paramName = member.paramName || member.name;

                writer.write(`node.${formatName(member.name) } = `);

                if (member.converter) {
                    writer.write(`${member.converter}(`);
                }
                else if (member.isNodeArray) {
                    writer.write(`createNodeArray(`);
                }

                writer.write(paramName);

                if (member.converter || member.isNodeArray) {
                    writer.write(`)`);
                }

                writer.writeln(`;`);
            }

            writer.write(`return finishNode(node, location, flags`);

            if (nodeType.modifiers) {
                writer.write(`, modifiers`);
            }

            writer.writeln(`);`);
            writer.dedent();
            writer.writeln(`}`);

            lastWriteSucceeded = true;
        }

        function writeFactoryModuleUpdateFunctionForNode(nodeType: SyntaxNodeType): void {
            if (!nodeType.update || !nodeType.kind || !nodeType.children) {
                return;
            }

            if (lastWriteSucceeded) {
                writer.writeln();
            }

            var kind = nodeType.kind;
            var type = nodeType.type || nodeType.baseType;
            var name = nodeType.name || kind || type;
            var children = nodeType.children;

            writer.write(`export function update${formatName(name) }(node: ${formatType(type) }`);
            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                if (member.readonly) {
                    continue;
                }

                writer.write(`, `);
                var paramName = member.paramName || member.name;
                writer.write(formatName(paramName));
                writer.write(`: ${formatType(member.type) }`);
                if (member.isNodeArray) {
                    writer.write(`[]`);
                }
            }

            writer.writeln(`): ${formatType(type) } {`);
            writer.indent();
            writer.write(`if (`);

            lastWriteSucceeded = false;
            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                if (member.readonly) {
                    continue;
                }

                if (lastWriteSucceeded) {
                    writer.write(` || `);
                }

                var paramName = member.paramName || member.name;
                writer.write(`node.${formatName(member.name) } !== ${formatName(paramName) }`);
                lastWriteSucceeded = true;
            }

            writer.writeln(`) {`);
            writer.indent();
            writer.write(`return create${formatName(name) }(`);

            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                if (member.readonly) {
                    writer.write(`node.${formatName(member.name) }`);
                }
                else {
                    var paramName = member.paramName || member.name;
                    writer.write(paramName);
                }
                writer.write(`, `);
            }

            writer.write(`node, node.flags`);

            if (nodeType.modifiers) {
                writer.write(`, node.modifiers`);
            }

            writer.writeln(`);`);
            writer.dedent();
            writer.writeln(`}`);
            writer.writeln(`return node;`);
            writer.dedent();
            writer.writeln(`}`);
            lastWriteSucceeded = true;
        }

        function writeVisitorInterface(): void {
            writer.writeln(`export interface VisitorHandlers {`);
            writer.indent();

            for (var i = 0; i < syntax.length; i++) {
                writeVisitorMethodSignatureForNode(syntax[i]);
            }

            writer.dedent();
            writer.writeln(`}`);
            writer.writeln();
        }

        function writeVisitorMethodSignatureForNode(nodeType: SyntaxNodeType): void {
            if (!nodeType.visit || !nodeType.handler) {
                return;
            }

            var kind = nodeType.kind;
            var type = nodeType.type || nodeType.baseType;
            var name = nodeType.name || kind || type;
            var handlerType = nodeType.handlerType || type;

            writer.writeln(`visit${formatName(name) }? (handlers: VisitorHandlers, node: ${formatType(type) }): ${formatType(handlerType) };`);
        }

        function writeVisitorModule(): void {
            writer.writeln(`export module Visitor {`);
            writer.indent();
            writeVisitorModuleFunctions();
            writeVisitorModuleFooter();
            writer.dedent();
            writer.writeln(`}`);
        }

        function writeVisitorModuleFunctions(): void {
            lastWriteSucceeded = false;
            for (var i = 0; i < syntax.length; i++) {
                writeVisitorModuleFunctionForNode(syntax[i]);
            }
        }

        function writeVisitorModuleFunctionForNode(nodeType: SyntaxNodeType): void {
            if (!nodeType.visit) {
                return;
            }

            if (lastWriteSucceeded) {
                writer.writeln();
            }

            var kind = nodeType.kind;
            var type = nodeType.type || nodeType.baseType;
            var name = nodeType.name || kind || type;

            writer.writeln(`export function visit${formatName(name) }(handlers: VisitorHandlers, node: ${formatType(type) }): ${formatType(type) } {`);
            writer.indent();

            if (nodeType.shallow) {
                writer.writeln(`return node;`);
            }
            else {
                writer.writeln(`if (!node || !handlers) {`);
                writer.indent();
                writer.writeln(`return node;`);
                writer.dedent();
                writer.writeln(`}`);

                if (nodeType.types) {
                    writeVisitorFunctionBodyForTypeUnion(nodeType);
                }
                else if (!nodeType.kind) {
                    writeVisitorFunctionBodyForSuperType(nodeType);
                }
                else if (nodeType.update) {
                    writeVisitorFunctionBodyForNode(nodeType);
                }
                else {
                    writer.writeln(`return node;`);
                }
            }

            writer.dedent();
            writer.writeln(`}`);

            lastWriteSucceeded = true;
        }

        function writeVisitorFunctionBodyForTypeUnion(unionType: SyntaxNodeType): void {
            var returnType = unionType.type || unionType.baseType;
            var types = splitUnionType(unionType.types);

            for (var i = 0; i < types.length; i++) {
                var nodeType = getProperty(syntaxTypeTable, types[i]);
                if (!nodeType) {
                    sys.write(`warning: could not find entry with type "${types[i]}"` + sys.newLine);
                    continue;
                }

                if (!nodeType.nodeTest) {
                    continue;
                }

                writer.writeln(`if (${nodeType.nodeTest}(node)) {`);
                writer.indent();
                writeVisitorFunctionBodyVisitNode(nodeType, unionType);
                writer.dedent();
                writer.writeln(`}`);
            }

            writer.writeln(`switch (node.kind) {`);
            writer.indent();

            var lastWriteWasVisit = true;
            for (var i = 0; i < types.length; i++) {
                var nodeType = getProperty(syntaxTypeTable, types[i]);
                if (!nodeType || nodeType.nodeTest) {
                    continue;
                }

                var kind = nodeType.kind;
                var type = nodeType.type || nodeType.baseType;
                var name = nodeType.name || kind || type;

                lastWriteWasVisit = writeVisitorFunctionBodyCasesForSubTypes(nodeType, unionType, lastWriteWasVisit);
            }
            if (!lastWriteWasVisit) {
                writer.indent();
                writer.writeln(`return node;`);
                writer.dedent();
            }

            writer.writeln(`default:`);
            writer.indent();
            writer.writeln(`reportUnexpectedNode(node);`);
            writer.writeln(`return node;`);
            writer.dedent();

            writer.dedent();
            writer.writeln(`}`);
        }

        function writeVisitorFunctionBodyCasesForSubTypes(nodeType: SyntaxNodeType, outerType: SyntaxNodeType, lastWriteWasVisit: boolean): boolean {
            if (nodeType.kind) {
                var kind = nodeType.kind;
                var type = nodeType.type || nodeType.baseType;
                var name = nodeType.name || kind;

                if (nodeType.visit) {
                    if (!lastWriteWasVisit) {
                        writer.indent();
                        writer.writeln(`return node;`);
                        writer.dedent();
                    }
                }

                writer.writeln(`case SyntaxKind.${kind}:`);
                if (nodeType.visit) {
                    writer.indent();
                    writeVisitorFunctionBodyVisitNode(nodeType, outerType);
                    writer.dedent();
                }

                lastWriteWasVisit = nodeType.visit;
            }
            else {
                var subTypes = getProperty(syntaxSubTypesTable, nodeType.type);
                if (!subTypes) {
                    sys.write(`warning: could not find subtypes for type "${nodeType.type}"` + sys.newLine);
                }
                else {
                    for (var i = 0; i < subTypes.length; i++) {
                        lastWriteWasVisit = writeVisitorFunctionBodyCasesForSubTypes(subTypes[i], outerType, lastWriteWasVisit);
                    }
                }
            }

            return lastWriteWasVisit;
        }

        function writeVisitorFunctionBodyForSuperType(nodeType: SyntaxNodeType): void {
            var subTypes = getProperty(syntaxSubTypesTable, nodeType.type);
            if (!subTypes) {
                sys.write(`warning: could not find subtypes for type '${nodeType.type}'` + sys.newLine);
                return;
            }

            writer.writeln(`switch (node.kind) {`);
            writer.indent();

            var remainingTypes: SyntaxNodeType[] = [];
            for (var i = 0; i < subTypes.length; i++) {
                var subType = subTypes[i];
                var kind = subType.kind;
                var type = subType.type || subType.baseType;
                var name = subType.name || kind || type;

                if (subType.kind) {
                    writer.writeln(`case SyntaxKind.${kind}:`);
                    writer.indent();
                    writeVisitorFunctionBodyVisitNode(subType, nodeType);
                    writer.dedent();
                }
                else {
                    remainingTypes.push(subType);
                }
            }

            if (remainingTypes.length === 1) {
                var subType = remainingTypes[0];
                writer.writeln(`default:`);
                writer.indent();
                writeVisitorFunctionBodyVisitNode(subType, nodeType);
                writer.dedent();
            }
            else {
                if (remainingTypes.length > 0) {
                    sys.write("warning: too many subtypes." + sys.newLine);
                }

                writer.writeln(`default:`);
                writer.indent();
                writer.writeln(`reportUnexpectedNode(node);`);
                writer.writeln(`return node;`);
                writer.dedent();
            }

            writer.dedent();
            writer.writeln(`}`);
        }

        function writeVisitorFunctionBodyForNode(nodeType: SyntaxNodeType): void {
            var kind = nodeType.kind;
            var type = nodeType.type;
            var name = nodeType.name || kind || type;
            writer.writeln(`return Factory.update${formatName(name) }(`);
            writer.indent();
            writer.write(`node`);
            var children = nodeType.children;
            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                if (member.readonly) {
                    continue;
                }
                writer.writeln(`,`);
                writeVisitorFunctionBodyVisitMember(member);
            }
            writer.writeln(`)`);
            writer.dedent();
        }

        function writeVisitorFunctionBodyVisitMember(member: SyntaxMember): void {
            var memberNodeType = getProperty(syntaxTypeTable, member.type);
            if (!memberNodeType || !memberNodeType.visit) {
                writer.write(`node.${formatName(member.name) }`);
            }
            else {
                var kind = memberNodeType.kind;
                var type = memberNodeType.type || memberNodeType.baseType;
                var name = memberNodeType.name || kind || type;
                if (member.isNodeArray) {
                    writeVisitMemberArray(member.name, memberNodeType);
                }
                else {
                    writeVisitMember(member.name, memberNodeType);
                }
            }
        }

        function writeVisitorFunctionBodyVisitNode(nodeType: SyntaxNodeType, outerNodeType: SyntaxNodeType): void {
            if (nodeType.visit) {
                var kind = nodeType.kind;
                var type = nodeType.type || nodeType.types || nodeType.baseType;
                var name = nodeType.name || kind || type;

                var handlerType = nodeType.handlerType || type;
                var outerType = outerNodeType.type || outerNodeType.types || outerNodeType.baseType;
                if (!isTypeAssignableTo(handlerType, outerType)) {
                    var intersection = getIntersectionType(handlerType, outerType);
                    if (!intersection) {
                        sys.write(`warning: no intersection of types between ${handlerType} and ${outerType}` + sys.newLine);
                        writer.writeln(`// warning: no intersection of types between ${handlerType} and ${outerType}`);
                        writer.writeln(`return node;`);
                        return;
                    }

                    if (outerNodeType.nodeTest) {
                        writer.write(`var visited = `);
                        writeVisitNode(nodeType);
                        writer.writeln(';');
                        writer.writeln(`if (visited && !${outerNodeType.nodeTest}(visited)) {`);
                        writer.indent();
                        writer.writeln(`reportUnexpectedNodeAfterVisit(visited, node);`);
                        writer.writeln(`return node;`);
                        writer.dedent();
                        writer.writeln(`}`);
                        writer.writeln(`return <${formatType(intersection) }>visited;`);
                        return;
                    }

                    writer.writeln(`// warning: VisitorHandlers returns possibly incompatible node type, add a nodeTest.`);
                    writer.write(`return <${formatType(intersection) }>`);
                    writeVisitNode(nodeType);
                    writer.writeln(`;`);
                    return;
                }

                writer.write(`return `);
                writeVisitNode(nodeType);
                writer.writeln(`;`);
            }
            else {
                writer.writeln(`return node;`);
            }
        }

        function writeVisitNode(nodeType: SyntaxNodeType): void {
            var kind = nodeType.kind;
            var type = nodeType.type || nodeType.types || nodeType.baseType;
            var name = nodeType.name || kind || type;
            if (nodeType.handler) {
                writer.write(`visitNode(handlers, <${formatType(type) }>node, handlers.visit${formatName(name) } || visit${formatName(name) })`);
            }
            else {
                writer.write(`visitNode(handlers, <${formatType(type) }>node, visit${formatName(name) })`);
            }
        }

        function writeVisitMember(member: string, nodeType: SyntaxNodeType): void {
            var kind = nodeType.kind;
            var type = nodeType.type || nodeType.types || nodeType.baseType;
            var name = nodeType.name || kind || type;
            if (nodeType.handler) {
                writer.write(`visitNode(handlers, <${formatType(type) }>node.${formatName(member)}, handlers.visit${formatName(name) } || visit${formatName(name) })`);
            }
            else {
                writer.write(`visitNode(handlers, <${formatType(type) }>node.${formatName(member)}, visit${formatName(name) })`);
            }
        }

        function writeVisitMemberArray(member: string, nodeType: SyntaxNodeType): void {
            var kind = nodeType.kind;
            var type = nodeType.type || nodeType.types || nodeType.baseType;
            var name = nodeType.name || kind || type;
            if (nodeType.handler) {
                writer.write(`visitNodes(handlers, node.${formatName(member) }, (handlers.visit${formatName(name) } || visit${formatName(name) }))`);
            }
            else {
                writer.write(`visitNodes(handlers, node.${formatName(member) }, visit${formatName(name) })`);
            }
        }

        function writeVisitorModuleFooter(): void {
            writer.suspendIndenting();
            writer.writeln(`
        function visitNode<TNode extends Node>(handlers: VisitorHandlers, node: TNode, visitNode: (handlers: VisitorHandlers, node: TNode) => TNode): TNode {
            if (!node || !handlers) {
                return node;
            }
            return visitNode(handlers, node);
        }

        export function visitNodes<TNode extends Node>(handlers: VisitorHandlers, nodes: NodeArray<TNode>, visitNode: (handlers: VisitorHandlers, node: TNode) => TNode, shouldCacheNode?: (node: Node) => boolean, cacheNode?: (node: TNode) => TNode, removeMissingNodes?: boolean): NodeArray<TNode> {
            if (!nodes || !handlers) {
                return nodes;
            }

            var updatedNodes: TNode[];
            var updatedOffset = 0;
            var cacheOffset = 0;

            for (var i = 0; i < nodes.length; i++) {
                var updatedIndex = i - updatedOffset;
                var node = nodes[i];
                if (shouldCacheNode && shouldCacheNode(node)) {
                    if (!updatedNodes) {
                        updatedNodes = nodes.slice(0, i);
                    }
                    if (cacheNode) {
                        while (cacheOffset < updatedIndex) {
                            updatedNodes[cacheOffset] = cacheNode(updatedNodes[cacheOffset]);
                            cacheOffset++;
                        }
                    }
                    cacheOffset = updatedIndex;
                }
                var updatedNode = visitNode(handlers, node);
                if ((updatedNodes || updatedNode !== node || (!updatedNode && removeMissingNodes))) {
                    if (!updatedNodes) {
                        updatedNodes = nodes.slice(0, i);
                    }
                    if (!updatedNode && removeMissingNodes) {
                        updatedOffset++;
                    }
                    else {
                        updatedNodes[i - updatedOffset] = updatedNode;
                    }
                }
            }
            if (updatedNodes) {
                return Factory.createNodeArray(updatedNodes, nodes);
            }
            return nodes;
        }`);
            writer.resumeIndenting();
        }

        function normalizeType(type: string): string {
            if (type) {
                type = type.replace(/\s+/g, "");
                if (isUnionType(type)) {
                    var types = splitUnionType(type);
                    types.sort();
                    type = types.join("|");
                }
            }

            return type;
        }

        function getCompatibleTypeSubset(source: string, target: string): string {
            if (!source || !target) {
                return;
            }
            if (source === target) {
                return source;
            }

            var flatSource = flattenType(source);
            var flatTarget = flattenType(target);
            var flatIntersection = getIntersectionType(flatSource, flatTarget);
            return flatIntersection;
        }

        function flattenType(type: string): string {
            if (!type) {
                return void 0;
            }

            var parts: string[] = [];
            var seen: Map<boolean> = {};
            flattenTypeWorker(type);
            parts.sort();
            return parts.join("|");

            function flattenTypeWorker(type: string): void {
                if (isAliasType(type)) {
                    flattenTypeWorker(getAliasType(type));
                }
                else if (isUnionType(type)) {
                    var types = splitUnionType(type);
                    for (var i = 0; i < types.length; i++) {
                        flattenTypeWorker(types[i]);
                    }
                }
                else {
                    writeType(type);
                }
            }

            function writeType(type: string): void {
                if (!hasProperty(seen, type)) {
                    seen[type] = true;
                    parts.push(type);
                }
            }
        }

        function isTypeAssignableTo(source: string, target: string): boolean {
            if (!source || !target) {
                return false;
            }
            if (source === target) {
                return true;
            }
            if (isUnionType(source)) {
                return isUnionTypeAssignableToType(source, target);
            }
            else if (isUnionType(target)) {
                return isTypeAssignableToUnionType(source, target);
            }
            else if (isAliasType(source)) {
                return isTypeAssignableTo(getAliasType(source), target);
            }
            else if (isAliasType(target)) {
                return isTypeAssignableTo(source, getAliasType(target));
            }
            else {
                return isSubtypeOfType(source, target);
            }
        }

        function isUnionTypeAssignableToType(sourceUnion: string, target: string): boolean {
            if (!sourceUnion || !target) {
                return false;
            }
            var sourceTypes = splitUnionType(sourceUnion);
            for (var i = 0, l = sourceTypes.length; i < l; i++) {
                var related = isTypeAssignableTo(sourceTypes[i], target);
                if (!related) {
                    return false;
                }
            }
            return true;
        }

        function isTypeAssignableToUnionType(source: string, targetUnion: string): boolean {
            if (!source || !targetUnion) {
                return false;
            }
            var targetTypes = splitUnionType(targetUnion);
            for (var i = 0, l = targetTypes.length; i < l; i++) {
                if (isTypeAssignableTo(source, targetTypes[i])) {
                    return true;
                }
            }
            return false;
        }

        function isSubtypeOfType(source: string, superType: string): boolean {
            if (!source || !superType) {
                return false;
            }

            var sourceNode = syntaxTypeTable[source];
            if (!sourceNode || !sourceNode.baseType) {
                return false;
            }

            return isTypeAssignableTo(sourceNode.baseType, superType);
        }

        function isUnionType(type: string): boolean {
            if (type) {
                return type.indexOf("|") !== -1;
            }
            return false;
        }

        function isAliasType(type: string): boolean {
            if (type) {
                var nodeType = syntaxTypeTable[type];
                if (nodeType && nodeType.types) {
                    return true;
                }
            }
            return false;
        }

        function getAliasType(type: string): string {
            if (type) {
                var nodeType = syntaxTypeTable[type];
                if (nodeType && nodeType.types) {
                    return nodeType.types;
                }
            }
        }

        function splitUnionType(type: string): string[] {
            if (!type) {
                return [];
            }
            return type.split(/\|/g).sort();
        }

        function getIntersectionType(flatLeft: string, flatRight: string): string {
            var left = splitUnionType(flatLeft);
            var right = splitUnionType(flatRight);
            var set: Map<boolean> = {};
            var result: string[] = [];
            for (var i = 0; i < left.length; i++) {
                set[left[i]] = true;
            }
            for (var i = 0; i < right.length; i++) {
                if (hasProperty(set, right[i])) {
                    result.push(right[i]);
                }
            }
            if (result.length) {
                return result.sort().join("|");
            }
        }

        function formatName(type: string): string {
            if (!type) {
                return type;
            }
            return type.replace(/\|/g, "Or");
        }

        function formatType(type: string): string {
            if (!type) {
                return "any";
            }
            return type.replace(/\|/g, " | ");
        }
    }

    class TextWriter {
        private _parts: string[] = [];
        private _indent: number = 0;
        private _newlineRequested: boolean = false;
        private _indentingSuspendedDepth: number = 0;
        private _indentLevels: string[] = ["", "    "];

        public length: number = 0;

        constructor(text?: string) {
            if (text) {
                this.write(text);
            }
        }

        public write(text: string): void {
            if (text) {
                var lines = text.split(/\r\n|\r|\n/g);
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    if (i > 0) {
                        this._newlineRequested = true;
                    }

                    this.tryWriteNewline();
                    this._parts.push(line);
                    this.length += line.length;
                }
            }
        }

        public writeln(text?: string): void {
            if (text) {
                this.write(text);
            }
            else if (this._newlineRequested) {
                this.writeNewline();
            }

            this._newlineRequested = true;
        }

        public indent(): void {
            this._indent++;
        }

        public dedent(): void {
            this._indent = Math.max(0, this._indent - 1);
        }

        public suspendIndenting(): void {
            this._indentingSuspendedDepth++;
        }

        public resumeIndenting(): void {
            this._indentingSuspendedDepth = Math.max(0, this._indentingSuspendedDepth - 1);
        }

        public clear(): void {
            this.length = 0;
            this._parts.length = 0;
        }

        public toString(): string {
            var text = this._parts.join("");
            return text;
        }

        private tryWriteIndent(): string {
            if (this._indentingSuspendedDepth || !this._indent) {
                return;
            }

            var indent = this.getIndent(this._indent);
            this._parts.push(indent);
            this.length += indent.length;
        }

        private tryWriteNewline(): void {
            if (!this._newlineRequested) {
                return;
            }
            this._newlineRequested = false;
            this.writeNewline();
            this.tryWriteIndent();
        }

        private writeNewline(): void {
            this._parts.push(sys.newLine);
            this.length += sys.newLine.length;
        }

        private getIndent(level: number): string {
            if (level in this._indentLevels) {
                return this._indentLevels[level];
            }

            var indent = this.getIndent(level - 1) + this._indentLevels[1];
            this._indentLevels[level] = indent;
            return indent;
        }
    }

    interface Map<T> {
        [name: string]: T;
    }

    function hasProperty<T>(map: Map<T>, key: string): boolean {
        if (map) {
            return Object.prototype.hasOwnProperty.call(map, key);
        }
    }

    function getProperty<T>(map: Map<T>, key: string): T {
        if (map && hasProperty(map, key)) {
            return map[key];
        }
    }

    interface SyntaxNodeType {
        name?: string;
        kind?: string;
        type?: string;
        baseType?: string;
        nodeTest?: string;
        update?: boolean;
        visit?: boolean;
        shallow?: boolean;
        handler?: boolean;
        handlerType?: string;
        modifiers?: boolean;
        children?: SyntaxMember[];
        types?: string;
    }

    interface SyntaxMember {
        paramName?: string;
        name?: string;
        type?: string;
        isNodeArray?: boolean;
        optional?: string;
        converter?: string;
        visit?: string;
        readonly?: boolean;
    }

    main();
}