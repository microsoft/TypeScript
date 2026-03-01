import {
    collapseTextChangeRangesAcrossMultipleVersions,
    computeLineStarts,
    createTextChangeRange,
    createTextSpan,
    Debug,
    IScriptSnapshot,
    TextChangeRange,
    TextSpan,
    unchangedTextChangeRange,
} from "./_namespaces/ts.js";
import { emptyArray } from "./_namespaces/ts.server.js";
import * as protocol from "./protocol.js";

const lineCollectionCapacity = 4;

/** @internal */
export interface LineCollection {
    charCount(): number;
    lineCount(): number;
    isLeaf(): this is LineLeaf;
    walk(rangeStart: number, rangeLength: number, walkFns: LineIndexWalker): void;
}

/** @internal */
export interface AbsolutePositionAndLineText {
    absolutePosition: number;
    lineText: string | undefined;
}

/** @internal */
export const enum CharRangeSection {
    PreStart,
    Start,
    Entire,
    Mid,
    End,
    PostEnd,
}

/** @internal */
export interface LineIndexWalker {
    goSubtree: boolean;
    done: boolean;
    leaf(relativeStart: number, relativeLength: number, lineCollection: LineLeaf): void;
    pre?(relativeStart: number, relativeLength: number, lineCollection: LineCollection, parent: LineNode, nodeType: CharRangeSection): void;
    post?(relativeStart: number, relativeLength: number, lineCollection: LineCollection, parent: LineNode, nodeType: CharRangeSection): void;
}

class EditWalker implements LineIndexWalker {
    goSubtree = true;
    get done() {
        return false;
    }

    readonly lineIndex = new LineIndex();
    // path to start of range
    private readonly startPath: LineCollection[];
    private readonly endBranch: LineCollection[] = [];
    private branchNode: LineNode | undefined;
    // path to current node
    private readonly stack: LineNode[];
    private state = CharRangeSection.Entire;
    private lineCollectionAtBranch: LineCollection | undefined;
    private initialText = "";
    private trailingText = "";

    constructor() {
        this.lineIndex.root = new LineNode();
        this.startPath = [this.lineIndex.root];
        this.stack = [this.lineIndex.root];
    }

    insertLines(insertedText: string | undefined, suppressTrailingText: boolean) {
        if (suppressTrailingText) {
            this.trailingText = "";
        }
        if (insertedText) {
            insertedText = this.initialText + insertedText + this.trailingText;
        }
        else {
            insertedText = this.initialText + this.trailingText;
        }
        const lm = LineIndex.linesFromText(insertedText);
        const lines = lm.lines;
        if (lines.length > 1 && lines[lines.length - 1] === "") {
            lines.pop();
        }
        let branchParent: LineNode | undefined;
        let lastZeroCount: LineCollection | undefined;

        for (let k = this.endBranch.length - 1; k >= 0; k--) {
            (this.endBranch[k] as LineNode).updateCounts();
            if (this.endBranch[k].charCount() === 0) {
                lastZeroCount = this.endBranch[k];
                if (k > 0) {
                    branchParent = this.endBranch[k - 1] as LineNode;
                }
                else {
                    branchParent = this.branchNode;
                }
            }
        }
        if (lastZeroCount) {
            branchParent!.remove(lastZeroCount);
        }

        // path at least length two (root and leaf)
        const leafNode = this.startPath[this.startPath.length - 1] as LineLeaf;

        if (lines.length > 0) {
            leafNode.text = lines[0];

            if (lines.length > 1) {
                let insertedNodes = new Array(lines.length - 1) as LineCollection[];
                let startNode = leafNode as LineCollection;
                for (let i = 1; i < lines.length; i++) {
                    insertedNodes[i - 1] = new LineLeaf(lines[i]);
                }
                let pathIndex = this.startPath.length - 2;
                while (pathIndex >= 0) {
                    const insertionNode = this.startPath[pathIndex] as LineNode;
                    insertedNodes = insertionNode.insertAt(startNode, insertedNodes);
                    pathIndex--;
                    startNode = insertionNode;
                }
                let insertedNodesLen = insertedNodes.length;
                while (insertedNodesLen > 0) {
                    const newRoot = new LineNode();
                    newRoot.add(this.lineIndex.root);
                    insertedNodes = newRoot.insertAt(this.lineIndex.root, insertedNodes);
                    insertedNodesLen = insertedNodes.length;
                    this.lineIndex.root = newRoot;
                }
                this.lineIndex.root.updateCounts();
            }
            else {
                for (let j = this.startPath.length - 2; j >= 0; j--) {
                    (this.startPath[j] as LineNode).updateCounts();
                }
            }
        }
        else {
            const insertionNode = this.startPath[this.startPath.length - 2] as LineNode;
            // no content for leaf node, so delete it
            insertionNode.remove(leafNode);
            for (let j = this.startPath.length - 2; j >= 0; j--) {
                (this.startPath[j] as LineNode).updateCounts();
            }
        }

        return this.lineIndex;
    }

