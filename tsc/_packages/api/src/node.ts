import {
    type Node,
    type NodeArray,
    type SourceFile,
    SyntaxKind,
} from "@typescript/ast";

declare module "@typescript/ast" {
    export interface Node {
        readonly id: string;
        forEachChild<T>(visitor: (node: Node) => T): T | undefined;
        getSourceFile(): SourceFile;
    }

    export interface NodeArray<T> {
        at(index: number): T;
    }
}

const popcount8 = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8];

const childProperties: Readonly<Partial<Record<SyntaxKind, readonly string[]>>> = {
    [SyntaxKind.QualifiedName]: ["left", "right"],
    [SyntaxKind.TypeParameter]: ["modifiers", "name", "constraint", "defaultType"],
    [SyntaxKind.IfStatement]: ["expression", "thenStatement", "elseStatement"],
    [SyntaxKind.DoStatement]: ["statement", "expression"],
    [SyntaxKind.WhileStatement]: ["expression", "statement"],
    [SyntaxKind.ForStatement]: ["initializer", "condition", "incrementor", "statement"],
    [SyntaxKind.ForInStatement]: ["awaitModifier", "initializer", "expression", "statement"],
    [SyntaxKind.ForOfStatement]: ["awaitModifier", "initializer", "expression", "statement"],
    [SyntaxKind.WithStatement]: ["expression", "statement"],
    [SyntaxKind.SwitchStatement]: ["expression", "caseBlock"],
    [SyntaxKind.CaseClause]: ["expression", "statements"],
    [SyntaxKind.DefaultClause]: ["expression", "statements"],
    [SyntaxKind.TryStatement]: ["tryBlock", "catchClause", "finallyBlock"],
    [SyntaxKind.CatchClause]: ["variableDeclaration", "block"],
    [SyntaxKind.LabeledStatement]: ["label", "statement"],
    [SyntaxKind.VariableStatement]: ["modifiers", "declarationList"],
    [SyntaxKind.VariableDeclaration]: ["name", "exclamationToken", "type", "initializer"],
    [SyntaxKind.Parameter]: ["modifiers", "dotDotDotToken", "name", "questionToken", "type", "initializer"],
    [SyntaxKind.BindingElement]: ["dotDotDotToken", "propertyName", "name", "initializer"],
    [SyntaxKind.FunctionDeclaration]: ["modifiers", "asteriskToken", "name", "typeParameters", "parameters", "type", "body"],
    [SyntaxKind.InterfaceDeclaration]: ["modifiers", "name", "typeParameters", "heritageClauses", "members"],
    [SyntaxKind.TypeAliasDeclaration]: ["modifiers", "name", "typeParameters", "type"],
    [SyntaxKind.EnumMember]: ["name", "initializer"],
    [SyntaxKind.EnumDeclaration]: ["modifiers", "name", "members"],
    [SyntaxKind.ModuleDeclaration]: ["modifiers", "name", "body"],
    [SyntaxKind.ImportEqualsDeclaration]: ["modifiers", "name", "moduleReference"],
    [SyntaxKind.ImportDeclaration]: ["modifiers", "importClause", "moduleSpecifier", "attributes"],
    [SyntaxKind.ImportSpecifier]: ["propertyName", "name"],
    [SyntaxKind.ImportClause]: ["name", "namedBindings"],
    [SyntaxKind.ExportAssignment]: ["modifiers", "expression"],
    [SyntaxKind.NamespaceExportDeclaration]: ["modifiers", "name"],
    [SyntaxKind.ExportDeclaration]: ["modifiers", "exportClause", "moduleSpecifier", "attributes"],
    [SyntaxKind.ExportSpecifier]: ["propertyName", "name"],
    [SyntaxKind.CallSignature]: ["typeParameters", "parameters", "type"],
    [SyntaxKind.ConstructSignature]: ["typeParameters", "parameters", "type"],
    [SyntaxKind.Constructor]: ["modifiers", "typeParameters", "parameters", "type", "body"],
    [SyntaxKind.GetAccessor]: ["modifiers", "name", "typeParameters", "parameters", "type", "body"],
    [SyntaxKind.SetAccessor]: ["modifiers", "name", "typeParameters", "parameters", "type", "body"],
    [SyntaxKind.IndexSignature]: ["modifiers", "parameters", "type"],
    [SyntaxKind.MethodSignature]: ["modifiers", "name", "postfixToken", "typeParameters", "parameters", "type"],
    [SyntaxKind.MethodDeclaration]: ["modifiers", "asteriskToken", "name", "postfixToken", "typeParameters", "parameters", "type", "body"],
    [SyntaxKind.PropertySignature]: ["modifiers", "name", "postfixToken", "type", "initializer"],
    [SyntaxKind.PropertyDeclaration]: ["modifiers", "name", "postfixToken", "type", "initializer"],
    [SyntaxKind.BinaryExpression]: ["left", "operatorToken", "right"],
    [SyntaxKind.YieldExpression]: ["asteriskToken", "expression"],
    [SyntaxKind.ArrowFunction]: ["modifiers", "typeParameters", "parameters", "type", "equalsGreaterThanToken", "body"],
    [SyntaxKind.FunctionExpression]: ["modifiers", "asteriskToken", "name", "typeParameters", "parameters", "type", "body"],
    [SyntaxKind.AsExpression]: ["expression", "type"],
    [SyntaxKind.SatisfiesExpression]: ["expression", "type"],
    [SyntaxKind.ConditionalExpression]: ["condition", "questionToken", "whenTrue", "colonToken", "whenFalse"],
    [SyntaxKind.PropertyAccessExpression]: ["expression", "questionDotToken", "name"],
    [SyntaxKind.ElementAccessExpression]: ["expression", "questionDotToken", "argumentExpression"],
    [SyntaxKind.CallExpression]: ["expression", "questionDotToken", "typeArguments", "arguments"],
    [SyntaxKind.NewExpression]: ["expression", "typeArguments", "arguments"],
    [SyntaxKind.TemplateExpression]: ["head", "templateSpans"],
    [SyntaxKind.TemplateSpan]: ["expression", "literal"],
    [SyntaxKind.TaggedTemplateExpression]: ["tag", "questionDotToken", "typeArguments", "template"],
    [SyntaxKind.PropertyAssignment]: ["modifiers", "name", "postfixToken", "initializer"],
    [SyntaxKind.ShorthandPropertyAssignment]: ["modifiers", "name", "postfixToken", "equalsToken", "objectAssignmentInitializer"],
    [SyntaxKind.TypeAssertionExpression]: ["type", "expression"],
    [SyntaxKind.ConditionalType]: ["checkType", "extendsType", "trueType", "falseType"],
    [SyntaxKind.IndexedAccessType]: ["objectType", "indexType"],
    [SyntaxKind.TypeReference]: ["typeName", "typeArguments"],
    [SyntaxKind.ExpressionWithTypeArguments]: ["expression", "typeArguments"],
    [SyntaxKind.TypePredicate]: ["assertsModifier", "parameterName", "type"],
    [SyntaxKind.ImportType]: ["argument", "attributes", "qualifier", "typeArguments"],
    [SyntaxKind.ImportAttribute]: ["name", "value"],
    [SyntaxKind.TypeQuery]: ["exprName", "typeArguments"],
    [SyntaxKind.MappedType]: ["readonlyToken", "typeParameter", "nameType", "questionToken", "type", "members"],
    [SyntaxKind.NamedTupleMember]: ["dotDotDotToken", "name", "questionToken", "type"],
    [SyntaxKind.FunctionType]: ["typeParameters", "parameters", "type"],
    [SyntaxKind.ConstructorType]: ["modifiers", "typeParameters", "parameters", "type"],
    [SyntaxKind.TemplateLiteralType]: ["head", "templateSpans"],
    [SyntaxKind.TemplateLiteralTypeSpan]: ["type", "literal"],
    [SyntaxKind.JsxElement]: ["openingElement", "children", "closingElement"],
    [SyntaxKind.JsxNamespacedName]: ["name", "namespace"],
    [SyntaxKind.JsxOpeningElement]: ["tagName", "typeArguments", "attributes"],
    [SyntaxKind.JsxSelfClosingElement]: ["tagName", "typeArguments", "attributes"],
    [SyntaxKind.JsxFragment]: ["openingFragment", "children", "closingFragment"],
    [SyntaxKind.JsxAttribute]: ["name", "initializer"],
    [SyntaxKind.JsxExpression]: ["dotDotDotToken", "expression"],
    [SyntaxKind.JSDoc]: ["comment", "tags"],
    [SyntaxKind.JSDocTypeTag]: ["tagName", "typeExpression", "comment"],
    [SyntaxKind.JSDocTag]: ["tagName", "comment"],
    [SyntaxKind.JSDocTemplateTag]: ["tagName", "constraint", "typeParameters", "comment"],
    [SyntaxKind.JSDocReturnTag]: ["tagName", "typeExpression", "comment"],
    [SyntaxKind.JSDocPublicTag]: ["tagName", "comment"],
    [SyntaxKind.JSDocPrivateTag]: ["tagName", "comment"],
    [SyntaxKind.JSDocProtectedTag]: ["tagName", "comment"],
    [SyntaxKind.JSDocReadonlyTag]: ["tagName", "comment"],
    [SyntaxKind.JSDocOverrideTag]: ["tagName", "comment"],
    [SyntaxKind.JSDocDeprecatedTag]: ["tagName", "comment"],
    [SyntaxKind.JSDocSeeTag]: ["tagName", "nameExpression", "comment"],
    [SyntaxKind.JSDocImplementsTag]: ["tagName", "className", "comment"],
    [SyntaxKind.JSDocAugmentsTag]: ["tagName", "className", "comment"],
    [SyntaxKind.JSDocSatisfiesTag]: ["tagName", "typeExpression", "comment"],
    [SyntaxKind.JSDocThisTag]: ["tagName", "typeExpression", "comment"],
    [SyntaxKind.JSDocImportTag]: ["tagName", "importClause", "moduleSpecifier", "attributes", "comment"],
    [SyntaxKind.JSDocCallbackTag]: ["tagName", "typeExpression", "fullName", "comment"],
    [SyntaxKind.JSDocOverloadTag]: ["tagName", "typeExpression", "comment"],
    [SyntaxKind.JSDocTypedefTag]: ["tagName", "typeExpression", "fullName", "comment"],
    [SyntaxKind.JSDocSignature]: ["typeParameters", "parameters", "type"],
    [SyntaxKind.ClassStaticBlockDeclaration]: ["modifiers", "body"],
    [SyntaxKind.ClassDeclaration]: ["modifiers", "name", "typeParameters", "heritageClauses", "members"],

    // Later properties are in variable order, needs special handling
    [SyntaxKind.JSDocPropertyTag]: [undefined!, undefined!],
    [SyntaxKind.JSDocParameterTag]: ["tagName", undefined!, undefined!, "comment"],
};

