import * as path from "node:path";
import * as vscode from "vscode";

import type {
    ContentMapperDiagnosticDirective,
    ContentMapperTextRange,
    MappedOutput,
} from "./contentMapperVirtualFiles";
import {
    containsNonEmptyTextRange,
    textPositionAt,
    textRangePreview,
} from "./contentMapperVirtualFiles";

const revealDiagnosticDirectiveCommand = "typescript.native-preview.revealContentMapperDiagnosticDirective";
const diagnosticDirectivesViewId = "typescript.native-preview.contentMapperDiagnosticDirectives";

interface OutputNode {
    readonly kind: "output";
    readonly output: MappedOutput;
    readonly directives: readonly DiagnosticDirectiveNode[];
}

export interface DiagnosticDirectiveNode {
    readonly kind: "directive";
    readonly sourceUri: vscode.Uri;
    readonly output: MappedOutput;
    readonly directive: ContentMapperDiagnosticDirective;
}

type DirectiveTreeNode = OutputNode | DiagnosticDirectiveNode;

export class DiagnosticDirectivesView implements vscode.TreeDataProvider<DirectiveTreeNode>, vscode.Disposable {
    private readonly changeEmitter = new vscode.EventEmitter<DirectiveTreeNode | undefined>();
    private readonly treeView: vscode.TreeView<DirectiveTreeNode>;
    private readonly disposables: vscode.Disposable[] = [];
    private sourceUri: vscode.Uri | undefined;
    private outputNodes: readonly OutputNode[] = [];
    private selectedDirective: DiagnosticDirectiveNode | undefined;

    readonly onDidChangeTreeData = this.changeEmitter.event;

    constructor(reveal: (node: DiagnosticDirectiveNode) => void | Promise<void>) {
        this.treeView = vscode.window.createTreeView(diagnosticDirectivesViewId, {
            treeDataProvider: this,
            showCollapseAll: true,
        });
        this.treeView.message = vscode.l10n.t("Open virtual documents to inspect diagnostic directives.");
        const revealCommand = vscode.commands.registerCommand(revealDiagnosticDirectiveCommand, reveal);
        this.treeView.onDidChangeVisibility(event => {
            if (event.visible && this.sourceUri) {
                this.changeEmitter.fire(undefined);
            }
        });
        this.disposables.push(this.changeEmitter, this.treeView, revealCommand);
    }

    show(sourceUri: vscode.Uri, outputs: readonly MappedOutput[]): void {
        this.sourceUri = sourceUri;
        this.setOutputs(sourceUri, outputs);
        this.updateMessage();
        this.changeEmitter.fire(undefined);
    }

    refresh(sourceUri: vscode.Uri, outputs: readonly MappedOutput[] | undefined): void {
        if (sourceUri.toString() !== this.sourceUri?.toString()) {
            return;
        }
        this.setOutputs(sourceUri, outputs ?? []);
        this.updateMessage();
        this.changeEmitter.fire(undefined);
    }

    clear(sourceUri?: vscode.Uri): void {
        if (sourceUri && sourceUri.toString() !== this.sourceUri?.toString()) {
            return;
        }
        this.sourceUri = undefined;
        this.outputNodes = [];
        this.selectedDirective = undefined;
        this.treeView.description = undefined;
        this.treeView.message = vscode.l10n.t("Open virtual documents to inspect diagnostic directives.");
        this.changeEmitter.fire(undefined);
    }

    getTreeItem(node: DirectiveTreeNode): vscode.TreeItem {
        if (node.kind === "output") {
            const count = node.output.diagnosticDirectives.length;
            const item = new vscode.TreeItem(
                path.basename(node.output.fileName),
                vscode.TreeItemCollapsibleState.Expanded,
            );
            item.description = count === 1
                ? vscode.l10n.t("{0} directive", count)
                : vscode.l10n.t("{0} directives", count);
            item.iconPath = new vscode.ThemeIcon("file-code");
            return item;
        }

        const { directive, output } = node;
        const policy = diagnosticDirectivePolicyName(directive.policy);
        const preview = textRangePreview(output.text, directive.virtualRange);
        const item = new vscode.TreeItem(policy, vscode.TreeItemCollapsibleState.None);
        const positions = [];
        if (!isEmptyRange(directive.originalRange)) {
            positions.push(formatPosition(positionAt(output.originalText, directive.originalRange.pos)));
        }
        positions.push(formatPosition(positionAt(output.text, directive.virtualRange.pos)));
        item.description = [positions.join(" \u2192 "), preview].filter(Boolean).join("  ");
        item.command = {
            command: revealDiagnosticDirectiveCommand,
            title: vscode.l10n.t("Reveal Diagnostic Directive"),
            arguments: [node],
        };
        item.tooltip = directiveTooltip(node);
        return item;
    }

