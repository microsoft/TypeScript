import {
    type Node,
    type NodeArray,
    type Path,
    type SourceFile,
    SyntaxKind,
} from "@typescript/ast";
import {
    childProperties,
    HEADER_OFFSET_EXTENDED_DATA,
    HEADER_OFFSET_HASH_HI0,
    HEADER_OFFSET_HASH_HI1,
    HEADER_OFFSET_HASH_LO0,
    HEADER_OFFSET_HASH_LO1,
    HEADER_OFFSET_NODES,
    HEADER_OFFSET_PARSE_OPTIONS,
    HEADER_OFFSET_STRING_TABLE,
    HEADER_OFFSET_STRING_TABLE_OFFSETS,
    KIND_NODE_LIST,
    NODE_DATA_TYPE_CHILDREN,
    NODE_DATA_TYPE_EXTENDED,
    NODE_DATA_TYPE_STRING,
    NODE_LEN,
} from "./protocol.ts";

const popcount8 = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8];

/**
 * Read the 128-bit content hash from a source file binary response as a hex string.
 */
export function readSourceFileHash(data: DataView): string {
    const lo0 = data.getUint32(HEADER_OFFSET_HASH_LO0, true);
    const lo1 = data.getUint32(HEADER_OFFSET_HASH_LO1, true);
    const hi0 = data.getUint32(HEADER_OFFSET_HASH_HI0, true);
    const hi1 = data.getUint32(HEADER_OFFSET_HASH_HI1, true);
    return hex8(hi1) + hex8(hi0) + hex8(lo1) + hex8(lo0);
}

/**
 * Read the per-file parse options key from a source file binary response.
 * This encodes the ExternalModuleIndicatorOptions bitmask as a string,
 * allowing the client to distinguish files parsed with different options.
 */
export function readParseOptionsKey(data: DataView): string {
    return data.getUint32(HEADER_OFFSET_PARSE_OPTIONS, true).toString();
}

function hex8(n: number): string {
    return (n >>> 0).toString(16).padStart(8, "0");
}

type NodeDataType = typeof NODE_DATA_TYPE_CHILDREN | typeof NODE_DATA_TYPE_STRING | typeof NODE_DATA_TYPE_EXTENDED;
const NODE_DATA_TYPE_MASK = 0xc0_00_00_00;
const NODE_CHILD_MASK = 0x00_00_00_ff;
const NODE_STRING_INDEX_MASK = 0x00_ff_ff_ff;
const NODE_EXTENDED_DATA_MASK = 0x00_ff_ff_ff;

const NODE_OFFSET_KIND = 0;
const NODE_OFFSET_POS = 4;
const NODE_OFFSET_END = 8;
const NODE_OFFSET_NEXT = 12;
const NODE_OFFSET_PARENT = 16;
const NODE_OFFSET_DATA = 20;

export class RemoteNodeBase {
    parent: RemoteNode;
    view: DataView;
    protected index: number;
    protected _byteIndex: number;

    constructor(view: DataView, index: number, parent: RemoteNode, byteIndex: number) {
        this.view = view;
        this.index = index;
        this.parent = parent;
        this._byteIndex = byteIndex;
    }

    get kind(): SyntaxKind {
        return this.view.getUint32(this._byteIndex + NODE_OFFSET_KIND, true);
    }

    get pos(): number {
        return this.view.getInt32(this._byteIndex + NODE_OFFSET_POS, true);
    }

    get end(): number {
        return this.view.getInt32(this._byteIndex + NODE_OFFSET_END, true);
    }

    get next(): number {
        return this.view.getUint32(this._byteIndex + NODE_OFFSET_NEXT, true);
    }

    protected get parentIndex(): number {
        return this.view.getUint32(this._byteIndex + NODE_OFFSET_PARENT, true);
    }

    protected get data(): number {
        return this.view.getUint32(this._byteIndex + NODE_OFFSET_DATA, true);
    }

    protected get dataType(): NodeDataType {
        return (this.data & NODE_DATA_TYPE_MASK) as NodeDataType;
    }

    protected get childMask(): number {
        if (this.dataType !== NODE_DATA_TYPE_CHILDREN) {
            return -1;
        }
        return this.data & NODE_CHILD_MASK;
    }

    protected getFileText(start: number, end: number): string {
        return this.sourceFile._decoder.decode(new Uint8Array(this.view.buffer, this.sourceFile._offsetStringTable + start, end - start));
    }

    protected get sourceFile(): RemoteSourceFile {
        // Overridden in RemoteNode; exists here for getFileText access
        throw new Error("sourceFile not available on base");
    }
}