    post(_relativeStart: number, _relativeLength: number, lineCollection: LineCollection): void {
        // have visited the path for start of range, now looking for end
        // if range is on single line, we will never make this state transition
        if (lineCollection === this.lineCollectionAtBranch) {
            this.state = CharRangeSection.End;
        }
        // always pop stack because post only called when child has been visited
        this.stack.pop();
    }

    pre(_relativeStart: number, _relativeLength: number, lineCollection: LineCollection, _parent: LineCollection, nodeType: CharRangeSection): void {
        // currentNode corresponds to parent, but in the new tree
        const currentNode = this.stack[this.stack.length - 1];

        if ((this.state === CharRangeSection.Entire) && (nodeType === CharRangeSection.Start)) {
            // if range is on single line, we will never make this state transition
            this.state = CharRangeSection.Start;
            this.branchNode = currentNode;
            this.lineCollectionAtBranch = lineCollection;
        }

        let child: LineCollection | undefined;
        function fresh(node: LineCollection): LineCollection {
            if (node.isLeaf()) {
                return new LineLeaf("");
            }
            else return new LineNode();
        }
        switch (nodeType) {
            case CharRangeSection.PreStart:
                this.goSubtree = false;
                if (this.state !== CharRangeSection.End) {
                    currentNode.add(lineCollection);
                }
                break;
            case CharRangeSection.Start:
                if (this.state === CharRangeSection.End) {
                    this.goSubtree = false;
                }
                else {
                    child = fresh(lineCollection);
                    currentNode.add(child);
                    this.startPath.push(child);
                }
                break;
            case CharRangeSection.Entire:
                if (this.state !== CharRangeSection.End) {
                    child = fresh(lineCollection);
                    currentNode.add(child);
                    this.startPath.push(child);
                }
                else {
                    if (!lineCollection.isLeaf()) {
                        child = fresh(lineCollection);
                        currentNode.add(child);
                        this.endBranch.push(child);
                    }
                }
                break;
            case CharRangeSection.Mid:
                this.goSubtree = false;
                break;
            case CharRangeSection.End:
                if (this.state !== CharRangeSection.End) {
                    this.goSubtree = false;
                }
                else {
                    if (!lineCollection.isLeaf()) {
                        child = fresh(lineCollection);
                        currentNode.add(child);
                        this.endBranch.push(child);
                    }
                }
                break;
            case CharRangeSection.PostEnd:
                this.goSubtree = false;
                if (this.state !== CharRangeSection.Start) {
                    currentNode.add(lineCollection);
                }
                break;
        }
        if (this.goSubtree) {
            this.stack.push(child as LineNode);
        }
    }
    // just gather text from the leaves
    leaf(relativeStart: number, relativeLength: number, ll: LineLeaf) {
        if (this.state === CharRangeSection.Start) {
            this.initialText = ll.text.substring(0, relativeStart);
        }
        else if (this.state === CharRangeSection.Entire) {
            this.initialText = ll.text.substring(0, relativeStart);
            this.trailingText = ll.text.substring(relativeStart + relativeLength);
        }
        else {
            // state is CharRangeSection.End
            this.trailingText = ll.text.substring(relativeStart + relativeLength);
        }
    }
}

// text change information
class TextChange {
    constructor(public pos: number, public deleteLen: number, public insertedText?: string) {
    }

