import * as vscode from "vscode";

export class Condition {
    private _value: boolean;
    private isDisposed = false;

    constructor(
        private readonly getValue: () => boolean,
        onUpdate: (handler: () => void) => void,
    ) {
        this._value = this.getValue();

        onUpdate(() => {
            const newValue = this.getValue();
            if (newValue !== this._value) {
                this._value = newValue;
                this._onDidChange.fire();
            }
        });
    }

    public get value(): boolean {
        return this._value;
    }

    private readonly _onDidChange = new vscode.EventEmitter<void>();
    public readonly onDidChange = this._onDidChange.event;

    dispose() {
        if (this.isDisposed) {
            return;
        }
        this.isDisposed = true;
        this._onDidChange.dispose();
    }
}

class ConditionalRegistration {
    private state?: {
        readonly enabled: boolean;
        readonly registration: vscode.Disposable | undefined;
    };

    public constructor(
        private readonly conditions: readonly Condition[],
        private readonly doRegister: () => vscode.Disposable,
        private readonly elseDoRegister?: () => vscode.Disposable,
    ) {
        for (const condition of conditions) {
            const listener = condition.onDidChange(() => this.update());
            this.didChangeListeners.push(listener);
        }
        this.update();
    }

    private didChangeListeners: vscode.Disposable[] = [];

    public dispose() {
        this.state?.registration?.dispose();
        while (this.didChangeListeners.length > 0) {
            const d = this.didChangeListeners.pop()!;
            d.dispose();
        }
        for (const c of this.conditions) {
            c.dispose();
        }
        this.state = undefined;
    }

    private update() {
        const enabled = this.conditions.every(condition => condition.value);
        if (enabled) {
            if (!this.state?.enabled) {
                this.state?.registration?.dispose();
                this.state = { enabled: true, registration: this.doRegister() };
            }
        }
        else {
            if (this.state?.enabled || !this.state) {
                this.state?.registration?.dispose();
                this.state = { enabled: false, registration: this.elseDoRegister?.() };
            }
        }
    }
}

export function conditionalRegistration(
    conditions: readonly Condition[],
    doRegister: () => vscode.Disposable,
    elseDoRegister?: () => vscode.Disposable,
): vscode.Disposable {
    return new ConditionalRegistration(conditions, doRegister, elseDoRegister);
}
