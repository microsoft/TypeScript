// @strict: true

enum Kind { A, B }

interface ItemA { kind: Kind.A; name: string }
interface ItemB { kind: Kind.B; size: number }
type Item = ItemA | ItemB;

declare function create(options: { items?: () => readonly Item[]; label: string }): void;

function test(flag: boolean) {
    create({
        label: "x",
        ...(flag ? {} : {
            items: () => [{ kind: Kind.A, name: "a" }],
        }),
    });
}
