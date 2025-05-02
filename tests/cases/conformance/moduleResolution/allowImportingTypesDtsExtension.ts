// @allowImportingTsExtensions: true,false
// @noEmit: true
// @moduleResolution: classic,node10,node16,nodenext
// @noTypesAndSymbols: true

// @Filename: /types.d.ts
export declare type User = {
    name: string;
}

// @Filename: /a.ts
import type { User } from "./types.d.ts";
export type { User } from "./types.d.ts";

export const user: User = { name: "John" };

export function getUser(): import("./types.d.ts").User {
    return user;
}
