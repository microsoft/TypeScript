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
import { readNativePreviewConfig } from "./util";

const virtualDocumentScheme = "typescript-content-mapper";
const activeEditorIsContentMappedContext = "typescript.native-preview.activeEditorIsContentMapped";
const contentMapperInspectorEnabledContext = "typescript.native-preview.contentMapperInspectorEnabled";
export const showVirtualDocumentsCommand = "typescript.native-preview.showContentMapperVirtualDocuments";

export interface ContentMapperVirtualFilesProvider {
    readonly onDidInitializeLanguageServer: vscode.Event<void>;
    readonly onDidSynchronizeContentMapperContributions: vscode.Event<void>;
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
    private readonly evictionTimers = new Map<string, NodeJS.Timeout>();
    private inspectionTimer: NodeJS.Timeout | undefined;
    private activeEditorContextTimer: NodeJS.Timeout | undefined;
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
                    if (event.document === vscode.window.activeTextEditor?.document) {
                        this.scheduleActiveEditorContextUpdate(event.document);
                    }
                }
            }),
            vscode.workspace.onDidSaveTextDocument(document => this.scheduleRefresh(document.uri)),
            vscode.workspace.onDidCloseTextDocument(document => {
                if (document.uri.scheme === virtualDocumentScheme) {
                    this.scheduleSourceEviction(document.uri);
                }
            }),
            vscode.languages.onDidChangeDiagnostics(event => {
                for (const uri of event.uris) {
                    this.scheduleRefresh(uri);
                }
            }),
            vscode.window.onDidChangeActiveTextEditor(editor => {
                this.updateActiveEditorContext(editor);
                const inspectedSource = this.showDiagnosticDirectivesForEditor(editor);
                if (inspectedSource) {
                    this.refreshSource(inspectedSource);
                }
                this.scheduleInspection();
            }),
            vscode.window.onDidChangeTextEditorSelection(event => {
                if (event.textEditor === vscode.window.activeTextEditor) {
                    this.scheduleInspection();
                }
            }),
            vscode.window.onDidChangeVisibleTextEditors(() => this.scheduleInspection()),
            vscode.workspace.onDidChangeConfiguration(event => {
                if (
                    event.affectsConfiguration("js/ts.showDebugInfo")
                    || event.affectsConfiguration("typescript.native-preview.showDebugInfo")
                ) {
                    this.updateInspectorEnabledContext();
                    this.updateActiveEditorContext(vscode.window.activeTextEditor);
                }
            }),
            provider.onDidInitializeLanguageServer(() => {
                this.updateActiveEditorContext(vscode.window.activeTextEditor);
                this.refreshCachedSources();
            }),
            provider.onDidSynchronizeContentMapperContributions(() => {
                this.updateActiveEditorContext(vscode.window.activeTextEditor);
                this.refreshCachedSources();
            }),
        ];
        this.updateInspectorEnabledContext();
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
        void vscode.commands.executeCommand("setContext", contentMapperInspectorEnabledContext, false);
        for (const timer of this.refreshTimers.values()) {
            clearTimeout(timer);
        }
        this.refreshTimers.clear();
        for (const timer of this.evictionTimers.values()) {
            clearTimeout(timer);
        }
        this.evictionTimers.clear();
        if (this.inspectionTimer) {
            clearTimeout(this.inspectionTimer);
            this.inspectionTimer = undefined;
        }
        this.clearActiveEditorContextTimer();
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
        this.storeOutputs(parsed.sourceUri, outputs);
        this.diagnosticDirectivesView.show(parsed.sourceUri, outputs);
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
            const { virtualUris, changes } = this.storeOutputs(sourceUri, outputs);
            this.diagnosticDirectivesView.show(sourceUri, outputs);
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

    private updateInspectorEnabledContext(): void {
        void vscode.commands.executeCommand(
            "setContext",
            contentMapperInspectorEnabledContext,
            readNativePreviewConfig("showDebugInfo", false),
        );
    }

    private updateActiveEditorContext(editor: vscode.TextEditor | undefined): void {
        this.clearActiveEditorContextTimer();
        const version = ++this.activeEditorContextVersion;
        void this.updateActiveEditorContextNow(editor, version).catch(error => {
            this.output.error(`Could not update the active content mapper context: ${String(error)}`);
        });
    }

    private scheduleActiveEditorContextUpdate(document: vscode.TextDocument): void {
        this.clearActiveEditorContextTimer();
        this.activeEditorContextTimer = setTimeout(() => {
            this.activeEditorContextTimer = undefined;
            const editor = vscode.window.activeTextEditor;
            if (editor?.document === document) {
                this.updateActiveEditorContext(editor);
            }
        }, 100);
    }

    private clearActiveEditorContextTimer(): void {
        if (this.activeEditorContextTimer) {
            clearTimeout(this.activeEditorContextTimer);
            this.activeEditorContextTimer = undefined;
        }
    }

    private async updateActiveEditorContextNow(editor: vscode.TextEditor | undefined, version: number): Promise<void> {
        let isContentMapped = false;
        if (readNativePreviewConfig("showDebugInfo", false) && editor?.document.uri.scheme === "file") {
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

    private storeOutputs(
        sourceUri: vscode.Uri,
        outputs: readonly MappedOutput[],
    ): { readonly virtualUris: readonly vscode.Uri[]; readonly changes: vscode.FileChangeEvent[]; } {
        const sourceKey = sourceUri.toString();
        const previousUris = this.sourceToVirtualUris.get(sourceKey) ?? [];
        const nextUris = outputs.map(output => virtualUriForOutput(sourceUri, output));
        const nextKeys = new Set(nextUris.map(uri => uri.toString()));
        const changes: vscode.FileChangeEvent[] = [];

        for (const previousUri of previousUris) {
            if (!nextKeys.has(previousUri.toString())) {
                this.entries.delete(previousUri.toString());
                this.highlightedMappings.delete(previousUri.toString());
                changes.push({ type: vscode.FileChangeType.Deleted, uri: previousUri });
            }
        }

        outputs.forEach((mappedOutput, index) => {
            const uri = nextUris[index]!;
            const existing = this.entries.get(uri.toString());
            let mtime = existing?.mtime ?? Date.now();
            if (existing && existing.output.hash !== mappedOutput.hash) {
                mtime = Math.max(Date.now(), existing.mtime + 1);
            }
            this.entries.set(uri.toString(), {
                sourceUri,
                output: mappedOutput,
                mtime,
            });
            if (!existing) {
                changes.push({ type: vscode.FileChangeType.Created, uri });
            }
            else if (existing.output.hash !== mappedOutput.hash) {
                changes.push({ type: vscode.FileChangeType.Changed, uri });
            }
        });
        this.sourceToVirtualUris.set(sourceKey, nextUris);
        return { virtualUris: nextUris, changes };
    }

    private showDiagnosticDirectivesForEditor(editor: vscode.TextEditor | undefined): vscode.Uri | undefined {
        const sourceUri = editor && this.inspectedSourceUri(editor);
        if (!sourceUri) {
            this.diagnosticDirectivesView.clear();
            return undefined;
        }
        const outputs = (this.sourceToVirtualUris.get(sourceUri.toString()) ?? [])
            .map(uri => this.entries.get(uri.toString())?.output)
            .filter(output => output !== undefined);
        this.diagnosticDirectivesView.show(sourceUri, outputs);
        return sourceUri;
    }

    private inspectedSourceUri(editor: vscode.TextEditor): vscode.Uri | undefined {
        if (editor.document.uri.scheme === virtualDocumentScheme) {
            return this.entries.get(editor.document.uri.toString())?.sourceUri;
        }
        return this.sourceToVirtualUris.has(editor.document.uri.toString()) ? editor.document.uri : undefined;
    }

    private scheduleSourceEviction(closedVirtualUri: vscode.Uri): void {
        const entry = this.entries.get(closedVirtualUri.toString());
        const parsed = entry ? undefined : parseVirtualUri(closedVirtualUri);
        const sourceUri = entry?.sourceUri ?? parsed?.sourceUri;
        if (!sourceUri) {
            return;
        }
        const sourceKey = sourceUri.toString();
        const existing = this.evictionTimers.get(sourceKey);
        if (existing) {
            clearTimeout(existing);
        }
        // setTextDocumentLanguage emits a close/open pair, so wait a turn before deciding the URI is unused.
        this.evictionTimers.set(
            sourceKey,
            setTimeout(() => {
                this.evictionTimers.delete(sourceKey);
                this.evictSourceIfUnused(sourceUri);
            }, 0),
        );
    }

    private evictSourceIfUnused(sourceUri: vscode.Uri): void {
        const sourceKey = sourceUri.toString();
        const virtualUris = this.sourceToVirtualUris.get(sourceKey);
        if (!virtualUris) {
            return;
        }
        const virtualKeys = new Set(virtualUris.map(uri => uri.toString()));
        const hasOpenVirtualDocument = vscode.workspace.textDocuments.some(document => virtualKeys.has(document.uri.toString()));
        if (hasOpenVirtualDocument) {
            return;
        }
        const refreshTimer = this.refreshTimers.get(sourceKey);
        if (refreshTimer) {
            clearTimeout(refreshTimer);
            this.refreshTimers.delete(sourceKey);
        }
        this.deleteCachedSource(sourceUri);
        this.diagnosticDirectivesView.clear(sourceUri);
        this.scheduleInspection();
    }

    private deleteCachedSource(sourceUri: vscode.Uri): readonly vscode.Uri[] {
        const sourceKey = sourceUri.toString();
        const virtualUris = this.sourceToVirtualUris.get(sourceKey) ?? [];
        this.sourceToVirtualUris.delete(sourceKey);
        for (const uri of virtualUris) {
            const key = uri.toString();
            this.entries.delete(key);
            this.highlightedMappings.delete(key);
        }
        return virtualUris;
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

    private refreshCachedSources(): void {
        for (const source of this.sourceToVirtualUris.keys()) {
            this.refreshSource(vscode.Uri.parse(source));
        }
    }

    private async refresh(sourceUri: vscode.Uri): Promise<void> {
        const sourceKey = sourceUri.toString();
        const previousUris = this.sourceToVirtualUris.get(sourceKey);
        if (!previousUris) {
            return;
        }

        const outputs = await this.loadOutputs(sourceUri);
        // Ignore a response if the source was evicted or replaced while the request was in flight.
        if (this.sourceToVirtualUris.get(sourceKey) !== previousUris) {
            return;
        }
        if (outputs.length === 0) {
            this.diagnosticDirectivesView.refresh(sourceUri, undefined);
            const changes = this.deleteCachedSource(sourceUri)
                .map(uri => ({ type: vscode.FileChangeType.Deleted, uri }));
            this.changeEmitter.fire(changes);
            this.scheduleInspection();
            return;
        }

        const { changes } = this.storeOutputs(sourceUri, outputs);
        this.diagnosticDirectivesView.refresh(sourceUri, outputs);
        if (changes.length !== 0) {
            this.changeEmitter.fire(changes);
        }
        this.scheduleInspection();
    }

    private async revealDiagnosticDirective(node: DiagnosticDirectiveNode): Promise<void> {
        const sourceUri = node.sourceUri;
        const virtualUri = virtualUriForOutput(sourceUri, node.output);
        const entry = await this.getOrCreateEntry(virtualUri);
        if (!entry) {
            throw new Error(`Could not load virtual document "${node.output.fileName}".`);
        }

        const sourceEditor = vscode.window.visibleTextEditors.find(
            editor => editor.document.uri.toString() === sourceUri.toString(),
        );
        const virtualEditor = vscode.window.visibleTextEditors.find(
            editor => editor.document.uri.toString() === virtualUri.toString(),
        );
        const inspectorEditor = virtualEditor ?? vscode.window.visibleTextEditors.find(editor => {
            if (editor.document.uri.scheme !== virtualDocumentScheme) {
                return false;
            }
            return parseVirtualUri(editor.document.uri)?.sourceUri.toString() === sourceUri.toString();
        });
        const targetColumn = inspectorEditor?.viewColumn
            ?? (sourceEditor?.viewColumn === undefined ? vscode.ViewColumn.Beside : sourceEditor.viewColumn + 1);

        try {
            const sourceDocument = sourceEditor?.document ?? await vscode.workspace.openTextDocument(sourceUri);
            const sourceRange = rangeFromTextRange(sourceDocument, node.directive.originalRange);
            await vscode.window.showTextDocument(sourceDocument, {
                preserveFocus: true,
                preview: false,
                selection: sourceRange.isEmpty ? undefined : sourceRange,
                viewColumn: sourceEditor?.viewColumn,
            });
        }
        catch (error) {
            this.output.debug(`Could not reveal the diagnostic directive in ${sourceUri.toString()}: ${String(error)}`);
        }

        let virtualDocument = await vscode.workspace.openTextDocument(virtualUri);
        virtualDocument = await vscode.languages.setTextDocumentLanguage(
            virtualDocument,
            languageIdForScriptKind(entry.output.scriptKind),
        );
        const virtualRange = rangeFromTextRange(virtualDocument, node.directive.virtualRange);
        const revealedVirtualEditor = await vscode.window.showTextDocument(virtualDocument, {
            preserveFocus: false,
            preview: false,
            selection: virtualRange.isEmpty ? undefined : virtualRange,
            viewColumn: targetColumn,
        });
        if (virtualRange.isEmpty) {
            this.clearInspection();
        }
        else {
            revealedVirtualEditor.revealRange(virtualRange, vscode.TextEditorRevealType.InCenterIfOutsideViewport);
            this.scheduleInspection();
        }
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
        const offset = virtualEditor.document.offsetAt(virtualEditor.selection.active);
        void this.diagnosticDirectivesView.revealVirtualRange(entry.sourceUri, entry.output, offset).catch(error => {
            this.output.debug(`Could not reveal the selected virtual diagnostic directive: ${String(error)}`);
        });
        const sourceEditor = vscode.window.visibleTextEditors.find(
            candidate => candidate.document.uri.toString() === entry.sourceUri.toString(),
        );
        if (!sourceEditor) {
            this.clearInspection();
            return;
        }
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
        void this.diagnosticDirectivesView.revealOriginalRange(sourceEditor.document.uri, offset).catch(error => {
            this.output.debug(`Could not reveal the selected original diagnostic directive: ${String(error)}`);
        });
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
            const ranges = mappingDecorationRanges(sourceEditor.document, virtualEditor.document, mappings);
            for (let kind = 0; kind < this.mappingDecorations.length; kind++) {
                sourceRanges[kind]!.push(...ranges.source[kind]!);
                virtualEditor.setDecorations(this.mappingDecorations[kind]!, ranges.virtual[kind]!);
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

        const ranges = mappingDecorationRanges(sourceEditor.document, virtualEditor.document, mappings);
        for (let kind = 0; kind < this.mappingDecorations.length; kind++) {
            sourceEditor.setDecorations(this.mappingDecorations[kind]!, ranges.source[kind]!);
            virtualEditor.setDecorations(this.mappingDecorations[kind]!, ranges.virtual[kind]!);
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

function mappingDecorationRanges(
    source: vscode.TextDocument,
    virtual: vscode.TextDocument,
    mappings: readonly ContentMapperVirtualSpan[],
): { readonly source: vscode.Range[][]; readonly virtual: vscode.Range[][]; } {
    const ranges = {
        source: [[], [], []] as vscode.Range[][],
        virtual: [[], [], []] as vscode.Range[][],
    };
    for (const mapping of mappings) {
        const kind = normalizedMappingKind(mapping.kind);
        if (mapping.originalLength !== 0) {
            ranges.source[kind]!.push(rangeFromOffsets(source, mapping.originalStart, mapping.originalLength));
        }
        if (mapping.generatedLength !== 0) {
            ranges.virtual[kind]!.push(rangeFromOffsets(virtual, mapping.generatedStart, mapping.generatedLength));
        }
    }
    return ranges;
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

// Keep this in the same bit order as spanmap.Feature in the server.
const featureLabels = [
    () => vscode.l10n.t("Hover"),
    () => vscode.l10n.t("Signature Help"),
    () => vscode.l10n.t("Completion"),
    () => vscode.l10n.t("Definition"),
    () => vscode.l10n.t("Type Definition"),
    () => vscode.l10n.t("Implementation"),
    () => vscode.l10n.t("References"),
    () => vscode.l10n.t("Document Highlights"),
    () => vscode.l10n.t("Rename"),
    () => vscode.l10n.t("Call Hierarchy"),
    () => vscode.l10n.t("Code Actions"),
    () => vscode.l10n.t("Formatting"),
    () => vscode.l10n.t("Inlay Hints"),
    () => vscode.l10n.t("Semantic Tokens"),
    () => vscode.l10n.t("Folding Ranges"),
    () => vscode.l10n.t("Selection Ranges"),
    () => vscode.l10n.t("Linked Editing"),
    () => vscode.l10n.t("Auto Insert"),
    () => vscode.l10n.t("Document Symbols"),
    () => vscode.l10n.t("CodeLens"),
] as const;

function featureNames(features: number): string[] {
    return featureLabels
        .filter((_, index) => (features & (1 << index)) !== 0)
        .map(label => label());
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
