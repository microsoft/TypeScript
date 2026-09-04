import * as path from "node:path";
import * as vscode from "vscode";

import type {
    ContentMapperTextRange,
    ContentMapperVirtualSpan,
    MappedOutput,
} from "./contentMapperVirtualFiles";
import {
    type DiagnosticDirectiveNode,
    DiagnosticDirectivesView,
} from "./diagnosticDirectivesView";

const virtualDocumentScheme = "typescript-content-mapper";
const activeEditorIsContentMappedContext = "typescript.native-preview.activeEditorIsContentMapped";
export const showVirtualDocumentsCommand = "typescript.native-preview.showContentMapperVirtualDocuments";

export interface ContentMapperVirtualFilesProvider {
    readonly onDidInitializeLanguageServer: vscode.Event<void>;
    getContentMapperVirtualFiles(uri: vscode.Uri): Promise<readonly MappedOutput[]>;
    isContentMapped(uri: vscode.Uri): Promise<boolean>;
}

interface VirtualDocumentEntry {
    readonly sourceUri: vscode.Uri;
    output: MappedOutput;
    mtime: number;
}

export function registerContentMapperVirtualDocumentProvider(
    provider: ContentMapperVirtualFilesProvider,
    output: vscode.LogOutputChannel,
): vscode.Disposable {
    return new ContentMapperVirtualDocumentProvider(provider, output);
}

class ContentMapperVirtualDocumentProvider implements vscode.FileSystemProvider, vscode.Disposable {
    private readonly changeEmitter = new vscode.EventEmitter<vscode.FileChangeEvent[]>();
    private readonly entries = new Map<string, VirtualDocumentEntry>();
    private readonly sourceToVirtualUris = new Map<string, readonly vscode.Uri[]>();
    private readonly refreshTimers = new Map<string, NodeJS.Timeout>();
    private inspectionTimer: NodeJS.Timeout | undefined;
    private activeEditorContextVersion = 0;
    private readonly mappingDecorations = [
        vscode.window.createTextEditorDecorationType({
            backgroundColor: "rgba(70, 180, 90, 0.18)",
            border: "1px solid rgba(70, 180, 90, 0.8)",
        }),
        vscode.window.createTextEditorDecorationType({
            backgroundColor: "rgba(230, 165, 35, 0.18)",
            border: "1px solid rgba(230, 165, 35, 0.85)",
        }),
        vscode.window.createTextEditorDecorationType({
            backgroundColor: "rgba(65, 145, 235, 0.18)",
            border: "1px solid rgba(65, 145, 235, 0.85)",
        }),
    ];
    private readonly decoratedEditors = new Set<vscode.TextEditor>();
    private readonly highlightedMappings = new Map<string, readonly ContentMapperVirtualSpan[]>();
    private readonly diagnosticDirectivesView: DiagnosticDirectivesView;
    private readonly disposables: vscode.Disposable[];

    readonly onDidChangeFile = this.changeEmitter.event;

    constructor(
        private readonly provider: ContentMapperVirtualFilesProvider,
        private readonly output: vscode.LogOutputChannel,
    ) {
        this.diagnosticDirectivesView = new DiagnosticDirectivesView(node => {
            void this.revealDiagnosticDirective(node).catch(error => {
                this.output.error(`Could not reveal diagnostic directive: ${String(error)}`);
                void vscode.window.showErrorMessage(vscode.l10n.t("Could not reveal diagnostic directive: {0}", errorMessage(error)));
            });
        });
        this.disposables = [
            this.changeEmitter,
            this.diagnosticDirectivesView,
            ...this.mappingDecorations,
            vscode.workspace.registerFileSystemProvider(virtualDocumentScheme, this, {
                isCaseSensitive: true,
                isReadonly: true,
            }),
            vscode.languages.registerHoverProvider(
                { scheme: virtualDocumentScheme },
                { provideHover: (document, position) => this.provideMappingHover(document, position) },
            ),
            vscode.commands.registerCommand(showVirtualDocumentsCommand, () => this.showActiveDocument()),
            vscode.workspace.onDidChangeTextDocument(event => {
                if (event.document.uri.scheme === virtualDocumentScheme) {
                    this.scheduleInspection();
                }
                else {
                    this.scheduleRefresh(event.document.uri);
                }
            }),
            vscode.workspace.onDidSaveTextDocument(document => this.scheduleRefresh(document.uri)),
            vscode.languages.onDidChangeDiagnostics(event => {
                for (const uri of event.uris) {
                    this.scheduleRefresh(uri);
                }
            }),
            vscode.window.onDidChangeActiveTextEditor(editor => {
                this.updateActiveEditorContext(editor);
                if (editor?.document.uri.scheme === virtualDocumentScheme) {
                    const entry = this.entries.get(editor.document.uri.toString());
                    if (entry) {
                        this.refreshSource(entry.sourceUri);
                    }
                }
                this.scheduleInspection();
            }),
            vscode.window.onDidChangeTextEditorSelection(event => {
                if (event.textEditor === vscode.window.activeTextEditor) {
                    this.scheduleInspection();
                }
            }),
            vscode.window.onDidChangeVisibleTextEditors(() => this.scheduleInspection()),
            provider.onDidInitializeLanguageServer(() => {
                this.updateActiveEditorContext(vscode.window.activeTextEditor);
                for (const source of this.sourceToVirtualUris.keys()) {
                    this.refreshSource(vscode.Uri.parse(source));
                }
            }),
        ];
        this.updateActiveEditorContext(vscode.window.activeTextEditor);
    }

