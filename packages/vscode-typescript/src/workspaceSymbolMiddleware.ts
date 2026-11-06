import * as vscode from "vscode";
import type { CancellationToken } from "vscode";
import type { MessageSignature } from "vscode-languageserver-protocol";
import { isSupportedLanguageMode } from "./util";

const supportedSchemes = new Set(["file", "untitled"]);

function isSupportedDocument(document: vscode.TextDocument): boolean {
    return isSupportedLanguageMode(document) && supportedSchemes.has(document.uri.scheme);
}

function getDocument(): vscode.TextDocument | undefined {
    const activeDocument = vscode.window.activeTextEditor?.document;
    if (activeDocument && isSupportedDocument(activeDocument)) {
        return activeDocument;
    }

    return vscode.workspace.textDocuments.find(isSupportedDocument);
}

export function workspaceSymbolSendRequestMiddleware<P, R>(
    type: string | MessageSignature,
    params: P | undefined,
    token: CancellationToken | undefined,
    next: (type: string | MessageSignature, params?: P, token?: CancellationToken) => Promise<R>,
): Promise<R> {
    const method = typeof type === "string" ? type : type.method;
    if (method !== "workspace/symbol") {
        return next(type, params, token);
    }

    const document = getDocument();
    if (!document) {
        return next(type, params, token);
    }

    return next(type, {
        ...params,
        textDocument: { uri: document.uri.toString() },
    } as P, token);
}
