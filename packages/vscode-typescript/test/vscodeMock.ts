import * as path from "node:path";

type Listener<T> = (event: T) => unknown;

class MockEvent<T> {
    private readonly listeners = new Set<Listener<T>>();

    readonly event = (listener: Listener<T>): Disposable => {
        this.listeners.add(listener);
        return new Disposable(() => this.listeners.delete(listener));
    };

    fire(event: T): void {
        for (const listener of this.listeners) {
            listener(event);
        }
    }

    clear(): void {
        this.listeners.clear();
    }
}

export class Disposable {
    constructor(private readonly callOnDispose: () => unknown = () => {}) {}

    dispose(): void {
        this.callOnDispose();
    }
}

export class EventEmitter<T> extends MockEvent<T> {
    dispose(): void {
        this.clear();
    }
}

export class Uri {
    readonly authority: string;
    readonly path: string;
    readonly query: string;
    readonly scheme: string;

    private constructor(value: { scheme: string; authority?: string; path: string; query?: string; }) {
        this.scheme = value.scheme;
        this.authority = value.authority ?? "";
        this.path = value.path;
        this.query = value.query ?? "";
    }

    static file(filePath: string): Uri {
        return new Uri({ scheme: "file", path: filePath });
    }

    static from(value: { scheme: string; authority?: string; path: string; query?: string; }): Uri {
        return new Uri(value);
    }

    static parse(value: string): Uri {
        const url = new URL(value);
        return new Uri({
            scheme: url.protocol.slice(0, -1),
            authority: url.host,
            path: decodeURIComponent(url.pathname),
            query: url.search.slice(1),
        });
    }

    static joinPath(base: Uri, ...segments: string[]): Uri {
        return new Uri({ ...base, path: path.posix.join(base.path, ...segments) });
    }

    get fsPath(): string {
        return this.path;
    }

    toString(): string {
        const query = this.query ? `?${this.query}` : "";
        return `${this.scheme}://${this.authority}${this.path}${query}`;
    }
}

export class Position {
    constructor(readonly line: number, readonly character: number) {}
}

export class Range {
    constructor(readonly start: Position, readonly end: Position) {}

    get isEmpty(): boolean {
        return this.start.line === this.end.line && this.start.character === this.end.character;
    }
}

export class MarkdownString {
    appendMarkdown(): this {
        return this;
    }

    appendCodeblock(): this {
        return this;
    }
}

export class Hover {
    constructor(readonly contents: unknown, readonly range?: Range) {}
}

export class ThemeIcon {
    constructor(readonly id: string) {}
}

export class TreeItem {
    description?: string;
    iconPath?: ThemeIcon;
    command?: unknown;
    tooltip?: unknown;

    constructor(readonly label: string, readonly collapsibleState: number) {}
}

export const TreeItemCollapsibleState = { None: 0, Expanded: 2 };
export const FileType = { File: 1 };
export const FilePermission = { Readonly: 1 };
export const FileChangeType = { Changed: 1, Created: 2, Deleted: 3 };
export const ViewColumn = { Beside: -2 };
export const TextEditorRevealType = { InCenterIfOutsideViewport: 2 };
export const ExtensionMode = { Development: 2 };
export const ConfigurationTarget = { Global: 1, Workspace: 2, WorkspaceFolder: 3 };
export const extensions = { getExtension: () => undefined };
export const version = "1.125.0";

export class FileSystemError extends Error {
    static FileNotFound(uri?: Uri): FileSystemError {
        return new FileSystemError("FileNotFound", uri?.toString());
    }

    static NoPermissions(uri?: Uri): FileSystemError {
        return new FileSystemError("NoPermissions", uri?.toString());
    }

    constructor(readonly code: string, message?: string) {
        super(message);
    }
}

