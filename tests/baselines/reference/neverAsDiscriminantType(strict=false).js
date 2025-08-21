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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (input.t === 'MESSAGE_CREATE') {
                assertMessage(input.d);
            }
            return [2 /*return*/];
        });
    });
}
