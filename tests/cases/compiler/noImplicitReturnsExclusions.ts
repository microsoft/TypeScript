// @strict: true
// @noImplicitReturns: true
// @noEmit: true

// Functions with a return type of any, undefined, or a type that includes void are excluded
// from --noImplicitReturns checks.

function f1(b: boolean): undefined {
    if (b) return undefined;
}

function f2(b: boolean): void {
    if (b) return undefined;
}

function f3(b: boolean): any {
    if (b) return undefined;
}

function f4(b: boolean): string | undefined {  // Error
    if (b) return undefined;
}

function f5(b: boolean): string | void {
    if (b) return undefined;
}

function f6(b: boolean): unknown {  // Error
    if (b) return undefined;
}

function f10(b: boolean) {
    if (b) return;
}

function f11(b: boolean) {
    if (b) return undefined;
}

function f12(b: boolean) {
    if (b) return undefined as any;
}

function f13(b: boolean) {  // Error
    if (b) return undefined as unknown;
}

function f14(b: boolean) {  // Error
    if (b) return 42;
}

function f15(b: boolean) {  // Error
    if (b) return 42;
    if (b) return undefined;
}

function f16(b: boolean) {  // Error
    if (b) return 42;
    if (b) return;
}

declare class HistoryItem {
  input: {
    location: {
      uri: string;
    };
  };
}

interface Thenable<T> {
  then<TResult>(
    onfulfilled?: (value: T) => TResult | Thenable<TResult>,
    onrejected?: (reason: any) => TResult | Thenable<TResult>
  ): Thenable<TResult>;
  then<TResult>(
    onfulfilled?: (value: T) => TResult | Thenable<TResult>,
    onrejected?: (reason: any) => void
  ): Thenable<TResult>;
}

export declare function executeCommand<T = unknown>(
  command: string,
  ...rest: any[]
): Thenable<T>;

export declare function registerCommand(
  command: string,
  callback: (...args: any[]) => any,
  thisArg?: any
): void;

registerCommand("_references-view.showHistoryItem", async (item) => { // Error, contextual return type of Promise<unknown>
  if (item instanceof HistoryItem) {
    return executeCommand("vscode.open", item.input.location.uri);
  }
});
