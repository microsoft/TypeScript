// @strict: true
// @noEmit: true

// Repro from 53030

enum Type { A, B, C }

interface PayloadStructure {
    dataType: Type;
    data: unknown;
}

interface PayloadA extends PayloadStructure {
    dataType: Type.A;
    data: string;
}

interface PayloadB extends PayloadStructure {
    dataType: Type.B;
    data: number;
}

interface PayloadC extends PayloadStructure {
    dataType: Type.C;
    data: {
        x: number;
        y: number;
    };
}

type Payload = PayloadA | PayloadB | PayloadC

type MappedPayload2 = {
    [K in Type]?: (data: (Payload & { dataType: K })["data"]) => void
}

const payloads2: MappedPayload2 = {
    [Type.A]: data => { console.log(data) }
}

// Additional repro from 53030

type GetPayload<P extends Payload, K extends keyof P> = P extends { dataType: K } ? P["data"] : never;

// Repro from #51161

type AnyOneof = { oneofKind: string; [k: string]: unknown } | { oneofKind: undefined };
type AnyOneofKind<T extends AnyOneof> = T extends { oneofKind: keyof T }
    ? T['oneofKind']
    : never;
