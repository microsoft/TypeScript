// @strict: true
// @noEmit: true

// The discriminant lives on the instance type behind a construct signature.
declare class GlobalController<P, S> {
    isLocal: false;
    getProps(state: S, props: P): void;
}
declare class LocalController<P, S> {
    isLocal: true;
    getProps(props: P, state: S): void;
}
interface GlobalControllerClass<P, S> {
    new (): GlobalController<P, S>;
}
interface LocalControllerClass<P, S> {
    new (): LocalController<P, S>;
}
declare function createEnhancer<P, S>(Wrapper: GlobalControllerClass<P, S> | LocalControllerClass<P, S>): [P, S];

class Fail extends LocalController<{ baz: any }, { bar: any }> {}
const enhanced = createEnhancer(Fail);

class WorkaroundUnusedMethod extends LocalController<{ baz: any }, { bar: any }> {
    _unused() {}
}
const enhancedUnusedMethod = createEnhancer(WorkaroundUnusedMethod);

class WorkaroundChangeSignature extends LocalController<{ baz: any }, { bar: any }> {
    getProps(props: { baz: any }) {}
}
const enhancedChangedSignature = createEnhancer(WorkaroundChangeSignature);

// Three type parameters with a default, as in the original report.
declare abstract class GlobalStoreController<P, S, SS> {
    isLocal: false;
    abstract getProps(storeState: SS, props: P, state: S): void;
}
interface GlobalStoreControllerClass<P, S, SS> {
    new (): GlobalStoreController<P, S, SS>;
}
type ControllerClass<P, S, SS = {}> = GlobalStoreControllerClass<P, S, SS> | LocalControllerClass<P, S>;
declare function createStoreEnhancer<P, S, SS = void>(Wrapper: ControllerClass<P, S, SS>): [P, S, SS];
const storeEnhanced = createStoreEnhancer(Fail);

// Instances declared directly, through an alias, and through an extending interface.
interface Local<T, U> {
    isLocal: true;
    a: T;
    b: U;
}
interface NotLocal<T, U> {
    isLocal: false;
    a: U;
    b: T;
}
declare function callme<T, U>(Wrapper: NotLocal<T, U> | Local<T, U>): [T, U];

declare const directDecl: Local<string, number>;
const direct = callme(directDecl);

type LocalStringNumberAlias = Local<string, number>;
declare const typeAlias: LocalStringNumberAlias;
const alias = callme(typeAlias);

interface LocalStringNumberInterface extends Local<string, number> {}
declare const interfaceDecl: LocalStringNumberInterface;
const extended = callme(interfaceDecl);