export class RemoteNodeList extends Array<RemoteNode> implements NodeArray<RemoteNode> {
    parent: RemoteNode;
    protected view: DataView;
    protected index: number;
    private _byteIndex: number;

    get pos(): number {
        return this.view.getUint32(this._byteIndex + NODE_OFFSET_POS, true);
    }

    get end(): number {
        return this.view.getUint32(this._byteIndex + NODE_OFFSET_END, true);
    }

    get next(): number {
        return this.view.getUint32(this._byteIndex + NODE_OFFSET_NEXT, true);
    }

    private get data(): number {
        return this.view.getUint32(this._byteIndex + NODE_OFFSET_DATA, true);
    }

    private sourceFile: RemoteSourceFile;

    constructor(view: DataView, index: number, parent: RemoteNode, sourceFile: RemoteSourceFile, offsetNodes: number) {
        super();
        this.view = view;
        this.index = index;
        this.parent = parent;
        this.sourceFile = sourceFile;
        this._byteIndex = offsetNodes + index * NODE_LEN;
        this.length = this.data;

        const length = this.length;
        for (let i = 16; i < length; i++) {
            Object.defineProperty(this, i, {
                get() {
                    return this.at(i);
                },
            });
        }
    }
    get 0(): RemoteNode {
        return this.at(0);
    }
    get 1(): RemoteNode {
        return this.at(1);
    }
    get 2(): RemoteNode {
        return this.at(2);
    }
    get 3(): RemoteNode {
        return this.at(3);
    }
    get 4(): RemoteNode {
        return this.at(4);
    }
    get 5(): RemoteNode {
        return this.at(5);
    }
    get 6(): RemoteNode {
        return this.at(6);
    }
    get 7(): RemoteNode {
        return this.at(7);
    }
    get 8(): RemoteNode {
        return this.at(8);
    }
    get 9(): RemoteNode {
        return this.at(9);
    }
    get 10(): RemoteNode {
        return this.at(10);
    }
    get 11(): RemoteNode {
        return this.at(11);
    }
    get 12(): RemoteNode {
        return this.at(12);
    }
    get 13(): RemoteNode {
        return this.at(13);
    }
    get 14(): RemoteNode {
        return this.at(14);
    }
    get 15(): RemoteNode {
        return this.at(15);
    }

    *[Symbol.iterator](): ArrayIterator<RemoteNode> {
        let next = this.index + 1;
        while (next) {
            const child = this.getOrCreateChildAtNodeIndex(next);
            next = child.next;
            yield child as RemoteNode;
        }
    }

    forEachNode<T>(visitNode: (node: RemoteNode) => T | undefined): T | undefined {
        let next = this.index + 1;
        while (next) {
            const child = this.getOrCreateChildAtNodeIndex(next);
            next = child.next;
            const result = visitNode(child as RemoteNode);
            if (result) return result;
        }
    }

    at(index: number): RemoteNode {
        if (!Number.isInteger(index)) {
            return undefined!;
        }
        if (index >= this.data || (index < 0 && -index > this.data)) {
            return undefined!;
        }
        if (index < 0) {
            index = this.length + index;
        }
        let next = this.index + 1;
        for (let i = 0; i < index; i++) {
            const child = this.getOrCreateChildAtNodeIndex(next);
            next = child.next;
        }
        return this.getOrCreateChildAtNodeIndex(next) as RemoteNode;
    }

    private getOrCreateChildAtNodeIndex(index: number): RemoteNode | RemoteNodeList {
        let child = this.sourceFile.nodes[index];
        if (!child) {
            const kind = this.view.getUint32(this.sourceFile._offsetNodes + index * NODE_LEN + NODE_OFFSET_KIND, true);
            if (kind === KIND_NODE_LIST) {
                throw new Error("NodeList cannot directly contain another NodeList");
            }
            child = new RemoteNode(this.view, index, this.parent, this.sourceFile, this.sourceFile._offsetNodes);
            this.sourceFile.nodes[index] = child;
        }
        return child;
    }

    __print(): string {
        const result = [];
        result.push(`kind: NodeList`);
        result.push(`index: ${this.index}`);
        result.push(`byteIndex: ${this._byteIndex}`);
        result.push(`length: ${this.length}`);
        return result.join("\n");
    }
}

export class RemoteNode extends RemoteNodeBase implements Node {
    protected static NODE_LEN: number = NODE_LEN;
    protected override get sourceFile(): RemoteSourceFile {
        return this._sourceFile;
    }
    protected _sourceFile: RemoteSourceFile;
    get id(): string {
        return `${this.pos}.${this.end}.${this.kind}.${this.sourceFile.path}`;
    }

