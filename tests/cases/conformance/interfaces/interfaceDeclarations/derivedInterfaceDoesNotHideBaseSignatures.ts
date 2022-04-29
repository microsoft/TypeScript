// Derived interfaces no longer hide signatures from base types, so these signatures are always compatible.
interface Base {
    (): string;
    new (x: string): number;
}

interface Derived extends Base {
    (): number;
    new (x: string): string;
}