    watch(): vscode.Disposable {
        return new vscode.Disposable(() => {});
    }

    async stat(uri: vscode.Uri): Promise<vscode.FileStat> {
        const entry = await this.getOrCreateEntry(uri);
        if (!entry) {
            throw vscode.FileSystemError.FileNotFound(uri);
        }
        return {
            type: vscode.FileType.File,
            ctime: 0,
            mtime: entry.mtime,
            size: Buffer.byteLength(entry.output.text),
            permissions: vscode.FilePermission.Readonly,
        };
    }

    readDirectory(): [string, vscode.FileType][] {
        return [];
    }

    createDirectory(uri: vscode.Uri): void {
        throw vscode.FileSystemError.NoPermissions(uri);
    }

    async readFile(uri: vscode.Uri): Promise<Uint8Array> {
        const entry = await this.getOrCreateEntry(uri);
        if (!entry) {
            throw vscode.FileSystemError.FileNotFound(uri);
        }
        return Buffer.from(entry.output.text);
    }

    writeFile(uri: vscode.Uri): void {
        throw vscode.FileSystemError.NoPermissions(uri);
    }

    delete(uri: vscode.Uri): void {
        throw vscode.FileSystemError.NoPermissions(uri);
    }

    rename(oldUri: vscode.Uri): void {
        throw vscode.FileSystemError.NoPermissions(oldUri);
    }

    dispose(): void {
        this.activeEditorContextVersion++;
        void vscode.commands.executeCommand("setContext", activeEditorIsContentMappedContext, false);
        for (const timer of this.refreshTimers.values()) {
            clearTimeout(timer);
        }
        this.refreshTimers.clear();
        if (this.inspectionTimer) {
            clearTimeout(this.inspectionTimer);
            this.inspectionTimer = undefined;
        }
        for (const disposable of this.disposables.splice(0)) {
            disposable.dispose();
        }
    }

    private async getOrCreateEntry(uri: vscode.Uri): Promise<VirtualDocumentEntry | undefined> {
        const existing = this.entries.get(uri.toString());
        if (existing) {
            return existing;
        }
        const parsed = parseVirtualUri(uri);
        if (!parsed) {
            return undefined;
        }
        const outputs = await this.loadOutputs(parsed.sourceUri);
        this.remember(parsed.sourceUri, outputs);
        return this.entries.get(uri.toString());
    }

