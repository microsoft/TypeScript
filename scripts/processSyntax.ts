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
            sys.write("\tnode processSyntax.js <syntax-json-input-file>" + sys.newLine);
            return;
        }

        var inputFilePath = sys.args[0].replace(/\\/g, "/");
        var inputStr = sys.readFile(inputFilePath);
        var syntax: SyntaxNode[] = JSON.parse(inputStr);
        var output = buildSyntaxOutput(syntax);
        var inputDirectory = inputFilePath.substr(0, inputFilePath.lastIndexOf("/"));
        var outputPath = inputDirectory + "/factory.generated.ts";
        sys.writeFile(outputPath, output);
    }

    function buildSyntaxOutput(syntax: SyntaxNode[]): string {
        var syntaxKindTable: Map<SyntaxNode>;
        var syntaxTypeTable: Map<SyntaxNode>;
        var syntaxSubTypesTable: Map<SyntaxNode[]>;
        var lastWriteSucceeded: boolean;
        var writer: TextWriter;

        return writeFileWorker();

        function computeSyntaxTables(): void {
            syntaxKindTable = {};
            syntaxTypeTable = {};
            syntaxSubTypesTable = {};
            for (var i = 0; i < syntax.length; i++) {
                var nodeType = syntax[i];
                var kind = nodeType.kind;
                var type = nodeType.type;
                var baseType = nodeType.baseType;
                var types = nodeType.types;
                var name = nodeType.name;

                if (kind) {
                    nodeType.kind = kind.replace(/\s+/g, "");
                    syntaxKindTable[nodeType.kind] = nodeType;
                }

                if (type) {
                    nodeType.type = normalizeType(type);
                    syntaxTypeTable[nodeType.type] = nodeType;
                }
                else {
                    nodeType.type = normalizeType(nodeType.types || nodeType.baseType);
                }

                if (types) {
                    nodeType.types = normalizeType(types);
                }

                if (baseType) {
                    nodeType.baseType = normalizeType(baseType);
                    var subTypes = getProperty(syntaxSubTypesTable, nodeType.baseType);
                    if (!subTypes) {
                        subTypes = [];
                        syntaxSubTypesTable[nodeType.baseType] = subTypes;
                    }
                    subTypes.push(nodeType);
                }

                if (name) {
                    nodeType.name = formatName(nodeType.name);
                }
                else {
                    nodeType.name = formatName(nodeType.kind || nodeType.type);
                }

                var children = nodeType.children;
                if (children) {
                    for (var j = 0; j < children.length; j++) {
                        var member = children[j];
                        member.type = normalizeType(member.type);
                        member.name = formatName(member.name);
                        if (!member.paramName) {
                            member.paramName = member.name;
                        }
                        else {
                            member.paramName = formatName(member.paramName);
                        }
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
                writeCreateNodeFunction(nodeType);
                writeUpdateNodeFunction(nodeType);
            }

            writer.dedent();
            writer.writeln(`}`);
            writer.writeln();
        }

        function writeCreateNodeFunction(nodeType: SyntaxNode): void {
            if (!nodeType.kind || !nodeType.children) {
                return;
            }

            if (lastWriteSucceeded) {
                writer.writeln();
            }

            var kind = nodeType.kind;
            var type = nodeType.type || nodeType.baseType;
            var name = nodeType.name || kind || type;

            var modifiers: string;
            var children = nodeType.children;

            writer.write(`export function create${nodeType.name}(`);

            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                writer.write(member.paramName);
                if (member.optional) {
                    writer.write(`?`);
                }

                writer.write(`: ${member.type}`);

                if (member.isModifiersArray) {
                    modifiers = member.paramName;
                }
                if (member.isNodeArray || member.isModifiersArray) {
                    writer.write(`[]`);
                }

                writer.write(`, `);
            }

            writer.write(`location?: TextRange, flags?: NodeFlags`);

            writer.writeln(`): ${nodeType.type} {`);
            writer.indent();
            writer.writeln(`var node = beginNode<${nodeType.type}>(SyntaxKind.${nodeType.kind});`);

            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                var paramName = member.paramName || member.name;

                writer.write(`node.${member.name} = `);

                if (member.converter) {
                    writer.write(`${member.converter}(`);
                }
                else if (member.isNodeArray) {
                    writer.write(`createNodeArray(`);
                }
                else if (member.isModifiersArray) {
                    writer.write(`<ModifiersArray>`);
                }

                writer.write(paramName);

                if (member.converter || member.isNodeArray) {
                    writer.write(`)`);
                }

                writer.writeln(`;`);
            }

            writer.write(`return finishNode(node, location, flags`);

            if (modifiers) {
                writer.write(`, ${modifiers}`);
            }

            writer.writeln(`);`);
            writer.dedent();
            writer.writeln(`}`);

            lastWriteSucceeded = true;
        }

        function writeUpdateNodeFunction(syntaxNode: SyntaxNode): void {
            if (!syntaxNode.update || !syntaxNode.kind || !syntaxNode.children) {
                return;
            }

            if (lastWriteSucceeded) {
                writer.writeln();
            }

            writer.write(`export function update${syntaxNode.name}(node: ${syntaxNode.type}`);

            var children = syntaxNode.children;
            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                if (member.readonly) {
                    continue;
                }

                writer.write(`, `);
                var paramName = member.paramName || member.name;
                writer.write(formatName(paramName));
                writer.write(`: ${member.type}`);
                if (member.isNodeArray || member.isModifiersArray) {
                    writer.write(`[]`);
                }
            }

            writer.writeln(`): ${syntaxNode.type} {`);
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
                writer.write(`node.${member.name} !== ${member.paramName}`);
                lastWriteSucceeded = true;
            }

            writer.writeln(`) {`);
            writer.indent();
            writer.write(`return create${syntaxNode.name}(`);

            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                if (member.readonly) {
                    writer.write(`node.${member.name}`);
                }
                else {
                    var paramName = member.paramName || member.name;
                    writer.write(paramName);
                }
                writer.write(`, `);
            }

            writer.writeln(`node, node.flags);`);
            writer.dedent();
            writer.writeln(`}`);
            writer.writeln(`return node;`);
            writer.dedent();
            writer.writeln(`}`);
            lastWriteSucceeded = true;
        }

        function writeVisitorModule(): void {
            writer.writeln(`export module Visitor {`);
            writer.indent();
            writeVisitNodeFallbackFunction();
            writeVisitMemberFunction();
            writer.dedent();
            writer.writeln(`}`);
        }

        function writeVisitNodeFallbackFunction(): void {
            writer.writeln(`function accept(node: Node, cbNode: Visitor, state?: any): Node {`);
            writer.indent();

            writer.writeln(`switch (node.kind) {`);
            writer.indent();

            var pendingReturnNode = false;
            for (var i = 0; i < syntax.length; i++) {
                var syntaxNode = syntax[i];
                if (!syntaxNode.kind) {
                    continue;
                }

                // combine runs of non-updatable nodes
                if (!syntaxNode.update) {
                    pendingReturnNode = true;
                }
                else if (pendingReturnNode) {
                    pendingReturnNode = false;
                    writer.indent();
                    writer.writeln(`return node;`);
                    writer.dedent();
                }

                // write case
                writer.writeln(`case SyntaxKind.${syntaxNode.kind}:`);

                // if updatable, write update and recursive visit
                if (syntaxNode.update) {
                    writer.indent();
                    writeUpdateNode(syntaxNode);
                    writer.dedent();
                }
            }

            if (pendingReturnNode) {
                writer.indent();
                writer.writeln(`return node;`);
                writer.dedent();
            }

            writer.dedent();
            writer.writeln(`}`);

            writer.dedent();
            writer.writeln(`}`);
        }

        function writeUpdateNode(syntaxNode: SyntaxNode): void {
            writer.writeln(`return Factory.update${syntaxNode.name}(`);
            writer.indent();
            writer.write(`<${syntaxNode.type}>node`);

            var children = syntaxNode.children;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    var member = children[i];
                    if (member.readonly) {
                        continue;
                    }
                    writer.writeln(`,`);
                    writeVisitMember(syntaxNode, member);
                }
            }

            writer.writeln(`);`);
            writer.dedent();
        }

        function writeVisitMember(syntaxNode: SyntaxNode, member: SyntaxMember): void {
            var memberSyntaxNode = getProperty(syntaxTypeTable, member.type);
            if (memberSyntaxNode) {
                if (member.isNodeArray) {
                    writer.write(`visitNodes<${member.type}>(`);
                }
                else {
                    writer.write(`visit<${member.type}>(`);
                }
            }
            writer.write(`(<${syntaxNode.type}>node).${member.name}`);
            if (memberSyntaxNode) {
                writer.write(`, cbNode, state)`);
            }
        }

        function writeVisitMemberFunction(): void {
            writer.suspendIndenting();
            writer.writeln(`
        export function fallback<TNode extends Node>(node: TNode, cbNode: Visitor, state?: any): TNode {
            if (!cbNode || !node) {
                return node;
            }
            return <TNode>accept(node, cbNode, state);
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

            return formatType(type);
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
                return;
            }
            return type.replace(/\s*\|\s*/g, "Or");
        }

        function formatType(type: string): string {
            if (!type) {
                return;
            }
            return type.replace(/\s*\|\s*/g, " | ");
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

    interface SyntaxNode {
        name?: string;
        kind?: string;
        type?: string;
        types?: string;
        baseType?: string;
        formattedType?: string;
        nodeTest?: string;
        update?: boolean;
        visit?: boolean;
        shallow?: boolean;
        handler?: boolean;
        children?: SyntaxMember[];
    }

    interface SyntaxMember {
        paramName?: string;
        name?: string;
        type?: string;
        isNodeArray?: boolean;
        isModifiersArray?: boolean;
        optional?: string;
        converter?: string;
        visit?: string;
        readonly?: boolean;
    }

    main();
}