    constructor(view: DataView, index: number, parent: RemoteNode, sourceFile: RemoteSourceFile, offsetNodes: number) {
        super(view, index, parent, offsetNodes + index * NODE_LEN);
        this._sourceFile = sourceFile;
    }

    forEachChild<T>(visitNode: (node: Node) => T, visitList?: (list: NodeArray<Node>) => T): T | undefined {
        if (this.hasChildren()) {
            let next = this.index + 1;
            do {
                const child = this.getOrCreateChildAtNodeIndex(next);
                if (child instanceof RemoteNodeList) {
                    if (visitList) {
                        const result = visitList(child);
                        if (result) {
                            return result;
                        }
                    }
                    const result = child.forEachNode(visitNode);
                    if (result) {
                        return result;
                    }
                }
                else {
                    const result = visitNode(child);
                    if (result) {
                        return result;
                    }
                }
                next = child.next;
            }
            while (next);
        }
    }

    getSourceFile(): SourceFile {
        return this.sourceFile as unknown as SourceFile;
    }

    protected getString(index: number): string {
        const offsetStringTableOffsets = this.sourceFile._offsetStringTableOffsets;
        const start = this.view.getUint32(offsetStringTableOffsets + index * 4, true);
        const end = this.view.getUint32(offsetStringTableOffsets + (index + 1) * 4, true);
        const offsetStringTable = this.sourceFile._offsetStringTable;
        const text = new Uint8Array(this.view.buffer, offsetStringTable + start, end - start);
        return this.sourceFile._decoder.decode(text);
    }

    private getOrCreateChildAtNodeIndex(index: number): RemoteNode | RemoteNodeList {
        let child = this.sourceFile.nodes[index];
        if (!child) {
            const offsetNodes = this.sourceFile._offsetNodes;
            const kind = this.view.getUint32(offsetNodes + index * NODE_LEN + NODE_OFFSET_KIND, true);
            const sf = this.sourceFile;
            child = kind === KIND_NODE_LIST
                ? new RemoteNodeList(this.view, index, this, sf, offsetNodes)
                : new RemoteNode(this.view, index, this, sf, offsetNodes);
            sf.nodes[index] = child;
        }
        return child;
    }

    private hasChildren(): boolean {
        if (this._byteIndex >= this.view.byteLength - NODE_LEN) {
            return false;
        }
        const nextNodeParent = this.view.getUint32(this.sourceFile._offsetNodes + (this.index + 1) * NODE_LEN + NODE_OFFSET_PARENT, true);
        return nextNodeParent === this.index;
    }

