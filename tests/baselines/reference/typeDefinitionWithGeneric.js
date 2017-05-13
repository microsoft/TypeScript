//// [typeDefinitionWithGeneric.ts]

/// <reference no-default-lib="true"/>

export type Callback<T> = () => T;

export function registerCallback<T>(callback: Callback<T>) {
    //
}


//// [typeDefinitionWithGeneric.js]
/// <reference no-default-lib="true"/>
function registerCallback(callback) {
    //
}
exports.registerCallback = registerCallback;


//// [typeDefinitionWithGeneric.d.ts]
export declare type Callback<T> = () => T;
export declare function registerCallback<T>(callback: Callback<T>): void;
