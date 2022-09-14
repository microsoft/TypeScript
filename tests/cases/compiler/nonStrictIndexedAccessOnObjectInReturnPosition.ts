export function func(id: string): string[] {
    var a1 = [];
    var a2 = ["elem"];
    return { a1, a2 }[id];
}