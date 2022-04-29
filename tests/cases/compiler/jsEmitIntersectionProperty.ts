// #37015 - test asserts lack of crash

// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @incremental: true
// @tsBuildInfoFile: .tsbuildinfo
// @noTypesAndSymbols: true

// @Filename: globals.d.ts

declare class CoreObject {
  static extend<
    Statics,
    Instance extends B1,
    T1,
    B1
  >(
    this: Statics & { new(): Instance },
    arg1: T1
  ): Readonly<Statics> & { new(): T1 & Instance };

  toString(): string;
}

declare class Mixin<T> {
  static create<T>(
      args?: T
  ): Mixin<T>;
}
declare const Observable: Mixin<{}>
declare class EmberObject extends CoreObject.extend(Observable) {}
declare class CoreView extends EmberObject.extend({}) {}
declare class Component extends CoreView.extend({}) {}

// @Filename: index.js

export class MyComponent extends Component {
  
}
