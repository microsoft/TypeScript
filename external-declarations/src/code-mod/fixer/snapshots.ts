import type {
    System,
    TextSpan,
} from "typescript";
import ts from "typescript";

export interface VersionedFileRegistry {
    getSnapshot(file: string): VersionedScriptSnapshot | undefined;
    setSnapshot(file: string, value: VersionedScriptSnapshot): void;
    getScriptVersion(path: string): number;
    updateFromDisk(file: string): VersionedScriptSnapshot | undefined;
}

export interface VersionedScriptSnapshot extends ts.IScriptSnapshot {
    version: number;
}

export function createSnapshotRegistry(sys: Pick<System, "readFile" | "writeFile">): VersionedFileRegistry {
    const changedFiles = new Map<string, VersionedScriptSnapshot>();

    function getScriptVersion(filePath: string) {
        return (changedFiles.get(filePath)?.version ?? 0);
    }
    function updateFromDisk(filePath: string): VersionedScriptSnapshot | undefined {
        return getSnapshot(filePath, /*forceRead*/ true);
    }
    function getSnapshot(filePath: string, forceRead = false): VersionedScriptSnapshot | undefined {
        let snapShot = changedFiles.get(filePath);
        if (snapShot && !forceRead) {
            return snapShot;
        }
        const text = sys.readFile(filePath);
        if (text === undefined) return undefined;
        if (snapShot && text === snapShot.getText(0, snapShot.getLength())) {
            return snapShot;
        }
        snapShot = Object.assign(ts.ScriptSnapshot.fromString(text), {
            version: (snapShot?.version ?? 0) + 1,
        });
        changedFiles.set(filePath, snapShot);
        return snapShot;
    }
    function setSnapshot(path: string, newVersion: VersionedScriptSnapshot) {
        const existing = changedFiles.get(path);
        // No change
        const newVersionText = newVersion.getText(0, newVersion.getLength());
        const existingVersionText = existing && existing.getText(0, existing.getLength());
        if (existingVersionText === newVersionText) {
            return;
        }
        changedFiles.set(path, newVersion);
        sys.writeFile(path, newVersionText);
    }

    return {
        getScriptVersion,
        getSnapshot,
        setSnapshot,
        updateFromDisk,
    };
}

export function textSpanEnd(span: ts.TextSpan) {
    return span.start + span.length;
}

export function applyChangesSnapShot(snapshot: VersionedScriptSnapshot, changes: readonly ts.TextChange[]): VersionedScriptSnapshot {
    let text = snapshot.getText(0, snapshot.getLength());
    let changeStart = text.length;
    let changeEnd = 0;
    const original = text;
    for (let i = changes.length - 1; i >= 0; i--) {
        const { span, newText } = changes[i];
        const spanEnd = textSpanEnd(span);
        text = `${text.substring(0, span.start)}${newText}${text.substring(spanEnd)}`;
        changeStart = Math.min(changeStart, span.start);
        changeEnd = Math.max(changeEnd, spanEnd);
    }

    const originalLength = changeEnd - changeStart;
    const newLength = originalLength + (text.length - original.length);

    return createChangeSnapshot(
        snapshot,
        text,
        { start: changeStart, length: originalLength },
        newLength,
    );
}

export function revertChangeSnapShot(originalSnapShot: VersionedScriptSnapshot, changedSnapShot: VersionedScriptSnapshot): VersionedScriptSnapshot {
    const change = changedSnapShot.getChangeRange(originalSnapShot);
    const originalText = originalSnapShot.getText(0, originalSnapShot.getLength());
    if (!change) {
        return createVersionedSnapshot(changedSnapShot, originalText);
    }
    return createChangeSnapshot(changedSnapShot, originalText, { start: change.span.start, length: change.newLength }, change.span.length);
}

export function createVersionedSnapshot(baseSnapshot: VersionedScriptSnapshot, text: string): VersionedScriptSnapshot {
    return {
        version: baseSnapshot.version + 1,
        ...ts.ScriptSnapshot.fromString(text!),
    };
}
export function createChangeSnapshot(baseSnapshot: VersionedScriptSnapshot, text: string, span: TextSpan, newLength: number): VersionedScriptSnapshot {
    return {
        version: baseSnapshot.version + 1,
        getChangeRange(snapshot) {
            if (snapshot !== baseSnapshot) return undefined;
            return { span, newLength };
        },
        getText(start, end) {
            if (start === 0 && end === text.length) {
                return text;
            }
            return text.substring(start, end);
        },
        dispose() {
        },
        getLength() {
            return text.length;
        },
    };
}