    private getNamedChild(propertyName: string): RemoteNode | RemoteNodeList | undefined {
        const propertyNames = childProperties[this.kind];
        if (!propertyNames) {
            // `childProperties` is only defined for nodes with more than one child property.
            // Get the only child if it exists.
            const child = this.getOrCreateChildAtNodeIndex(this.index + 1);
            if (child.next !== 0) {
                throw new Error("Expected only one child");
            }
            return child;
        }

        let order = propertyNames.indexOf(propertyName);
        if (order === -1) {
            // JSDocPropertyTag and JSDocParameterTag need special handling
            // because they have a conditional property order
            const kind = this.kind;
            if (kind === SyntaxKind.JSDocPropertyTag) {
                switch (propertyName) {
                    case "name":
                        order = this.isNameFirst ? 0 : 1;
                        break;
                    case "typeExpression":
                        order = this.isNameFirst ? 1 : 0;
                        break;
                }
            }
            else if (kind === SyntaxKind.JSDocParameterTag) {
                switch (propertyName) {
                    case "name":
                        order = this.isNameFirst ? 1 : 2;
                    case "typeExpression":
                        order = this.isNameFirst ? 2 : 1;
                }
            }
            // Node kind does not have this property
            return undefined;
        }
        const mask = this.childMask;
        if (!(mask & (1 << order))) {
            // Property is not present
            return undefined;
        }

        // The property index is `order`, minus the number of zeros in the mask that are in bit positions less
        // than the `order`th bit. Example:
        //
        // This is a MethodDeclaration with mask 0b01110101. The possible properties are
        // ["modifiers", "asteriskToken", "name", "postfixToken", "typeParameters", "parameters", "type", "body"]
        // (it has modifiers, name, typeParameters, parameters, and type).
        //
        // | Bit   | 7    | 6    | 5          | 4              | 3            | 2    | 1             | 0         |
        // | ----- | ---- | ---- | ---------- | -------------- | ------------ | ---- | ------------- | --------- |
        // | Value | 0    | 1    | 1          | 1              | 0            | 1    | 0             | 1         |
        // | Name  | body | type | parameters | typeParameters | postfixToken | name | asteriskToken | modifiers |
        //
        // We are trying to get the index of "parameters" (bit = 5).
        // First, set all the more significant bits to 1:
        //
        // | Bit   | 7    | 6    | 5          | 4              | 3            | 2    | 1             | 0         |
        // | ----- | ---- | ---- | ---------- | -------------- | ------------ | ---- | ------------- | --------- |
        // | Value | 1    | 1    | 1          | 1              | 0            | 1    | 0             | 1         |
        //
        // Then, flip the bits:
        //
        // | Bit   | 7    | 6    | 5          | 4              | 3            | 2    | 1             | 0         |
        // | ----- | ---- | ---- | ---------- | -------------- | ------------ | ---- | ------------- | --------- |
        // | Value | 0    | 0    | 0          | 0              | 1            | 0    | 1             | 0         |
        //
        // Counting the 1s gives us the number of *missing properties* before the `order`th property. If every property
        // were present, we would have `parameters = children[5]`, but since `postfixToken` and `astersiskToken` are
        // missing, we have `parameters = children[5 - 2]`.
        const propertyIndex = order - popcount8[~(mask | ((0xff << order) & 0xff)) & 0xff];
        let childIndex = this.index + 1;
        for (let i = 0; i < propertyIndex; i++) {
            // Walk through children via their `next` pointer until we get to the right property index
            childIndex = this.view.getUint32(this.sourceFile._offsetNodes + childIndex * NODE_LEN + NODE_OFFSET_NEXT, true);
        }
        return this.getOrCreateChildAtNodeIndex(childIndex);
    }

    __print(): string {
        const result = [];
        result.push(`index: ${this.index}`);
        result.push(`byteIndex: ${this._byteIndex}`);
        result.push(`kind: ${SyntaxKind[this.kind]}`);
        result.push(`pos: ${this.pos}`);
        result.push(`end: ${this.end}`);
        result.push(`next: ${this.next}`);
        result.push(`parent: ${this.parentIndex}`);
        result.push(`data: ${this.data.toString(2).padStart(32, "0")}`);
        const dataType = this.dataType === NODE_DATA_TYPE_CHILDREN ? "children" :
            this.dataType === NODE_DATA_TYPE_STRING ? "string" :
            "extended";
        result.push(`dataType: ${dataType}`);
        if (this.dataType === NODE_DATA_TYPE_CHILDREN) {
            result.push(`childMask: ${this.childMask.toString(2).padStart(8, "0")}`);
            result.push(`childProperties: ${childProperties[this.kind]?.join(", ")}`);
        }
        return result.join("\n");
    }

    __printChildren(): string {
        const result = [];
        let next = this.index + 1;
        while (next) {
            const child = this.getOrCreateChildAtNodeIndex(next);
            next = child.next;
            result.push(child.__print());
        }
        return result.join("\n\n");
    }

    __printSubtree(): string {
        const result = [this.__print()];
        this.forEachChild(function visitNode(node) {
            result.push((node as RemoteNode).__print());
            node.forEachChild(visitNode);
        }, visitList => {
            result.push((visitList as RemoteNodeList).__print());
        });
        return result.join("\n\n");
    }

    // Boolean properties
    get isArrayType(): boolean | undefined {
        switch (this.kind) {
            case SyntaxKind.JSDocTypeLiteral:
                return (this.data & 1 << 24) !== 0;
        }
    }

    get isTypeOnly(): boolean | undefined {
        switch (this.kind) {
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ExportSpecifier:
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.ExportDeclaration:
                return (this.data & 1 << 24) !== 0;
        }
    }

    get isTypeOf(): boolean | undefined {
        switch (this.kind) {
            case SyntaxKind.ImportType:
                return (this.data & 1 << 24) !== 0;
        }
    }

    get multiline(): boolean | undefined {
        switch (this.kind) {
            case SyntaxKind.Block:
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.ImportAttributes:
                return (this.data & 1 << 24) !== 0;
        }
    }

    get isExportEquals(): boolean | undefined {
        switch (this.kind) {
            case SyntaxKind.ExportAssignment:
                return (this.data & 1 << 24) !== 0;
        }
    }

