// @noEmit: true

// https://github.com/microsoft/TypeScript/tsc/issues/3789

function ff(f: any) {
    let g;
    ({ g = (x: any, y: any) => x + y } = f);
}
