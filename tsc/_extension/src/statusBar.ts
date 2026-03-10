import * as vscode from "vscode";
import { jsTsLanguageModes } from "./util";

export function setupStatusBar(version: string): vscode.Disposable {
    const statusItem = vscode.languages.createLanguageStatusItem("typescript.native-preview.status", jsTsLanguageModes);
    statusItem.name = "TypeScript Native Preview";
    statusItem.text = `$(beaker) tsgo ${version}`;
    statusItem.detail = "TypeScript Native Preview Language Server";
    statusItem.command = {
        title: "Show Menu",
        command: "typescript.native-preview.showMenu",
    };
    return statusItem;
}