    getTextChangeRange() {
        return createTextChangeRange(createTextSpan(this.pos, this.deleteLen), this.insertedText ? this.insertedText.length : 0);
    }
}

/** @internal */
export class ScriptVersionCache {
    private static readonly changeNumberThreshold = 8;
    private static readonly changeLengthThreshold = 256;
    private static readonly maxVersions = 8;

    private changes: TextChange[] = [];
    private readonly versions: LineIndexSnapshot[] = new Array<LineIndexSnapshot>(ScriptVersionCache.maxVersions);
    private minVersion = 0; // no versions earlier than min version will maintain change history

    private currentVersion = 0;

    private versionToIndex(version: number) {
        if (version < this.minVersion || version > this.currentVersion) {
            return undefined;
        }
        return version % ScriptVersionCache.maxVersions;
    }

    private currentVersionToIndex() {
        return this.currentVersion % ScriptVersionCache.maxVersions;
    }

    // REVIEW: can optimize by coalescing simple edits
    edit(pos: number, deleteLen: number, insertedText?: string): void {
        this.changes.push(new TextChange(pos, deleteLen, insertedText));
        if (
            this.changes.length > ScriptVersionCache.changeNumberThreshold ||
            deleteLen > ScriptVersionCache.changeLengthThreshold ||
            insertedText && insertedText.length > ScriptVersionCache.changeLengthThreshold
        ) {
            this.getSnapshot();
        }
    }

    getSnapshot(): IScriptSnapshot {
        return this._getSnapshot();
    }

    private _getSnapshot(): LineIndexSnapshot {
        let snap = this.versions[this.currentVersionToIndex()];
        if (this.changes.length > 0) {
            let snapIndex = snap.index;
            for (const change of this.changes) {
                snapIndex = snapIndex.edit(change.pos, change.deleteLen, change.insertedText);
            }
            snap = new LineIndexSnapshot(this.currentVersion + 1, this, snapIndex, this.changes);

            this.currentVersion = snap.version;
            this.versions[this.currentVersionToIndex()] = snap;
            this.changes = [];

            if ((this.currentVersion - this.minVersion) >= ScriptVersionCache.maxVersions) {
                this.minVersion = (this.currentVersion - ScriptVersionCache.maxVersions) + 1;
            }
        }
        return snap;
    }

    getSnapshotVersion(): number {
        return this._getSnapshot().version;
    }

    getAbsolutePositionAndLineText(oneBasedLine: number): AbsolutePositionAndLineText {
        return this._getSnapshot().index.lineNumberToInfo(oneBasedLine);
    }

    lineOffsetToPosition(line: number, column: number): number {
        return this._getSnapshot().index.absolutePositionOfStartOfLine(line) + (column - 1);
    }

    positionToLineOffset(position: number): protocol.Location {
        return this._getSnapshot().index.positionToLineOffset(position);
    }

    lineToTextSpan(line: number): TextSpan {
        const index = this._getSnapshot().index;
        const { lineText, absolutePosition } = index.lineNumberToInfo(line + 1);
        const len = lineText !== undefined ? lineText.length : index.absolutePositionOfStartOfLine(line + 2) - absolutePosition;
        return createTextSpan(absolutePosition, len);
    }

    getTextChangesBetweenVersions(oldVersion: number, newVersion: number): TextChangeRange | undefined {
        if (oldVersion < newVersion) {
            if (oldVersion >= this.minVersion) {
                const textChangeRanges: TextChangeRange[] = [];
                for (let i = oldVersion + 1; i <= newVersion; i++) {
                    const snap = this.versions[this.versionToIndex(i)!]; // TODO: GH#18217
                    for (const textChange of snap.changesSincePreviousVersion) {
                        textChangeRanges.push(textChange.getTextChangeRange());
                    }
                }
                return collapseTextChangeRangesAcrossMultipleVersions(textChangeRanges);
            }
            else {
                return undefined;
            }
        }
        else {
            return unchangedTextChangeRange;
        }
    }

    getLineCount(): number {
        return this._getSnapshot().index.getLineCount();
    }

