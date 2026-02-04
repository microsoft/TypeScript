// @target: es2015
// @noLib: true

export function f() {
    let e: {}[] = [];
    while (true) {
      e = [...(e || [])];
    }
}