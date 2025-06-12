//// [tests/cases/compiler/neverAsDiscriminantType.ts] ////

//// [neverAsDiscriminantType.ts]
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


//// [neverAsDiscriminantType.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayOpcode = void 0;
exports.adaptSession = adaptSession;
function f1(foo) {
    if (foo.kind === 'a') {
        foo.a;
    }
}
function f2(foo) {
    if (foo.kind === 'a') {
        foo.a;
    }
}
var GatewayOpcode;
(function (GatewayOpcode) {
    GatewayOpcode[GatewayOpcode["DISPATCH"] = 0] = "DISPATCH";
    GatewayOpcode[GatewayOpcode["HEARTBEAT"] = 1] = "HEARTBEAT";
    GatewayOpcode[GatewayOpcode["IDENTIFY"] = 2] = "IDENTIFY";
    GatewayOpcode[GatewayOpcode["PRESENCE_UPDATE"] = 3] = "PRESENCE_UPDATE";
    GatewayOpcode[GatewayOpcode["VOICE_STATE_UPDATE"] = 4] = "VOICE_STATE_UPDATE";
    GatewayOpcode[GatewayOpcode["RESUME"] = 6] = "RESUME";
    GatewayOpcode[GatewayOpcode["RECONNECT"] = 7] = "RECONNECT";
    GatewayOpcode[GatewayOpcode["REQUEST_GUILD_MEMBERS"] = 8] = "REQUEST_GUILD_MEMBERS";
    GatewayOpcode[GatewayOpcode["INVALID_SESSION"] = 9] = "INVALID_SESSION";
    GatewayOpcode[GatewayOpcode["HELLO"] = 10] = "HELLO";
    GatewayOpcode[GatewayOpcode["HEARTBEAT_ACK"] = 11] = "HEARTBEAT_ACK";
})(GatewayOpcode || (exports.GatewayOpcode = GatewayOpcode = {}));
function assertMessage(event) { }
function adaptSession(input) {
    return __awaiter(this, void 0, void 0, function* () {
        if (input.t === 'MESSAGE_CREATE') {
            assertMessage(input.d);
        }
    });
}