    static fromString(script: string): ScriptVersionCache {
        const svc = new ScriptVersionCache();
        const snap = new LineIndexSnapshot(0, svc, new LineIndex());
        svc.versions[svc.currentVersion] = snap;
        const lm = LineIndex.linesFromText(script);
        snap.index.load(lm.lines);
        return svc;
    }
}

class LineIndexSnapshot implements IScriptSnapshot {
    constructor(readonly version: number, readonly cache: ScriptVersionCache, readonly index: LineIndex, readonly changesSincePreviousVersion: readonly TextChange[] = emptyArray) {
    }

    getText(rangeStart: number, rangeEnd: number) {
        return this.index.getText(rangeStart, rangeEnd - rangeStart);
    }

    getLength() {
        return this.index.getLength();
    }

    getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange | undefined {
        if (oldSnapshot instanceof LineIndexSnapshot && this.cache === oldSnapshot.cache) {
            if (this.version <= oldSnapshot.version) {
                return unchangedTextChangeRange;
            }
            else {
                return this.cache.getTextChangesBetweenVersions(oldSnapshot.version, this.version);
            }
        }
    }
}

/** @internal */
export class LineIndex {
    root!: LineNode;
    // set this to true to check each edit for accuracy
    checkEdits = false;

    absolutePositionOfStartOfLine(oneBasedLine: number): number {
        return this.lineNumberToInfo(oneBasedLine).absolutePosition;
    }

    positionToLineOffset(position: number): protocol.Location {
        const { oneBasedLine, zeroBasedColumn } = this.root.charOffsetToLineInfo(1, position);
        return { line: oneBasedLine, offset: zeroBasedColumn + 1 };
    }

    private positionToColumnAndLineText(position: number): { zeroBasedColumn: number; lineText: string | undefined; } {
        return this.root.charOffsetToLineInfo(1, position);
    }

    getLineCount(): number {
        return this.root.lineCount();
    }

    lineNumberToInfo(oneBasedLine: number): AbsolutePositionAndLineText {
        const lineCount = this.getLineCount();
        if (oneBasedLine <= lineCount) {
            const { position, leaf } = this.root.lineNumberToInfo(oneBasedLine, 0);
            return { absolutePosition: position, lineText: leaf && leaf.text };
        }
        else {
            return { absolutePosition: this.root.charCount(), lineText: undefined };
        }
    }

    load(lines: string[]): void {
        if (lines.length > 0) {
            const leaves: LineLeaf[] = [];
            for (let i = 0; i < lines.length; i++) {
                leaves[i] = new LineLeaf(lines[i]);
            }
            this.root = LineIndex.buildTreeFromBottom(leaves);
        }
        else {
            this.root = new LineNode();
        }
    }

    walk(rangeStart: number, rangeLength: number, walkFns: LineIndexWalker): void {
        this.root.walk(rangeStart, rangeLength, walkFns);
    }

    getText(rangeStart: number, rangeLength: number): string {
        let accum = "";
        if ((rangeLength > 0) && (rangeStart < this.root.charCount())) {
            this.walk(rangeStart, rangeLength, {
                goSubtree: true,
                done: false,
                leaf: (relativeStart: number, relativeLength: number, ll: LineLeaf) => {
                    accum = accum.concat(ll.text.substring(relativeStart, relativeStart + relativeLength));
                },
            });
        }
        return accum;
    }

    getLength(): number {
        return this.root.charCount();
    }

    every(f: (ll: LineLeaf, s: number, len: number) => boolean, rangeStart: number, rangeEnd?: number): boolean {
        if (!rangeEnd) {
            rangeEnd = this.root.charCount();
        }
        const walkFns = {
            goSubtree: true,
            done: false,
            leaf(this: LineIndexWalker, relativeStart: number, relativeLength: number, ll: LineLeaf) {
                if (!f(ll, relativeStart, relativeLength)) {
                    this.done = true;
                }
            },
        };
        this.walk(rangeStart, rangeEnd - rangeStart, walkFns);
        return !walkFns.done;
    }

