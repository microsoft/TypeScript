//// [tests/cases/conformance/classes/propertyMemberDeclarations/accessorsOverrideProperty9.ts] ////

//// [accessorsOverrideProperty9.ts]
// #41347, based on microsoft/rushstack

// Mixin utilities
export type Constructor<T = {}> = new (...args: any[]) => T;
export type PropertiesOf<T> = { [K in keyof T]: T[K] };

interface IApiItemConstructor extends Constructor<ApiItem>, PropertiesOf<typeof ApiItem> {}

// Base class
class ApiItem {
  public get members(): ReadonlyArray<ApiItem> {
    return [];
  }
}

// Normal subclass
class ApiEnumMember extends ApiItem {
}

// Mixin base class
interface ApiItemContainerMixin extends ApiItem {
  readonly members: ReadonlyArray<ApiItem>;
}

function ApiItemContainerMixin<TBaseClass extends IApiItemConstructor>(
  baseClass: TBaseClass
): TBaseClass & (new (...args: any[]) => ApiItemContainerMixin) {
  abstract class MixedClass extends baseClass implements ApiItemContainerMixin {
    public constructor(...args: any[]) {
      super(...args);
    }

    public get members(): ReadonlyArray<ApiItem> {
      return [];
    }
  }

  return MixedClass;
}

// Subclass inheriting from mixin
export class ApiEnum extends ApiItemContainerMixin(ApiItem) {
  // This worked prior to TypeScript 4.0:
  public get members(): ReadonlyArray<ApiEnumMember> {
    return [];
  }
}


//// [accessorsOverrideProperty9.js]
// #41347, based on microsoft/rushstack
// Base class
class ApiItem {
    get members() {
        return [];
    }
}
// Normal subclass
class ApiEnumMember extends ApiItem {
}
function ApiItemContainerMixin(baseClass) {
    class MixedClass extends baseClass {
        constructor(...args) {
            super(...args);
        }
        get members() {
            return [];
        }
    }
    return MixedClass;
}
// Subclass inheriting from mixin
export class ApiEnum extends ApiItemContainerMixin(ApiItem) {
    // This worked prior to TypeScript 4.0:
    get members() {
        return [];
    }
}
