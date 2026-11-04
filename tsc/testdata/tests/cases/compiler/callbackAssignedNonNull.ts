// @strict: true
// @noEmit: true

declare function initialize(callback: (cancel: () => void) => void): void;

function start() {
    let cancel;
    initialize(value => {
        cancel = value;
    });
    cancel!();
}