    edit(pos: number, deleteLength: number, newText?: string): LineIndex {
        if (this.root.charCount() === 0) {
            Debug.assert(deleteLength === 0); // Can't delete from empty document
            if (newText !== undefined) {
                this.load(LineIndex.linesFromText(newText).lines);
                return this;
            }
            return undefined!; // TODO: GH#18217
        }
        else {
            let checkText: string | undefined;
            if (this.checkEdits) {
                const source = this.getText(0, this.root.charCount());
                checkText = source.slice(0, pos) + newText + source.slice(pos + deleteLength);
            }
            const walker = new EditWalker();
            let suppressTrailingText = false;
            if (pos >= this.root.charCount()) {
                // insert at end
                pos = this.root.charCount() - 1;
                const endString = this.getText(pos, 1);
                if (newText) {
                    newText = endString + newText;
                }
                else {
                    newText = endString;
                }
                deleteLength = 0;
                suppressTrailingText = true;
            }
            else if (deleteLength > 0) {
                // check whether last characters deleted are line break
                const e = pos + deleteLength;
                const { zeroBasedColumn, lineText } = this.positionToColumnAndLineText(e);
                if (zeroBasedColumn === 0) {
                    // move range end just past line that will merge with previous line
                    deleteLength += lineText!.length; // TODO: GH#18217
                    // store text by appending to end of insertedText
                    newText = newText ? newText + lineText : lineText;
                }
            }

            this.root.walk(pos, deleteLength, walker);
            walker.insertLines(newText, suppressTrailingText);

            if (this.checkEdits) {
                const updatedText = walker.lineIndex.getText(0, walker.lineIndex.getLength());
                Debug.assert(checkText === updatedText, "buffer edit mismatch");
            }

            return walker.lineIndex;
        }
    }

    private static buildTreeFromBottom(nodes: LineCollection[]): LineNode {
        if (nodes.length < lineCollectionCapacity) {
            return new LineNode(nodes);
        }

        const interiorNodes = new Array<LineNode>(Math.ceil(nodes.length / lineCollectionCapacity));
        let nodeIndex = 0;
        for (let i = 0; i < interiorNodes.length; i++) {
            const end = Math.min(nodeIndex + lineCollectionCapacity, nodes.length);
            interiorNodes[i] = new LineNode(nodes.slice(nodeIndex, end));
            nodeIndex = end;
        }
        return this.buildTreeFromBottom(interiorNodes);
    }

    static linesFromText(text: string): {
        lines: string[];
        lineMap: number[];
    } {
        const lineMap = computeLineStarts(text);

        if (lineMap.length === 0) {
            return { lines: [] as string[], lineMap };
        }
        const lines = new Array(lineMap.length) as string[];
        const lc = lineMap.length - 1;
        for (let lmi = 0; lmi < lc; lmi++) {
            lines[lmi] = text.substring(lineMap[lmi], lineMap[lmi + 1]);
        }

        const endText = text.substring(lineMap[lc]);
        if (endText.length > 0) {
            lines[lc] = endText;
        }
        else {
            lines.pop();
        }
        return { lines, lineMap };
    }
}

/** @internal */
export class LineNode implements LineCollection {
    totalChars = 0;
    totalLines = 0;

    constructor(private readonly children: LineCollection[] = []) {
        if (children.length) this.updateCounts();
    }

    isLeaf(): this is LineLeaf {
        return false;
    }

    updateCounts(): void {
        this.totalChars = 0;
        this.totalLines = 0;
        for (const child of this.children) {
            this.totalChars += child.charCount();
            this.totalLines += child.lineCount();
        }
    }

    private execWalk(rangeStart: number, rangeLength: number, walkFns: LineIndexWalker, childIndex: number, nodeType: CharRangeSection) {
        if (walkFns.pre) {
            walkFns.pre(rangeStart, rangeLength, this.children[childIndex], this, nodeType);
        }
        if (walkFns.goSubtree) {
            this.children[childIndex].walk(rangeStart, rangeLength, walkFns);
            if (walkFns.post) {
                walkFns.post(rangeStart, rangeLength, this.children[childIndex], this, nodeType);
            }
        }
        else {
            walkFns.goSubtree = true;
        }
        return walkFns.done;
    }