    private async showActiveDocument(): Promise<void> {
        const sourceEditor = vscode.window.activeTextEditor;
        const sourceUri = sourceEditor?.document.uri;
        if (!sourceEditor || !sourceUri || sourceUri.scheme === virtualDocumentScheme) {
            void vscode.window.showInformationMessage(vscode.l10n.t("Open a content-mapped source file to show its virtual TypeScript documents."));
            return;
        }

        try {
            const outputs = await this.loadOutputs(sourceUri);
            if (outputs.length === 0) {
                this.diagnosticDirectivesView.show(sourceUri, []);
                void vscode.window.showInformationMessage(vscode.l10n.t("The active file is not transformed by a TypeScript content mapper."));
                return;
            }
            const previousUris = this.sourceToVirtualUris.get(sourceUri.toString()) ?? [];
            const previousEntries = new Map(previousUris.map(
                uri => [uri.toString(), this.entries.get(uri.toString())] as const,
            ));
            const virtualUris = this.remember(sourceUri, outputs);
            this.diagnosticDirectivesView.show(sourceUri, outputs);
            const nextKeys = new Set(virtualUris.map(uri => uri.toString()));
            const changes: vscode.FileChangeEvent[] = [];
            for (const uri of previousUris) {
                if (!nextKeys.has(uri.toString())) {
                    changes.push({ type: vscode.FileChangeType.Deleted, uri });
                }
            }
            for (const uri of virtualUris) {
                const previous = previousEntries.get(uri.toString());
                const entry = this.entries.get(uri.toString())!;
                if (!previous) {
                    changes.push({ type: vscode.FileChangeType.Created, uri });
                }
                else if (previous.output.identity !== entry.output.identity) {
                    entry.mtime = Math.max(Date.now(), previous.mtime + 1);
                    changes.push({ type: vscode.FileChangeType.Changed, uri });
                }
            }
            if (changes.length !== 0) {
                this.changeEmitter.fire(changes);
            }
            const targetColumn = sourceEditor.viewColumn === undefined
                ? vscode.ViewColumn.Beside
                : sourceEditor.viewColumn + 1;

            for (let index = virtualUris.length - 1; index >= 0; index--) {
                const uri = virtualUris[index]!;
                const entry = this.entries.get(uri.toString())!;
                let document = await vscode.workspace.openTextDocument(uri);
                document = await vscode.languages.setTextDocumentLanguage(document, languageIdForScriptKind(entry.output.scriptKind));
                await vscode.window.showTextDocument(document, {
                    preview: false,
                    preserveFocus: index !== 0,
                    viewColumn: targetColumn,
                });
            }
            this.scheduleInspection();
        }
        catch (error) {
            this.output.error(`Could not show content mapper virtual documents: ${String(error)}`);
            void vscode.window.showInformationMessage(vscode.l10n.t("Content mapper inspector is unavailable: {0}", errorMessage(error)));
        }
    }

    private loadOutputs(sourceUri: vscode.Uri): Promise<readonly MappedOutput[]> {
        return this.provider.getContentMapperVirtualFiles(sourceUri);
    }

    private updateActiveEditorContext(editor: vscode.TextEditor | undefined): void {
        const version = ++this.activeEditorContextVersion;
        void this.updateActiveEditorContextNow(editor, version).catch(error => {
            this.output.error(`Could not update the active content mapper context: ${String(error)}`);
        });
    }

    private async updateActiveEditorContextNow(editor: vscode.TextEditor | undefined, version: number): Promise<void> {
        let isContentMapped = false;
        if (editor?.document.uri.scheme === "file") {
            try {
                isContentMapped = await this.provider.isContentMapped(editor.document.uri);
            }
            catch (error) {
                this.output.debug(`Could not determine whether ${editor.document.uri.toString()} is content-mapped: ${String(error)}`);
            }
        }
        if (version === this.activeEditorContextVersion) {
            await vscode.commands.executeCommand("setContext", activeEditorIsContentMappedContext, isContentMapped);
        }
    }

    private remember(sourceUri: vscode.Uri, outputs: readonly MappedOutput[]): readonly vscode.Uri[] {
        const sourceKey = sourceUri.toString();
        const previousUris = this.sourceToVirtualUris.get(sourceKey) ?? [];
        const nextUris = outputs.map(output => virtualUriForOutput(sourceUri, output));
        const nextKeys = new Set(nextUris.map(uri => uri.toString()));

        for (const previousUri of previousUris) {
            if (!nextKeys.has(previousUri.toString())) {
                this.entries.delete(previousUri.toString());
            }
        }

        outputs.forEach((mappedOutput, index) => {
            const uri = nextUris[index]!;
            const existing = this.entries.get(uri.toString());
            this.entries.set(uri.toString(), {
                sourceUri,
                output: mappedOutput,
                mtime: existing?.mtime ?? Date.now(),
            });
        });
        this.sourceToVirtualUris.set(sourceKey, nextUris);
        return nextUris;
    }

    private scheduleRefresh(sourceUri: vscode.Uri): void {
        const sourceKey = sourceUri.toString();
        if (!this.sourceToVirtualUris.has(sourceKey)) {
            return;
        }
        const existing = this.refreshTimers.get(sourceKey);
        if (existing) {
            clearTimeout(existing);
        }
        this.refreshTimers.set(
            sourceKey,
            setTimeout(() => {
                this.refreshTimers.delete(sourceKey);
                this.refreshSource(sourceUri);
            }, 100),
        );
    }

