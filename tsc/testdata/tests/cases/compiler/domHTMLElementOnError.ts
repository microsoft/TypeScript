// @strict: true
// @lib: esnext,dom

declare const htmlElement: HTMLElement;

htmlElement.onerror = (event: Event) => {};
htmlElement.onerror = (event: UIEvent) => {};
htmlElement.addEventListener("error", (event: Event) => {});
htmlElement.addEventListener("error", (event: UIEvent) => {});

declare const win: Window;

win.onerror = (event, source, lineno, colno, error) => {};
win.addEventListener("error", (event: ErrorEvent) => {});