    getChildren(node?: DirectiveTreeNode): DirectiveTreeNode[] {
        if (!node) {
            return [...this.outputNodes];
        }
        if (node.kind === "output") {
            return [...node.directives];
        }
        return [];
    }

    getParent(node: DirectiveTreeNode): OutputNode | undefined {
        if (node.kind === "directive") {
            return this.outputNodes.find(outputNode => outputNode.output === node.output);
        }
        return undefined;
    }

    revealOriginalRange(sourceUri: vscode.Uri, offset: number): Promise<void> {
        if (sourceUri.toString() !== this.sourceUri?.toString()) {
            return Promise.resolve();
        }
        return this.revealMatchingDirective(
            this.outputNodes.flatMap(node => node.directives),
            node => containsNonEmptyTextRange(node.directive.originalRange, offset),
        );
    }

    revealVirtualRange(sourceUri: vscode.Uri, output: MappedOutput, offset: number): Promise<void> {
        if (sourceUri.toString() !== this.sourceUri?.toString()) {
            return Promise.resolve();
        }
        return this.revealMatchingDirective(
            this.outputNodes.find(node => node.output === output)?.directives ?? [],
            node => containsNonEmptyTextRange(node.directive.virtualRange, offset),
        );
    }

    dispose(): void {
        for (const disposable of this.disposables.splice(0)) {
            disposable.dispose();
        }
    }

    private updateMessage(): void {
        const directiveCount = this.outputNodes.reduce(
            (count, output) => count + output.directives.length,
            0,
        );
        this.treeView.description = directiveCount === 0 ? undefined : String(directiveCount);
        this.treeView.message = directiveCount === 0
            ? vscode.l10n.t("The current content-mapped file has no diagnostic directives.")
            : undefined;
    }

    private setOutputs(sourceUri: vscode.Uri, outputs: readonly MappedOutput[]): void {
        // TreeView.reveal requires stable element instances and parent links.
        this.outputNodes = outputs
            .filter(output => output.diagnosticDirectives.length !== 0)
            .map(output => ({
                kind: "output",
                output,
                directives: output.diagnosticDirectives.map(directive => ({
                    kind: "directive",
                    sourceUri,
                    output,
                    directive,
                })),
            }));
        this.selectedDirective = undefined;
    }

    private revealMatchingDirective(
        nodes: readonly DiagnosticDirectiveNode[],
        matches: (node: DiagnosticDirectiveNode) => boolean,
    ): Promise<void> {
        const node = nodes.find(matches);
        if (!node || node === this.selectedDirective) {
            this.selectedDirective = node;
            return Promise.resolve();
        }
        this.selectedDirective = node;
        return Promise.resolve(this.treeView.reveal(node, {
            select: true,
            focus: false,
            expand: true,
        }));
    }
}

function directiveTooltip(node: DiagnosticDirectiveNode): vscode.MarkdownString {
    const { directive, output } = node;
    const tooltip = new vscode.MarkdownString();
    tooltip.appendMarkdown(`**${diagnosticDirectivePolicyName(directive.policy)}** in \`${path.basename(output.fileName)}\``);
    if (!isEmptyRange(directive.originalRange)) {
        tooltip.appendMarkdown(`\n\n${vscode.l10n.t("Original range: {0}", formatRange(output.originalText, directive.originalRange))}`);
    }
    tooltip.appendMarkdown(`\n\n${vscode.l10n.t("Virtual range: {0}", formatRange(output.text, directive.virtualRange))}`);
    const preview = textRangePreview(output.text, directive.virtualRange);
    if (preview) {
        tooltip.appendMarkdown(`\n\n${vscode.l10n.t("Preview:")}`);
        tooltip.appendCodeblock(preview);
    }
    if (directive.policy === 1) {
        tooltip.appendMarkdown(`\n\n${vscode.l10n.t("Unused diagnostic code: {0}", directive.unusedCode)}`);
    }
    return tooltip;
}

function diagnosticDirectivePolicyName(policy: number): string {
    switch (policy) {
        case 0:
            return vscode.l10n.t("Ignore");
        case 1:
            return vscode.l10n.t("Expect");
        default:
            return vscode.l10n.t("Unknown ({0})", policy);
    }
}

function formatRange(text: string, range: ContentMapperTextRange): string {
    return `${formatPosition(positionAt(text, range.pos))}\u2013${formatPosition(positionAt(text, range.end))}`;
}

function isEmptyRange(range: ContentMapperTextRange): boolean {
    return range.pos === range.end;
}

function formatPosition(position: vscode.Position): string {
    return `${position.line + 1}:${position.character + 1}`;
}

function positionAt(text: string, offset: number): vscode.Position {
    const position = textPositionAt(text, offset);
    return new vscode.Position(position.line, position.character);
}
