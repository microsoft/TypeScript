// @strict: true, false

type Foo1 = { kind: 'a', a: number } | { kind: 'b' } | { kind: never };

function f1(foo: Foo1) {
    if (foo.kind === 'a') {
        foo.a;
    }
}

type Foo2 = { kind?: 'a', a: number } | { kind?: 'b' } | { kind?: never };

function f2(foo: Foo2) {
    if (foo.kind === 'a') {
        foo.a;
    }
}

// Repro from #50716

export interface GatewayPayloadStructure<O extends GatewayOpcode, T extends keyof GatewayEvents, D> {
    op: O
    d: D
    t?: T
    s?: number
}

export type GatewayPayload = {
    [O in GatewayOpcode]: O extends GatewayOpcode.DISPATCH
    ? {
        [T in keyof GatewayEvents]: GatewayPayloadStructure<GatewayOpcode.DISPATCH, T, GatewayEvents[T]>
    }[keyof GatewayEvents]
    : GatewayPayloadStructure<O, never, O extends keyof GatewayParams ? GatewayParams[O] : never>
}[GatewayOpcode]

export interface GatewayParams {
    [GatewayOpcode.HELLO]: { b: 1 }
}

export enum GatewayOpcode {
    DISPATCH = 0,
    HEARTBEAT = 1,
    IDENTIFY = 2,
    PRESENCE_UPDATE = 3,
    VOICE_STATE_UPDATE = 4,
    RESUME = 6,
    RECONNECT = 7,
    REQUEST_GUILD_MEMBERS = 8,
    INVALID_SESSION = 9,
    HELLO = 10,
    HEARTBEAT_ACK = 11,
}

export interface GatewayEvents {
    MESSAGE_CREATE: { a: 1 }
    MESSAGE_UPDATE: { a: 2 }
    MESSAGE_DELETE: { a: 3 }
}

function assertMessage(event: { a: 1 }) { }

export async function adaptSession(input: GatewayPayload) {
    if (input.t === 'MESSAGE_CREATE') {
        assertMessage(input.d)
    }
}