const HEADER_OFFSET_RESERVED = 0;
const HEADER_OFFSET_STRING_TABLE_OFFSETS = 4;
const HEADER_OFFSET_STRING_TABLE = 8;
const HEADER_OFFSET_EXTENDED_DATA = 12;
const HEADER_OFFSET_NODES = 16;
const HEADER_SIZE = 20;

type NodeDataType = typeof NODE_DATA_TYPE_CHILDREN | typeof NODE_DATA_TYPE_STRING | typeof NODE_DATA_TYPE_EXTENDED;
const NODE_DATA_TYPE_CHILDREN = 0x00000000;
const NODE_DATA_TYPE_STRING = 0x40000000;
const NODE_DATA_TYPE_EXTENDED = 0x80000000;
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
const NODE_LEN = 24;

const KIND_NODE_LIST = 2 ** 32 - 1;

export class RemoteNodeBase {
    parent: RemoteNode;
    protected view: DataView;
    protected decoder: TextDecoder;
    protected index: number;
    /** Keys are positions */
    protected _children: Map<number, RemoteNode | RemoteNodeList> | undefined;

    constructor(view: DataView, decoder: TextDecoder, index: number, parent: RemoteNode) {
        this.view = view;
        this.decoder = decoder;
        this.index = index;
        this.parent = parent;
    }