    get isBracketed(): boolean | undefined {
        switch (this.kind) {
            case SyntaxKind.JSDocPropertyTag:
            case SyntaxKind.JSDocParameterTag:
                return (this.data & 1 << 24) !== 0;
        }
    }

    get containsOnlyTriviaWhiteSpaces(): boolean | undefined {
        switch (this.kind) {
            case SyntaxKind.JsxText:
                return (this.data & 1 << 24) !== 0;
        }
    }

    get isNameFirst(): boolean | undefined {
        switch (this.kind) {
            case SyntaxKind.JSDocPropertyTag:
            case SyntaxKind.JSDocParameterTag:
                return (this.data & 1 << 25) !== 0;
        }
    }

    // Children properties
    get argument(): RemoteNode | undefined {
        return this.getNamedChild("argument") as RemoteNode;
    }
    get argumentExpression(): RemoteNode | undefined {
        return this.getNamedChild("argumentExpression") as RemoteNode;
    }
    get arguments(): RemoteNodeList | undefined {
        return this.getNamedChild("arguments") as RemoteNodeList;
    }
    get assertsModifier(): RemoteNode | undefined {
        return this.getNamedChild("assertsModifier") as RemoteNode;
    }
    get asteriskToken(): RemoteNode | undefined {
        return this.getNamedChild("asteriskToken") as RemoteNode;
    }
    get attributes(): RemoteNode | undefined {
        return this.getNamedChild("attributes") as RemoteNode;
    }
    get awaitModifier(): RemoteNode | undefined {
        return this.getNamedChild("awaitModifier") as RemoteNode;
    }
    get block(): RemoteNode | undefined {
        return this.getNamedChild("block") as RemoteNode;
    }
    get body(): RemoteNode | undefined {
        return this.getNamedChild("body") as RemoteNode;
    }
    get caseBlock(): RemoteNode | undefined {
        return this.getNamedChild("caseBlock") as RemoteNode;
    }
    get catchClause(): RemoteNode | undefined {
        return this.getNamedChild("catchClause") as RemoteNode;
    }
    get checkType(): RemoteNode | undefined {
        return this.getNamedChild("checkType") as RemoteNode;
    }
    get children(): RemoteNodeList | undefined {
        return this.getNamedChild("children") as RemoteNodeList;
    }
    get class(): RemoteNode | undefined {
        return this.getNamedChild("class") as RemoteNode;
    }
    get closingElement(): RemoteNode | undefined {
        return this.getNamedChild("closingElement") as RemoteNode;
    }
    get closingFragment(): RemoteNode | undefined {
        return this.getNamedChild("closingFragment") as RemoteNode;
    }
    get colonToken(): RemoteNode | undefined {
        return this.getNamedChild("colonToken") as RemoteNode;
    }
    get comment(): RemoteNode | undefined {
        return this.getNamedChild("comment") as RemoteNode;
    }
    get condition(): RemoteNode | undefined {
        return this.getNamedChild("condition") as RemoteNode;
    }
    get constraint(): RemoteNode | undefined {
        return this.getNamedChild("constraint") as RemoteNode;
    }
    get declarationList(): RemoteNode | undefined {
        return this.getNamedChild("declarationList") as RemoteNode;
    }
    get default(): RemoteNode | undefined {
        return this.getNamedChild("default") as RemoteNode;
    }
    get dotDotDotToken(): RemoteNode | undefined {
        return this.getNamedChild("dotDotDotToken") as RemoteNode;
    }
    get elements(): RemoteNodeList | undefined {
        return this.getNamedChild("elements") as RemoteNodeList;
    }
    get elseStatement(): RemoteNode | undefined {
        return this.getNamedChild("elseStatement") as RemoteNode;
    }
    get endOfFileToken(): RemoteNode | undefined {
        return this.getNamedChild("endOfFileToken") as RemoteNode;
    }
    get equalsGreaterThanToken(): RemoteNode | undefined {
        return this.getNamedChild("equalsGreaterThanToken") as RemoteNode;
    }
    get equalsToken(): RemoteNode | undefined {
        return this.getNamedChild("equalsToken") as RemoteNode;
    }
    get exclamationToken(): RemoteNode | undefined {
        return this.getNamedChild("exclamationToken") as RemoteNode;
    }
    get exportClause(): RemoteNode | undefined {
        return this.getNamedChild("exportClause") as RemoteNode;
    }
    get expression(): RemoteNode | undefined {
        return this.getNamedChild("expression") as RemoteNode;
    }
    get exprName(): RemoteNode | undefined {
        return this.getNamedChild("exprName") as RemoteNode;
    }
    get extendsType(): RemoteNode | undefined {
        return this.getNamedChild("extendsType") as RemoteNode;
    }
    get falseType(): RemoteNode | undefined {
        return this.getNamedChild("falseType") as RemoteNode;
    }
    get finallyBlock(): RemoteNode | undefined {
        return this.getNamedChild("finallyBlock") as RemoteNode;
    }
    get fullName(): RemoteNode | undefined {
        return this.getNamedChild("fullName") as RemoteNode;
    }
    get head(): RemoteNode | undefined {
        return this.getNamedChild("head") as RemoteNode;
    }
    get heritageClauses(): RemoteNodeList | undefined {
        return this.getNamedChild("heritageClauses") as RemoteNodeList;
    }
    get importClause(): RemoteNode | undefined {
        return this.getNamedChild("importClause") as RemoteNode;
    }
    get incrementor(): RemoteNode | undefined {
        return this.getNamedChild("incrementor") as RemoteNode;
    }
    get indexType(): RemoteNode | undefined {
        return this.getNamedChild("indexType") as RemoteNode;
    }
    get initializer(): RemoteNode | undefined {
        return this.getNamedChild("initializer") as RemoteNode;
    }
    get label(): RemoteNode | undefined {
        return this.getNamedChild("label") as RemoteNode;
    }
    get left(): RemoteNode | undefined {
        return this.getNamedChild("left") as RemoteNode;
    }
    get literal(): RemoteNode | undefined {
        return this.getNamedChild("literal") as RemoteNode;
    }
    get members(): RemoteNodeList | undefined {
        return this.getNamedChild("members") as RemoteNodeList;
    }
    get modifiers(): RemoteNodeList | undefined {
        return this.getNamedChild("modifiers") as RemoteNodeList;
    }
    get moduleReference(): RemoteNode | undefined {
        return this.getNamedChild("moduleReference") as RemoteNode;
    }
    get moduleSpecifier(): RemoteNode | undefined {
        return this.getNamedChild("moduleSpecifier") as RemoteNode;
    }
    get name(): RemoteNode | undefined {
        return this.getNamedChild("name") as RemoteNode;
    }
    get namedBindings(): RemoteNode | undefined {
        return this.getNamedChild("namedBindings") as RemoteNode;
    }