    private refreshSource(sourceUri: vscode.Uri): void {
        void this.refresh(sourceUri).catch(error => {
            this.output.warn(`Could not refresh ${sourceUri.toString()}: ${String(error)}`);
        });
    }

    private async refresh(sourceUri: vscode.Uri): Promise<void> {
        const sourceKey = sourceUri.toString();
        const previousUris = this.sourceToVirtualUris.get(sourceKey);
        if (!previousUris) {
            return;
        }

        const outputs = await this.loadOutputs(sourceUri);
        if (outputs.length === 0) {
            this.clearInspection();
            this.diagnosticDirectivesView.refresh(sourceUri, undefined);
            this.sourceToVirtualUris.delete(sourceKey);
            const changes = previousUris.map(uri => ({ type: vscode.FileChangeType.Deleted, uri }));
            for (const uri of previousUris) {
                this.entries.delete(uri.toString());
            }
            this.changeEmitter.fire(changes);
            return;
        }

        const previousEntries = new Map(previousUris.map(uri => [uri.toString(), this.entries.get(uri.toString())]));
        const nextUris = this.remember(sourceUri, outputs);
        this.diagnosticDirectivesView.refresh(sourceUri, outputs);
        const nextKeys = new Set(nextUris.map(uri => uri.toString()));
        const changes: vscode.FileChangeEvent[] = [];

        for (const uri of previousUris) {
            if (!nextKeys.has(uri.toString())) {
                changes.push({ type: vscode.FileChangeType.Deleted, uri });
            }
        }
        for (const uri of nextUris) {
            const entry = this.entries.get(uri.toString())!;
            const previous = previousEntries.get(uri.toString());
            if (!previous) {
                changes.push({ type: vscode.FileChangeType.Created, uri });
            }
            else if (previous.output.identity !== entry.output.identity) {
                entry.mtime = Math.max(Date.now(), previous.mtime + 1);
                changes.push({ type: vscode.FileChangeType.Changed, uri });
            }
        }
        if (changes.length !== 0) {
            this.changeEmitter.fire(changes);
        }
        this.scheduleInspection();
    }

    private async revealDiagnosticDirective(node: DiagnosticDirectiveNode): Promise<void> {
        const sourceUri = this.sourceUriForOutput(node.output);
        if (!sourceUri) {
            return;
        }
        const virtualUri = virtualUriForOutput(sourceUri, node.output);
        const entry = await this.getOrCreateEntry(virtualUri);
        if (!entry) {
            throw new Error(`Could not load virtual document "${node.output.fileName}".`);
        }

        const sourceDocument = await vscode.workspace.openTextDocument(sourceUri);
        const sourceRange = rangeFromTextRange(sourceDocument, node.directive.originalRange);
        await vscode.window.showTextDocument(sourceDocument, {
            preserveFocus: true,
            preview: false,
            selection: sourceRange,
        });

        let virtualDocument = await vscode.workspace.openTextDocument(virtualUri);
        virtualDocument = await vscode.languages.setTextDocumentLanguage(
            virtualDocument,
            languageIdForScriptKind(entry.output.scriptKind),
        );
        const virtualRange = rangeFromTextRange(virtualDocument, node.directive.virtualRange);
        const virtualEditor = await vscode.window.showTextDocument(virtualDocument, {
            preserveFocus: false,
            preview: false,
            selection: virtualRange,
            viewColumn: vscode.ViewColumn.Beside,
        });
        virtualEditor.revealRange(virtualRange, vscode.TextEditorRevealType.InCenterIfOutsideViewport);
        this.scheduleInspection();
    }

    private sourceUriForOutput(output: MappedOutput): vscode.Uri | undefined {
        for (const entry of this.entries.values()) {
            if (entry.output === output) {
                return entry.sourceUri;
            }
        }
        return undefined;
    }

    private scheduleInspection(): void {
        if (this.inspectionTimer) {
            clearTimeout(this.inspectionTimer);
        }
        this.inspectionTimer = setTimeout(() => {
            this.inspectionTimer = undefined;
            this.inspectActiveSelection();
        }, 0);
    }