    private skipChild(relativeStart: number, relativeLength: number, childIndex: number, walkFns: LineIndexWalker, nodeType: CharRangeSection) {
        if (walkFns.pre && (!walkFns.done)) {
            walkFns.pre(relativeStart, relativeLength, this.children[childIndex], this, nodeType);
            walkFns.goSubtree = true;
        }
    }

    walk(rangeStart: number, rangeLength: number, walkFns: LineIndexWalker): void {
        // assume (rangeStart < this.totalChars) && (rangeLength <= this.totalChars)
        if (this.children.length === 0) return;
        let childIndex = 0;
        let childCharCount = this.children[childIndex].charCount();
        // find sub-tree containing start
        let adjustedStart = rangeStart;
        while (adjustedStart >= childCharCount) {
            this.skipChild(adjustedStart, rangeLength, childIndex, walkFns, CharRangeSection.PreStart);
            adjustedStart -= childCharCount;
            childIndex++;
            childCharCount = this.children[childIndex].charCount();
        }
        // Case I: both start and end of range in same subtree
        if ((adjustedStart + rangeLength) <= childCharCount) {
            if (this.execWalk(adjustedStart, rangeLength, walkFns, childIndex, CharRangeSection.Entire)) {
                return;
            }
        }
        else {
            // Case II: start and end of range in different subtrees (possibly with subtrees in the middle)
            if (this.execWalk(adjustedStart, childCharCount - adjustedStart, walkFns, childIndex, CharRangeSection.Start)) {
                return;
            }
            let adjustedLength = rangeLength - (childCharCount - adjustedStart);
            childIndex++;
            const child = this.children[childIndex];
            childCharCount = child.charCount();
            while (adjustedLength > childCharCount) {
                if (this.execWalk(0, childCharCount, walkFns, childIndex, CharRangeSection.Mid)) {
                    return;
                }
                adjustedLength -= childCharCount;
                childIndex++;
                childCharCount = this.children[childIndex].charCount();
            }
            if (adjustedLength > 0) {
                if (this.execWalk(0, adjustedLength, walkFns, childIndex, CharRangeSection.End)) {
                    return;
                }
            }
        }
        // Process any subtrees after the one containing range end
        if (walkFns.pre) {
            const clen = this.children.length;
            if (childIndex < (clen - 1)) {
                for (let ej = childIndex + 1; ej < clen; ej++) {
                    this.skipChild(0, 0, ej, walkFns, CharRangeSection.PostEnd);
                }
            }
        }
    }

    // Input position is relative to the start of this node.
    // Output line number is absolute.
    charOffsetToLineInfo(lineNumberAccumulator: number, relativePosition: number): { oneBasedLine: number; zeroBasedColumn: number; lineText: string | undefined; } {
        if (this.children.length === 0) {
            // Root node might have no children if this is an empty document.
            return { oneBasedLine: lineNumberAccumulator, zeroBasedColumn: relativePosition, lineText: undefined };
        }

        for (const child of this.children) {
            if (child.charCount() > relativePosition) {
                if (child.isLeaf()) {
                    return { oneBasedLine: lineNumberAccumulator, zeroBasedColumn: relativePosition, lineText: child.text };
                }
                else {
                    return (child as LineNode).charOffsetToLineInfo(lineNumberAccumulator, relativePosition);
                }
            }
            else {
                relativePosition -= child.charCount();
                lineNumberAccumulator += child.lineCount();
            }
        }

        // Skipped all children
        const lineCount = this.lineCount();
        if (lineCount === 0) { // it's empty! (and lineNumberToInfo expects a one-based line)
            return { oneBasedLine: 1, zeroBasedColumn: 0, lineText: undefined };
        }
        const leaf = Debug.checkDefined(this.lineNumberToInfo(lineCount, 0).leaf);
        return { oneBasedLine: lineCount, zeroBasedColumn: leaf.charCount(), lineText: undefined };
    }