    get namespace(): RemoteNode | undefined {
        return this.getNamedChild("namespace") as RemoteNode;
    }
    get nameType(): RemoteNode | undefined {
        return this.getNamedChild("nameType") as RemoteNode;
    }
    get objectAssignmentInitializer(): RemoteNode | undefined {
        return this.getNamedChild("objectAssignmentInitializer") as RemoteNode;
    }
    get objectType(): RemoteNode | undefined {
        return this.getNamedChild("objectType") as RemoteNode;
    }
    get openingElement(): RemoteNode | undefined {
        return this.getNamedChild("openingElement") as RemoteNode;
    }
    get openingFragment(): RemoteNode | undefined {
        return this.getNamedChild("openingFragment") as RemoteNode;
    }
    get operatorToken(): RemoteNode | undefined {
        return this.getNamedChild("operatorToken") as RemoteNode;
    }
    get parameterName(): RemoteNode | undefined {
        return this.getNamedChild("parameterName") as RemoteNode;
    }
    get parameters(): RemoteNodeList | undefined {
        return this.getNamedChild("parameters") as RemoteNodeList;
    }
    get postfixToken(): RemoteNode | undefined {
        return this.getNamedChild("postfixToken") as RemoteNode;
    }
    get propertyName(): RemoteNode | undefined {
        return this.getNamedChild("propertyName") as RemoteNode;
    }
    get qualifier(): RemoteNode | undefined {
        return this.getNamedChild("qualifier") as RemoteNode;
    }
    get questionDotToken(): RemoteNode | undefined {
        return this.getNamedChild("questionDotToken") as RemoteNode;
    }
    get questionToken(): RemoteNode | undefined {
        return this.getNamedChild("questionToken") as RemoteNode;
    }
    get readonlyToken(): RemoteNode | undefined {
        return this.getNamedChild("readonlyToken") as RemoteNode;
    }
    get right(): RemoteNode | undefined {
        return this.getNamedChild("right") as RemoteNode;
    }
    get statement(): RemoteNode | undefined {
        return this.getNamedChild("statement") as RemoteNode;
    }
    get statements(): RemoteNodeList | undefined {
        return this.getNamedChild("statements") as RemoteNodeList;
    }
    get tag(): RemoteNode | undefined {
        return this.getNamedChild("tag") as RemoteNode;
    }
    get tagName(): RemoteNode | undefined {
        return this.getNamedChild("tagName") as RemoteNode;
    }
    get tags(): RemoteNodeList | undefined {
        return this.getNamedChild("tags") as RemoteNodeList;
    }
    get template(): RemoteNode | undefined {
        return this.getNamedChild("template") as RemoteNode;
    }
    get templateSpans(): RemoteNodeList | undefined {
        return this.getNamedChild("templateSpans") as RemoteNodeList;
    }
    get thenStatement(): RemoteNode | undefined {
        return this.getNamedChild("thenStatement") as RemoteNode;
    }
    get trueType(): RemoteNode | undefined {
        return this.getNamedChild("trueType") as RemoteNode;
    }
    get tryBlock(): RemoteNode | undefined {
        return this.getNamedChild("tryBlock") as RemoteNode;
    }
    get type(): RemoteNode | undefined {
        return this.getNamedChild("type") as RemoteNode;
    }
    get typeArguments(): RemoteNode | undefined {
        return this.getNamedChild("typeArguments") as RemoteNode;
    }
    get typeExpression(): RemoteNode | undefined {
        return this.getNamedChild("typeExpression") as RemoteNode;
    }
    get typeName(): RemoteNode | undefined {
        return this.getNamedChild("typeName") as RemoteNode;
    }
    get typeParameter(): RemoteNode | undefined {
        return this.getNamedChild("typeParameter") as RemoteNode;
    }
    get typeParameters(): RemoteNodeList | undefined {
        return this.getNamedChild("typeParameters") as RemoteNodeList;
    }
    get value(): RemoteNode | undefined {
        return this.getNamedChild("value") as RemoteNode;
    }
    get variableDeclaration(): RemoteNode | undefined {
        return this.getNamedChild("variableDeclaration") as RemoteNode;
    }
    get whenFalse(): RemoteNode | undefined {
        return this.getNamedChild("whenFalse") as RemoteNode;
    }
    get whenTrue(): RemoteNode | undefined {
        return this.getNamedChild("whenTrue") as RemoteNode;
    }

