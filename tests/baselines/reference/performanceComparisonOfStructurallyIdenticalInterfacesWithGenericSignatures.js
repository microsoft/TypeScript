//// [tests/cases/compiler/performanceComparisonOfStructurallyIdenticalInterfacesWithGenericSignatures.ts] ////

//// [performanceComparisonOfStructurallyIdenticalInterfacesWithGenericSignatures.ts]
export declare type ThenArg<T> = T extends any ? any : T extends PromiseLike<infer U> ? U : T;

export interface InterfaceA<T> {
    filter(callback: (newValue: T, oldValue: T) => boolean): InterfaceA<T>;
    map<D>(callback: (value: T) => D): InterfaceA<D>;
    await<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitLatest<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered2<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered3<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered4<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered5<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered6<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered7<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered8<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered9<R extends ThenArg<T>>(): InterfaceA<R>;
}

export interface InterfaceB<T> extends InterfaceA<T> {
    map<D>(callback: (value: T) => D): InterfaceB<D>;
    await<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitLatest<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered2<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered3<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered4<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered5<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered6<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered7<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered8<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered9<R extends ThenArg<T>>(): InterfaceB<R>;
}

export class A<T> implements InterfaceB<T> {
    public filter(callback: (newValue: T, oldValue: T) => boolean): B<T> {
        return undefined as any;
    }

    public map<D>(callback: (value: T) => D): B<D> {
        return undefined as any;
    }

    public await<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered2<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered3<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered4<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered5<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered6<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered7<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered8<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered9<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitLatest<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }
}

export class B<T> extends A<T> { }

//// [performanceComparisonOfStructurallyIdenticalInterfacesWithGenericSignatures.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
class A {
    filter(callback) {
        return undefined;
    }
    map(callback) {
        return undefined;
    }
    await() {
        return undefined;
    }
    awaitOrdered() {
        return undefined;
    }
    awaitOrdered2() {
        return undefined;
    }
    awaitOrdered3() {
        return undefined;
    }
    awaitOrdered4() {
        return undefined;
    }
    awaitOrdered5() {
        return undefined;
    }
    awaitOrdered6() {
        return undefined;
    }
    awaitOrdered7() {
        return undefined;
    }
    awaitOrdered8() {
        return undefined;
    }
    awaitOrdered9() {
        return undefined;
    }
    awaitLatest() {
        return undefined;
    }
}
exports.A = A;
class B extends A {
}
exports.B = B;
