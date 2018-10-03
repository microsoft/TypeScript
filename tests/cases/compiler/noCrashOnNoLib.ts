// @noLib: true

export function f() {
    let e: {}[];
    while (true) {
      e = [...(e || [])];
    }
}