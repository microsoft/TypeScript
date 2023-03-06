/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


interface WeakRef<T extends object> {
    readonly [Symbol.toStringTag]: "WeakRef";

    /**
     * Returns the WeakRef instance's target object, or undefined if the target object has been
     * reclaimed.
     */
    deref(): T | undefined;
}

interface WeakRefConstructor {
    readonly prototype: WeakRef<any>;

    /**
     * Creates a WeakRef instance for the given target object.
     * @param target The target object for the WeakRef instance.
     */
    new<T extends object>(target: T): WeakRef<T>;
}

declare var WeakRef: WeakRefConstructor;

interface FinalizationRegistry<T> {
    readonly [Symbol.toStringTag]: "FinalizationRegistry";

    /**
     * Registers an object with the registry.
     * @param target The target object to register.
     * @param heldValue The value to pass to the finalizer for this object. This cannot be the
     * target object.
     * @param unregisterToken The token to pass to the unregister method to unregister the target
     * object. If provided (and not undefined), this must be an object. If not provided, the target
     * cannot be unregistered.
     */
    register(target: object, heldValue: T, unregisterToken?: object): void;

    /**
     * Unregisters an object from the registry.
     * @param unregisterToken The token that was used as the unregisterToken argument when calling
     * register to register the target object.
     */
    unregister(unregisterToken: object): void;
}

interface FinalizationRegistryConstructor {
    readonly prototype: FinalizationRegistry<any>;

    /**
     * Creates a finalization registry with an associated cleanup callback
     * @param cleanupCallback The callback to call after an object in the registry has been reclaimed.
     */
    new<T>(cleanupCallback: (heldValue: T) => void): FinalizationRegistry<T>;
}

declare var FinalizationRegistry: FinalizationRegistryConstructor;