    private inspectActiveSelection(): void {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            this.inspectSelection(editor);
        }
        else {
            this.clearInspection();
        }
    }

    private inspectSelection(editor: vscode.TextEditor): void {
        if (editor.document.uri.scheme === virtualDocumentScheme) {
            this.inspectVirtualSelection(editor);
        }
        else {
            this.inspectSourceSelection(editor);
        }
    }

    private inspectVirtualSelection(virtualEditor: vscode.TextEditor): void {
        const entry = this.entries.get(virtualEditor.document.uri.toString());
        if (!entry) {
            this.clearInspection();
            return;
        }
        const sourceEditor = vscode.window.visibleTextEditors.find(
            candidate => candidate.document.uri.toString() === entry.sourceUri.toString(),
        );
        if (!sourceEditor) {
            this.clearInspection();
            return;
        }
        const offset = virtualEditor.document.offsetAt(virtualEditor.selection.active);
        const mappings = entry.output.mappings.filter(
            mapping => containsOffset(mapping.generatedStart, mapping.generatedLength, offset),
        );
        this.clearInspection();
        this.decorateMappingPair(sourceEditor, virtualEditor, mappings);
    }

    private inspectSourceSelection(sourceEditor: vscode.TextEditor): void {
        const virtualUris = this.sourceToVirtualUris.get(sourceEditor.document.uri.toString());
        if (!virtualUris) {
            this.clearInspection();
            return;
        }
        const offset = sourceEditor.document.offsetAt(sourceEditor.selection.active);
        this.clearInspection();
        const sourceRanges: vscode.Range[][] = [[], [], []];
        for (const virtualUri of virtualUris) {
            const entry = this.entries.get(virtualUri.toString());
            const virtualEditor = vscode.window.visibleTextEditors.find(
                candidate => candidate.document.uri.toString() === virtualUri.toString(),
            );
            if (!entry || !virtualEditor) {
                continue;
            }
            const mappings = entry.output.mappings.filter(
                mapping => containsOffset(mapping.originalStart, mapping.originalLength, offset),
            );
            if (mappings.length === 0) {
                continue;
            }
            const virtualRanges: vscode.Range[][] = [[], [], []];
            for (const mapping of mappings) {
                const kind = normalizedMappingKind(mapping.kind);
                sourceRanges[kind]!.push(rangeFromOffsets(sourceEditor.document, mapping.originalStart, mapping.originalLength));
                virtualRanges[kind]!.push(rangeFromOffsets(virtualEditor.document, mapping.generatedStart, mapping.generatedLength));
            }
            for (let kind = 0; kind < this.mappingDecorations.length; kind++) {
                virtualEditor.setDecorations(this.mappingDecorations[kind]!, virtualRanges[kind]!);
            }
            this.decoratedEditors.add(virtualEditor);
            this.highlightedMappings.set(virtualEditor.document.uri.toString(), mappings);
        }
        for (let kind = 0; kind < this.mappingDecorations.length; kind++) {
            sourceEditor.setDecorations(this.mappingDecorations[kind]!, sourceRanges[kind]!);
        }
        if (sourceRanges.some(ranges => ranges.length !== 0)) {
            this.decoratedEditors.add(sourceEditor);
        }
    }

    private decorateMappingPair(
        sourceEditor: vscode.TextEditor,
        virtualEditor: vscode.TextEditor,
        mappings: readonly ContentMapperVirtualSpan[],
    ): void {
        if (mappings.length === 0) {
            return;
        }

        const sourceRanges: vscode.Range[][] = [[], [], []];
        const virtualRanges: vscode.Range[][] = [[], [], []];
        for (const mapping of mappings) {
            const kind = normalizedMappingKind(mapping.kind);
            sourceRanges[kind]!.push(rangeFromOffsets(sourceEditor.document, mapping.originalStart, mapping.originalLength));
            virtualRanges[kind]!.push(rangeFromOffsets(virtualEditor.document, mapping.generatedStart, mapping.generatedLength));
        }
        for (let kind = 0; kind < this.mappingDecorations.length; kind++) {
            sourceEditor.setDecorations(this.mappingDecorations[kind]!, sourceRanges[kind]!);
            virtualEditor.setDecorations(this.mappingDecorations[kind]!, virtualRanges[kind]!);
        }
        this.decoratedEditors.add(sourceEditor);
        this.decoratedEditors.add(virtualEditor);
        this.highlightedMappings.set(virtualEditor.document.uri.toString(), mappings);
    }

    private clearInspection(): void {
        for (const editor of this.decoratedEditors) {
            for (const decoration of this.mappingDecorations) {
                editor.setDecorations(decoration, []);
            }
        }
        this.decoratedEditors.clear();
        this.highlightedMappings.clear();
    }

    private provideMappingHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
        const highlighted = this.highlightedMappings.get(document.uri.toString());
        if (!highlighted) {
            return undefined;
        }
        const offset = document.offsetAt(position);
        const mappings = highlighted.filter(mapping => containsOffset(mapping.generatedStart, mapping.generatedLength, offset));
        if (mappings.length === 0) {
            return undefined;
        }

        const contents = new vscode.MarkdownString();
        mappings.forEach((mapping, index) => {
            if (index !== 0) {
                contents.appendMarkdown("\n\n---\n\n");
            }
            contents.appendMarkdown(`**${vscode.l10n.t("Span kind: {0}", mappingKindName(mapping.kind))}**`);
            const features = featureNames(mapping.features);
            contents.appendMarkdown(`\n\n${vscode.l10n.t("Features: {0}", features.join(", ") || vscode.l10n.t("None"))}`);
        });
        const first = mappings[0]!;
        return new vscode.Hover(contents, rangeFromOffsets(document, first.generatedStart, first.generatedLength));
    }
}