    // String properties
    get text(): string | undefined {
        switch (this.kind) {
            case SyntaxKind.JsxText:
            case SyntaxKind.Identifier:
            case SyntaxKind.PrivateIdentifier:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.BigIntLiteral:
            case SyntaxKind.RegularExpressionLiteral:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.JSDocText: {
                const stringIndex = this.data & NODE_STRING_INDEX_MASK;
                return this.getString(stringIndex);
            }
            case SyntaxKind.SourceFile:
            case SyntaxKind.TemplateHead:
            case SyntaxKind.TemplateMiddle:
            case SyntaxKind.TemplateTail: {
                const extendedDataOffset = this.sourceFile._offsetExtendedData + (this.data & NODE_EXTENDED_DATA_MASK);
                const stringIndex = this.view.getUint32(extendedDataOffset, true);
                return this.getString(stringIndex);
            }
        }
    }

    get rawText(): string | undefined {
        switch (this.kind) {
            case SyntaxKind.TemplateHead:
            case SyntaxKind.TemplateMiddle:
            case SyntaxKind.TemplateTail:
                const extendedDataOffset = this.sourceFile._offsetExtendedData + (this.data & NODE_EXTENDED_DATA_MASK);
                const stringIndex = this.view.getUint32(extendedDataOffset + 4, true);
                return this.getString(stringIndex);
        }
    }

    get fileName(): string | undefined {
        switch (this.kind) {
            case SyntaxKind.SourceFile:
                const extendedDataOffset = this.sourceFile._offsetExtendedData + (this.data & NODE_EXTENDED_DATA_MASK);
                const stringIndex = this.view.getUint32(extendedDataOffset + 4, true);
                return this.getString(stringIndex);
        }
    }

    get path(): string | undefined {
        switch (this.kind) {
            case SyntaxKind.SourceFile:
                const extendedDataOffset = this.sourceFile._offsetExtendedData + (this.data & NODE_EXTENDED_DATA_MASK);
                const stringIndex = this.view.getUint32(extendedDataOffset + 8, true);
                return this.getString(stringIndex);
        }
    }

    // Other properties
    get flags(): number {
        switch (this.kind) {
            case SyntaxKind.VariableDeclarationList:
                return this.data & (1 << 24 | 1 << 25) >> 24;
            default:
                return 0;
        }
    }