const didChangeTextDocument = new MockEvent<any>();
const didSaveTextDocument = new MockEvent<any>();
const didCloseTextDocument = new MockEvent<any>();
const didDeleteFiles = new MockEvent<any>();
const didRenameFiles = new MockEvent<any>();
const didChangeConfiguration = new MockEvent<any>();
const didChangeDiagnostics = new MockEvent<any>();
const didChangeActiveTextEditor = new MockEvent<any>();
const didChangeTextEditorSelection = new MockEvent<any>();
const didChangeVisibleTextEditors = new MockEvent<any>();

export const mockVscode = {
    fileSystemProvider: undefined as any,
    fileChanges: [] as any[],
    registeredCommands: new Map<string, (...args: any[]) => unknown>(),
    reset(): void {
        this.fileSystemProvider = undefined;
        this.fileChanges = [];
        this.registeredCommands.clear();
        this.setTextDocuments();
        window.activeTextEditor = undefined;
        window.visibleTextEditors = [];
    },
    setTextDocuments(...documents: any[]): void {
        workspace.textDocuments.splice(0, workspace.textDocuments.length, ...documents);
    },
    fireActiveEditor(editor: any): void {
        window.activeTextEditor = editor;
        didChangeActiveTextEditor.fire(editor);
    },
    setActiveEditor(editor: any): void {
        window.activeTextEditor = editor;
    },
    fireClose(document: any): void {
        didCloseTextDocument.fire(document);
    },
    fireDelete(...files: Uri[]): void {
        didDeleteFiles.fire({ files });
    },
    runCommand(command: string): unknown {
        const callback = this.registeredCommands.get(command);
        if (!callback) {
            throw new Error(`Command not registered: ${command}`);
        }
        return callback();
    },
};

export const workspace = {
    textDocuments: [] as any[],
    workspaceFolders: undefined,
    workspaceFile: undefined,
    registerFileSystemProvider(_scheme: string, provider: any): Disposable {
        mockVscode.fileSystemProvider = provider;
        provider.onDidChangeFile((changes: any[]) => mockVscode.fileChanges.push(...changes));
        return new Disposable();
    },
    onDidChangeTextDocument: didChangeTextDocument.event,
    onDidSaveTextDocument: didSaveTextDocument.event,
    onDidCloseTextDocument: didCloseTextDocument.event,
    onDidDeleteFiles: didDeleteFiles.event,
    onDidRenameFiles: didRenameFiles.event,
    onDidChangeConfiguration: didChangeConfiguration.event,
    openTextDocument: async () => {
        throw new Error("Not implemented");
    },
    getConfiguration: () => ({
        get: (_key: string, defaultValue: unknown) => defaultValue,
        inspect: () => undefined,
    }),
};

export const window = {
    activeTextEditor: undefined as any,
    visibleTextEditors: [] as any[],
    createTextEditorDecorationType: () => new Disposable(),
    createTreeView: () => ({
        message: undefined,
        description: undefined,
        onDidChangeVisibility: () => new Disposable(),
        reveal: async () => {},
        dispose: () => {},
    }),
    onDidChangeActiveTextEditor: didChangeActiveTextEditor.event,
    onDidChangeTextEditorSelection: didChangeTextEditorSelection.event,
    onDidChangeVisibleTextEditors: didChangeVisibleTextEditors.event,
    showInformationMessage: async () => undefined,
    showErrorMessage: async () => undefined,
    showTextDocument: async () => {
        throw new Error("Not implemented");
    },
};

export const languages = {
    registerHoverProvider: () => new Disposable(),
    onDidChangeDiagnostics: didChangeDiagnostics.event,
    setTextDocumentLanguage: async (document: unknown) => document,
};

export const commands = {
    registerCommand: (command: string, callback: (...args: any[]) => unknown) => {
        mockVscode.registeredCommands.set(command, callback);
        return new Disposable(() => mockVscode.registeredCommands.delete(command));
    },
    executeCommand: async () => undefined,
};

export const l10n = {
    t: (message: string, ...args: unknown[]) => message.replace(/\{(\d+)\}/g, (_match, index) => String(args[Number(index)])),
};
