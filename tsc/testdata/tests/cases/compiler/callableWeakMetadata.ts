// @strict: true
// @noEmit: true

type Initializer = (() => number) & { mutators?: [] };

declare function createStore(initializer: Initializer): void;

createStore(() => 1);