    /**
     * Input line number is relative to the start of this node.
     * Output line number is relative to the child.
     * positionAccumulator will be an absolute position once relativeLineNumber reaches 0.
     */
    lineNumberToInfo(relativeOneBasedLine: number, positionAccumulator: number): { position: number; leaf: LineLeaf | undefined; } {
        for (const child of this.children) {
            const childLineCount = child.lineCount();
            if (childLineCount >= relativeOneBasedLine) {
                return child.isLeaf() ? { position: positionAccumulator, leaf: child } : (child as LineNode).lineNumberToInfo(relativeOneBasedLine, positionAccumulator);
            }
            else {
                relativeOneBasedLine -= childLineCount;
                positionAccumulator += child.charCount();
            }
        }

        return { position: positionAccumulator, leaf: undefined };
    }

    private splitAfter(childIndex: number) {
        let splitNode: LineNode | undefined;
        const clen = this.children.length;
        childIndex++;
        const endLength = childIndex;
        if (childIndex < clen) {
            splitNode = new LineNode();
            while (childIndex < clen) {
                splitNode.add(this.children[childIndex]);
                childIndex++;
            }
            splitNode.updateCounts();
        }
        this.children.length = endLength;
        return splitNode;
    }

    remove(child: LineCollection): void {
        const childIndex = this.findChildIndex(child);
        const clen = this.children.length;
        if (childIndex < (clen - 1)) {
            for (let i = childIndex; i < (clen - 1); i++) {
                this.children[i] = this.children[i + 1];
            }
        }
        this.children.pop();
    }

    private findChildIndex(child: LineCollection) {
        const childIndex = this.children.indexOf(child);
        Debug.assert(childIndex !== -1);
        return childIndex;
    }

    insertAt(child: LineCollection, nodes: LineCollection[]): LineNode[] {
        let childIndex = this.findChildIndex(child);
        const clen = this.children.length;
        const nodeCount = nodes.length;
        // if child is last and there is more room and only one node to place, place it
        if ((clen < lineCollectionCapacity) && (childIndex === (clen - 1)) && (nodeCount === 1)) {
            this.add(nodes[0]);
            this.updateCounts();
            return [];
        }
        else {
            const shiftNode = this.splitAfter(childIndex);
            let nodeIndex = 0;
            childIndex++;
            while ((childIndex < lineCollectionCapacity) && (nodeIndex < nodeCount)) {
                this.children[childIndex] = nodes[nodeIndex];
                childIndex++;
                nodeIndex++;
            }
            let splitNodes: LineNode[] = [];
            let splitNodeCount = 0;
            if (nodeIndex < nodeCount) {
                splitNodeCount = Math.ceil((nodeCount - nodeIndex) / lineCollectionCapacity);
                splitNodes = new Array(splitNodeCount) as LineNode[];
                let splitNodeIndex = 0;
                for (let i = 0; i < splitNodeCount; i++) {
                    splitNodes[i] = new LineNode();
                }
                let splitNode = splitNodes[0];
                while (nodeIndex < nodeCount) {
                    splitNode.add(nodes[nodeIndex]);
                    nodeIndex++;
                    if (splitNode.children.length === lineCollectionCapacity) {
                        splitNodeIndex++;
                        splitNode = splitNodes[splitNodeIndex];
                    }
                }
                for (let i = splitNodes.length - 1; i >= 0; i--) {
                    if (splitNodes[i].children.length === 0) {
                        splitNodes.pop();
                    }
                }
            }
            if (shiftNode) {
                splitNodes.push(shiftNode);
            }
            this.updateCounts();
            for (let i = 0; i < splitNodeCount; i++) {
                splitNodes[i].updateCounts();
            }
            return splitNodes;
        }
    }

    // assume there is room for the item; return true if more room
    add(collection: LineCollection): void {
        this.children.push(collection);
        Debug.assert(this.children.length <= lineCollectionCapacity);
    }

    charCount(): number {
        return this.totalChars;
    }

    lineCount(): number {
        return this.totalLines;
    }
}

/** @internal */
export class LineLeaf implements LineCollection {
    constructor(public text: string) {
    }

    isLeaf(): this is LineLeaf {
        return true;
    }

    walk(rangeStart: number, rangeLength: number, walkFns: LineIndexWalker): void {
        walkFns.leaf(rangeStart, rangeLength, this);
    }

    charCount(): number {
        return this.text.length;
    }

    lineCount() {
        return 1;
    }
}
