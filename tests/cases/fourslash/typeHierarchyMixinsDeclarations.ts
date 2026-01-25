/// <reference path='fourslash.ts'/>

// Test type hierarchy with mixins, declaration merging, and ambient declarations

// @Filename: /mixins.ts
////// Mixin pattern
////type Constructor<T = {}> = new (...args: any[]) => T;
////
////function /*timestamped*/Timestamped<TBase extends Constructor>(Base: TBase) {
////    return class extends Base {
////        timestamp = Date.now();
////    };
////}
////
////function Activatable<TBase extends Constructor>(Base: TBase) {
////    return class extends Base {
////        isActivated = false;
////        activate() { this.isActivated = true; }
////        deactivate() { this.isActivated = false; }
////    };
////}
////
////class /*user*/User {
////    name: string = "";
////}
////
////// Class using mixins
////const TimestampedUser = Timestamped(User);
////const /*activatableUser*/ActivatableTimestampedUser = Activatable(Timestamped(User));
////
////class SpecialUser extends ActivatableTimestampedUser {
////    special: boolean = true;
////}

// @Filename: /declarations.ts
////// Ambient declarations
////declare class /*externalBase*/ExternalBase {
////    baseMethod(): void;
////}
////
////declare interface /*externalInterface*/ExternalInterface {
////    interfaceMethod(): void;
////}
////
////declare class ExternalDerived extends ExternalBase implements ExternalInterface {
////    interfaceMethod(): void;
////    derivedMethod(): void;
////}
////
////// Implementation extending ambient
////class /*localDerived*/LocalDerived extends ExternalBase {
////    localMethod(): void {}
////}

// @Filename: /declarationMerging.ts
////// Interface declaration merging
////interface /*mergeable*/Mergeable {
////    firstMethod(): void;
////}
////
////interface Mergeable {
////    secondMethod(): void;
////}
////
////// Class implementing merged interface
////class MergedImpl implements Mergeable {
////    firstMethod(): void {}
////    secondMethod(): void {}
////}
////
////// Namespace with interface
////namespace MyNamespace {
////    export interface /*namespaceInterface*/NamespaceInterface {
////        nsMethod(): void;
////    }
////    
////    export class NamespaceClass implements NamespaceInterface {
////        nsMethod(): void {}
////    }
////}
////
////// Class implementing namespace interface
////class /*externalImpl*/ExternalImplementer implements MyNamespace.NamespaceInterface {
////    nsMethod(): void {}
////}

// Test 1: Mixin function
goTo.marker("timestamped");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Base class used in mixin
goTo.marker("user");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Ambient class declaration
goTo.marker("externalBase");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Ambient interface declaration
goTo.marker("externalInterface");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Local class extending ambient
goTo.marker("localDerived");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Merged interface
goTo.marker("mergeable");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 7: Namespace interface
goTo.marker("namespaceInterface");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 8: Class implementing namespace interface
goTo.marker("externalImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
