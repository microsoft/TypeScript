import * as vscode from "vscode";
import { jsTsLanguageModes } from "./util";

export function setupStatusBar(version: string): vscode.Disposable {
    const statusItem = vscode.languages.createLanguageStatusItem("typescript.native-preview.status", jsTsLanguageModes);
    statusItem.name = vscode.l10n.t("TypeScript Native Preview");
    statusItem.text = vscode.l10n.t(`$(beaker) tsgo {0}`, version);
    statusItem.detail = vscode.l10n.t("TypeScript Native Preview Language Server");
    statusItem.command = {
        title: vscode.l10n.t("Show Menu"),
        command: "typescript.native-preview.showMenu",
    };
    return statusItem;
}