    get kind(): SyntaxKind {
        return this.view.getUint32(this.byteIndex + NODE_OFFSET_KIND, true);
    }

    get pos(): number {
        return this.view.getUint32(this.byteIndex + NODE_OFFSET_POS, true);
    }

    get end(): number {
        return this.view.getUint32(this.byteIndex + NODE_OFFSET_END, true);
    }

    get next(): number {
        return this.view.getUint32(this.byteIndex + NODE_OFFSET_NEXT, true);
    }

    protected get byteIndex(): number {
        return this.offsetNodes + this.index * NODE_LEN;
    }

    protected get offsetStringTableOffsets(): number {
        return this.view.getUint32(HEADER_OFFSET_STRING_TABLE_OFFSETS, true);
    }

    protected get offsetStringTable(): number {
        return this.view.getUint32(HEADER_OFFSET_STRING_TABLE, true);
    }

    protected get offsetExtendedData(): number {
        return this.view.getUint32(HEADER_OFFSET_EXTENDED_DATA, true);
    }

    protected get offsetNodes(): number {
        return this.view.getUint32(HEADER_OFFSET_NODES, true);
    }

    protected get parentIndex(): number {
        return this.view.getUint32(this.byteIndex + NODE_OFFSET_PARENT, true);
    }

    protected get data(): number {
        return this.view.getUint32(this.byteIndex + NODE_OFFSET_DATA, true);
    }