    get phaseModifier(): SyntaxKind {
        switch (this.kind) {
            case SyntaxKind.ImportClause:
                const flags = (this.data & (1 << 24 | 1 << 25)) >> 24;
                if (flags & 1) return SyntaxKind.TypeKeyword;
                if (flags & 2) return SyntaxKind.DeferKeyword;
                // fallthrough
            default:
                return SyntaxKind.Unknown;
        }
    }

    get token(): SyntaxKind | undefined {
        switch (this.kind) {
            case SyntaxKind.ImportAttributes:
                if ((this.data & 1 << 25) !== 0) {
                    return SyntaxKind.AssertKeyword;
                }
                return SyntaxKind.WithKeyword;
        }
    }

    get templateFlags(): number | undefined {
        switch (this.kind) {
            case SyntaxKind.TemplateHead:
            case SyntaxKind.TemplateMiddle:
            case SyntaxKind.TemplateTail:
                const extendedDataOffset = this.sourceFile._offsetExtendedData + (this.data & NODE_EXTENDED_DATA_MASK);
                return this.view.getUint32(extendedDataOffset + 8, true);
        }
    }
}

export class RemoteSourceFile extends RemoteNode {
    readonly nodes: (RemoteNode | RemoteNodeList)[];
    readonly _offsetNodes: number;
    readonly _offsetStringTableOffsets: number;
    readonly _offsetStringTable: number;
    readonly _offsetExtendedData: number;
    readonly _decoder: TextDecoder;

    constructor(data: Uint8Array, decoder: TextDecoder) {
        const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        const offsetNodes = view.getUint32(HEADER_OFFSET_NODES, true);
        super(view, 1, undefined!, undefined!, offsetNodes);
        this._sourceFile = this;
        this._offsetNodes = offsetNodes;
        this._offsetStringTableOffsets = view.getUint32(HEADER_OFFSET_STRING_TABLE_OFFSETS, true);
        this._offsetStringTable = view.getUint32(HEADER_OFFSET_STRING_TABLE, true);
        this._offsetExtendedData = view.getUint32(HEADER_OFFSET_EXTENDED_DATA, true);
        this._decoder = decoder;
        this.nodes = Array((view.byteLength - offsetNodes) / NODE_LEN);
        this.nodes[1] = this;
    }
}

/**
 * Find a descendant node at a specific position with matching kind and end position.
 */
export function findDescendant(root: Node, pos: number, end: number, kind: SyntaxKind): Node | undefined {
    if (root.pos === pos && root.end === end && root.kind === kind) {
        return root;
    }

    // Search children
    let result: Node | undefined;
    root.forEachChild(child => {
        if (result) return result; // Already found
        // Only search in children that could contain our target
        if (child.pos <= pos && child.end >= end) {
            result = findDescendant(child, pos, end, kind);
        }
        return undefined;
    });

    return result;
}

/**
 * Parsed components of a node handle.
 */
export interface ParsedNodeHandle {
    pos: number;
    end: number;
    kind: SyntaxKind;
    path: Path;
}

/**
 * Parse a node handle string into its components.
 * Handle format: "pos.end.kind.path" where path may contain dots.
 */
export function parseNodeHandle(handle: string): ParsedNodeHandle {
    // Find the positions of the first 3 dots
    const dot1 = handle.indexOf(".");
    const dot2 = handle.indexOf(".", dot1 + 1);
    const dot3 = handle.indexOf(".", dot2 + 1);

    if (dot1 === -1 || dot2 === -1 || dot3 === -1) {
        throw new Error(`Invalid node handle: ${handle}`);
    }

    return {
        pos: parseInt(handle.slice(0, dot1), 10),
        end: parseInt(handle.slice(dot1 + 1, dot2), 10),
        kind: parseInt(handle.slice(dot2 + 1, dot3), 10) as SyntaxKind,
        path: handle.slice(dot3 + 1) as Path,
    };
}

/**
 * Decode binary-encoded AST data into a Node.
 * Works for any binary-encoded node, including synthetic nodes
 * (e.g. from typeToTypeNode) that don't have a source file.
 */
export function decodeNode(data: Uint8Array): Node {
    const sf = new RemoteSourceFile(data, new TextDecoder());
    return sf as unknown as Node;
}

/**
 * Get the unique ID string for a remote node.
 * Throws if the node is not a RemoteNode (i.e. not decoded from binary data).
 */
export function getNodeId(node: Node): string {
    if (!(node instanceof RemoteNode)) {
        throw new Error("getNodeId requires a RemoteNode");
    }
    return node.id;
}