function containsOffset(start: number, length: number, offset: number): boolean {
    return length === 0 ? offset === start : start <= offset && offset < start + length;
}

function rangeFromOffsets(document: vscode.TextDocument, start: number, length: number): vscode.Range {
    return new vscode.Range(document.positionAt(start), document.positionAt(start + length));
}

function rangeFromTextRange(document: vscode.TextDocument, range: ContentMapperTextRange): vscode.Range {
    return new vscode.Range(document.positionAt(range.pos), document.positionAt(range.end));
}

function normalizedMappingKind(kind: number): number {
    return kind >= 0 && kind <= 2 ? kind : 1;
}

function mappingKindName(kind: number): string {
    switch (kind) {
        case 0:
            return vscode.l10n.t("Verbatim");
        case 1:
            return vscode.l10n.t("Atom");
        case 2:
            return vscode.l10n.t("Alias");
        default:
            return vscode.l10n.t("Unknown ({0})", kind);
    }
}

const featureLabels = [
    "Hover",
    "Signature Help",
    "Completion",
    "Definition",
    "Type Definition",
    "Implementation",
    "References",
    "Document Highlights",
    "Rename",
    "Call Hierarchy",
    "Code Actions",
    "Formatting",
    "Inlay Hints",
    "Semantic Tokens",
    "Folding Ranges",
    "Selection Ranges",
    "Linked Editing",
    "Auto Insert",
    "Document Symbols",
    "CodeLens",
] as const;

function featureNames(features: number): string[] {
    return featureLabels.filter((_, index) => (features & (1 << index)) !== 0);
}

function virtualUriForOutput(sourceUri: vscode.Uri, output: MappedOutput): vscode.Uri {
    return vscode.Uri.from({
        scheme: virtualDocumentScheme,
        path: `/${virtualFileName(output)}`,
        query: new URLSearchParams({
            source: sourceUri.toString(),
            output: output.key,
        }).toString(),
    });
}

function virtualFileName(output: MappedOutput): string {
    const fileName = path.basename(output.fileName);
    const extension = extensionForScriptKind(output.scriptKind);
    return fileName.toLowerCase().endsWith(extension) ? fileName : fileName + extension;
}

function parseVirtualUri(uri: vscode.Uri): { readonly sourceUri: vscode.Uri; readonly outputKey: string; } | undefined {
    const params = new URLSearchParams(uri.query);
    const source = params.get("source");
    const outputKey = params.get("output");
    return source && outputKey ? { sourceUri: vscode.Uri.parse(source), outputKey } : undefined;
}

function extensionForScriptKind(scriptKind: number): string {
    switch (scriptKind) {
        case 1:
            return ".js";
        case 2:
            return ".jsx";
        case 4:
            return ".tsx";
        case 6:
            return ".json";
        default:
            return ".ts";
    }
}

function languageIdForScriptKind(scriptKind: number): string {
    switch (scriptKind) {
        case 1:
            return "javascript";
        case 2:
            return "javascriptreact";
        case 4:
            return "typescriptreact";
        case 6:
            return "json";
        default:
            return "typescript";
    }
}

function errorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}
