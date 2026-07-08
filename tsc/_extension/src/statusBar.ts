import * as vscode from "vscode";
import {
    ExeInfo,
    jsTsLanguageModes,
} from "./util";

export function setupStatusBar(exe: ExeInfo): vscode.Disposable {
    const statusItem = vscode.languages.createLanguageStatusItem("typescript.native-preview.status", jsTsLanguageModes);
    statusItem.name = vscode.l10n.t("TypeScript 7");
    statusItem.text = exe.isLocal ? vscode.l10n.t("$(beaker) {0}", exe.version) : exe.version;
    statusItem.detail = vscode.l10n.t("TypeScript Language Server");
    statusItem.command = {
        title: vscode.l10n.t("Show Menu"),
        command: "typescript.native-preview.showMenu",
    };
    return statusItem;
}