    protected get dataType(): NodeDataType {
        return (this.data & NODE_DATA_TYPE_MASK) as NodeDataType;
    }

    protected get childMask(): number {
        if (this.dataType !== NODE_DATA_TYPE_CHILDREN) {
            return 0;
        }
        return this.data & NODE_CHILD_MASK;
    }

    protected getFileText(start: number, end: number): string {
        return this.decoder.decode(new Uint8Array(this.view.buffer, this.offsetStringTable + start, end - start));
    }
}

export class RemoteNodeList extends Array<RemoteNode> implements NodeArray<RemoteNode> {
    parent: RemoteNode;
    protected view: DataView;
    protected decoder: TextDecoder;
    protected index: number;
    /** Keys are positions */
    protected _children: Map<number, RemoteNode | RemoteNodeList> | undefined;

    get pos(): number {
        return this.view.getUint32(this.byteIndex + NODE_OFFSET_POS, true);
    }

    get end(): number {
        return this.view.getUint32(this.byteIndex + NODE_OFFSET_END, true);
    }

    get next(): number {
        return this.view.getUint32(this.byteIndex + NODE_OFFSET_NEXT, true);
    }

    private get data(): number {
        return this.view.getUint32(this.byteIndex + NODE_OFFSET_DATA, true);
    }

    private get offsetNodes(): number {
        return this.view.getUint32(HEADER_OFFSET_NODES, true);
    }

    private get byteIndex(): number {
        return this.offsetNodes + this.index * NODE_LEN;
    }

    constructor(view: DataView, decoder: TextDecoder, index: number, parent: RemoteNode) {
        super();
        this.view = view;
        this.decoder = decoder;
        this.index = index;
        this.parent = parent;
        this.length = this.data;

        const length = this.length;
        for (let i = 0; i < length; i++) {
            Object.defineProperty(this, i, {
                get() {
                    return this.at(i);
                },
            });
        }
    }

    *[Symbol.iterator](): ArrayIterator<RemoteNode> {
        let next = this.index + 1;
        while (next) {
            const child = this.getOrCreateChildAtNodeIndex(next);
            next = child.next;
            yield child as RemoteNode;
        }
    }

    at(index: number): RemoteNode {
        if (!Number.isInteger(index)) {
            return undefined!;
        }
        if (index < 0) {
            index = this.length - index;
        }
        let next = this.index + 1;
        for (let i = 0; i < index; i++) {
            const child = this.getOrCreateChildAtNodeIndex(next);
            next = child.next;
        }
        return this.getOrCreateChildAtNodeIndex(next) as RemoteNode;
    }

    private getOrCreateChildAtNodeIndex(index: number): RemoteNode | RemoteNodeList {
        const pos = this.view.getUint32(this.offsetNodes + index * NODE_LEN + NODE_OFFSET_POS, true);
        let child = (this._children ??= new Map()).get(pos);
        if (!child) {
            const kind = this.view.getUint32(this.offsetNodes + index * NODE_LEN + NODE_OFFSET_KIND, true);
            if (kind === KIND_NODE_LIST) {
                throw new Error("NodeList cannot directly contain another NodeList");
            }
            child = new RemoteNode(this.view, this.decoder, index, this.parent);
            this._children.set(pos, child);
        }
        return child;
    }

    __print(): string {
        const result = [];
        result.push(`kind: NodeList`);
        result.push(`index: ${this.index}`);
        result.push(`byteIndex: ${this.byteIndex}`);
        result.push(`length: ${this.length}`);
        return result.join("\n");
    }
}

export class RemoteNode extends RemoteNodeBase implements Node {
    protected static NODE_LEN: number = NODE_LEN;
    private sourceFile: SourceFile;
    id: string;

    constructor(view: DataView, decoder: TextDecoder, index: number, parent: RemoteNode) {
        super(view, decoder, index, parent);
        let sourceFile: RemoteNode = this;
        while (sourceFile && sourceFile.kind !== SyntaxKind.SourceFile) {
            sourceFile = sourceFile.parent;
        }
        if (!sourceFile) {
            throw new Error("SourceFile not found");
        }
        this.sourceFile = sourceFile as unknown as SourceFile;
        this.id = `${sourceFile.id}.${this.pos}.${this.kind}`;
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
                    for (const node of child) {
                        const result = visitNode(node);
                        if (result) {
                            return result;
                        }
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
        return this.sourceFile;
    }

    protected getString(index: number): string {
        const start = this.view.getUint32(this.offsetStringTableOffsets + index * 4, true);
        const end = this.view.getUint32(this.offsetStringTableOffsets + (index + 1) * 4, true);
        const text = new Uint8Array(this.view.buffer, this.offsetStringTable + start, end - start);
        return this.decoder.decode(text);
    }

    private getOrCreateChildAtNodeIndex(index: number): RemoteNode | RemoteNodeList {
        const pos = this.view.getUint32(this.offsetNodes + index * NODE_LEN + NODE_OFFSET_POS, true);
        let child = (this._children ??= new Map()).get(pos);
        if (!child) {
            const kind = this.view.getUint32(this.offsetNodes + index * NODE_LEN + NODE_OFFSET_KIND, true);
            child = kind === KIND_NODE_LIST
                ? new RemoteNodeList(this.view, this.decoder, index, this)
                : new RemoteNode(this.view, this.decoder, index, this);
            this._children.set(pos, child);
        }
        return child;
    }

    private hasChildren(): boolean {
        if (this._children) {
            return true;
        }
        if (this.byteIndex >= this.view.byteLength - NODE_LEN) {
            return false;
        }
        const nextNodeParent = this.view.getUint32(this.offsetNodes + (this.index + 1) * NODE_LEN + NODE_OFFSET_PARENT, true);
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
        return this.getOrCreateChildAtNodeIndex(this.index + 1 + propertyIndex);
    }

    __print(): string {
        const result = [];
        result.push(`index: ${this.index}`);
        result.push(`byteIndex: ${this.byteIndex}`);
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
            case SyntaxKind.ImportClause:
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
    get className(): RemoteNode | undefined {
        return this.getNamedChild("className") as RemoteNode;
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
    get defaultType(): RemoteNode | undefined {
        return this.getNamedChild("defaultType") as RemoteNode;
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
    get nameExpression(): RemoteNode | undefined {
        return this.getNamedChild("nameExpression") as RemoteNode;
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
                const extendedDataOffset = this.offsetExtendedData + (this.data & NODE_EXTENDED_DATA_MASK);
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
                const extendedDataOffset = this.offsetExtendedData + (this.data & NODE_EXTENDED_DATA_MASK);
                const stringIndex = this.view.getUint32(extendedDataOffset + 4, true);
                return this.getString(stringIndex);
        }
    }

    get fileName(): string | undefined {
        switch (this.kind) {
            case SyntaxKind.SourceFile:
                const extendedDataOffset = this.offsetExtendedData + (this.data & NODE_EXTENDED_DATA_MASK);
                const stringIndex = this.view.getUint32(extendedDataOffset + 4, true);
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
                const extendedDataOffset = this.offsetExtendedData + (this.data & NODE_EXTENDED_DATA_MASK);
                return this.view.getUint32(extendedDataOffset + 8, true);
        }
    }
}

export class RemoteSourceFile extends RemoteNode {
    constructor(data: Uint8Array, decoder: TextDecoder) {
        const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        super(view, decoder, 1, undefined!);
        this.id = this.getString(this.view.getUint32(this.offsetExtendedData + 8, true));
    }
}
