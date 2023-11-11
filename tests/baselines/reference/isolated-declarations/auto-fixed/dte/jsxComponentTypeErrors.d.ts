//// [tests/cases/compiler/jsxComponentTypeErrors.tsx] ////

//// [jsxComponentTypeErrors.tsx]
namespace JSX {
  export interface Element {
    type: 'element';
  }
  export interface ElementClass {
    type: 'element-class';
  }
}

function FunctionComponent<T extends string>({type}: {type?: T}): {
    type: T | undefined;
} {
  return {
    type
  }
}
FunctionComponent.useThis = function() {
  return <this type="foo" />;
}

class ClassComponent {
  type = 'string';
}

const MixedComponent: typeof FunctionComponent | typeof ClassComponent = Math.random() ? FunctionComponent : ClassComponent;

const elem1: JSX.Element = <FunctionComponent type="abc" />;
const elem2: JSX.Element = <FunctionComponent<"abc"> />;
const elem3: JSX.Element = <ClassComponent />;
const elem4: JSX.Element = <MixedComponent />;

const obj = {
  MemberFunctionComponent(): {} {
    return {};
  },
  MemberClassComponent: class {},
};

const elem5: JSX.Element = <obj.MemberFunctionComponent />;
const elem6: JSX.Element = <obj. MemberClassComponent />;


/// [Declarations] ////



//// [/.src/jsxComponentTypeErrors.d.ts]
declare namespace JSX {
    interface Element {
        type: 'element';
    }
    interface ElementClass {
        type: 'element-class';
    }
}
declare function FunctionComponent<T extends string>({ type }: {
    type?: T;
}): {
    type: T | undefined;
};
declare class ClassComponent {
    type: string;
}
declare const MixedComponent: typeof FunctionComponent | typeof ClassComponent;
declare const elem1: JSX.Element;
declare const elem2: JSX.Element;
declare const elem3: JSX.Element;
declare const elem4: JSX.Element;
declare const obj: {
    MemberFunctionComponent(): {};
    MemberClassComponent: {
        new (): {};
    };
};
declare const elem5: JSX.Element;
declare const elem6: JSX.Element;
/// [Errors] ////

jsxComponentTypeErrors.tsx(10,10): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
jsxComponentTypeErrors.tsx(18,11): error TS2786: 'this' cannot be used as a JSX component.
  Its return type '{ type: "foo" | undefined; }' is not a valid JSX element.
    Types of property 'type' are incompatible.
      Type '"foo" | undefined' is not assignable to type '"element"'.
        Type 'undefined' is not assignable to type '"element"'.
jsxComponentTypeErrors.tsx(27,29): error TS2786: 'FunctionComponent' cannot be used as a JSX component.
  Its return type '{ type: "abc" | undefined; }' is not a valid JSX element.
    Types of property 'type' are incompatible.
      Type '"abc" | undefined' is not assignable to type '"element"'.
        Type 'undefined' is not assignable to type '"element"'.
jsxComponentTypeErrors.tsx(28,29): error TS2786: 'FunctionComponent' cannot be used as a JSX component.
  Its return type '{ type: "abc" | undefined; }' is not a valid JSX element.
jsxComponentTypeErrors.tsx(29,29): error TS2786: 'ClassComponent' cannot be used as a JSX component.
  Its instance type 'ClassComponent' is not a valid JSX element.
    Types of property 'type' are incompatible.
      Type 'string' is not assignable to type '"element-class"'.
jsxComponentTypeErrors.tsx(30,29): error TS2786: 'MixedComponent' cannot be used as a JSX component.
  Its element type 'ClassComponent | { type: string | undefined; }' is not a valid JSX element.
    Type 'ClassComponent' is not assignable to type 'Element | ElementClass | null'.
      Type 'ClassComponent' is not assignable to type 'Element | ElementClass'.
        Type 'ClassComponent' is not assignable to type 'ElementClass'.
jsxComponentTypeErrors.tsx(39,29): error TS2786: 'obj.MemberFunctionComponent' cannot be used as a JSX component.
  Its return type '{}' is not a valid JSX element.
    Property 'type' is missing in type '{}' but required in type 'Element'.
jsxComponentTypeErrors.tsx(40,29): error TS2786: 'obj. MemberClassComponent' cannot be used as a JSX component.
  Its instance type 'MemberClassComponent' is not a valid JSX element.
    Property 'type' is missing in type 'MemberClassComponent' but required in type 'ElementClass'.


==== jsxComponentTypeErrors.tsx (8 errors) ====
    namespace JSX {
      export interface Element {
        type: 'element';
      }
      export interface ElementClass {
        type: 'element-class';
      }
    }
    
    function FunctionComponent<T extends string>({type}: {type?: T}): {
             ~~~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        type: T | undefined;
    } {
      return {
        type
      }
    }
    FunctionComponent.useThis = function() {
      return <this type="foo" />;
              ~~~~
!!! error TS2786: 'this' cannot be used as a JSX component.
!!! error TS2786:   Its return type '{ type: "foo" | undefined; }' is not a valid JSX element.
!!! error TS2786:     Types of property 'type' are incompatible.
!!! error TS2786:       Type '"foo" | undefined' is not assignable to type '"element"'.
!!! error TS2786:         Type 'undefined' is not assignable to type '"element"'.
    }
    
    class ClassComponent {
      type = 'string';
    }
    
    const MixedComponent: typeof FunctionComponent | typeof ClassComponent = Math.random() ? FunctionComponent : ClassComponent;
    
    const elem1: JSX.Element = <FunctionComponent type="abc" />;
                                ~~~~~~~~~~~~~~~~~
!!! error TS2786: 'FunctionComponent' cannot be used as a JSX component.
!!! error TS2786:   Its return type '{ type: "abc" | undefined; }' is not a valid JSX element.
!!! error TS2786:     Types of property 'type' are incompatible.
!!! error TS2786:       Type '"abc" | undefined' is not assignable to type '"element"'.
!!! error TS2786:         Type 'undefined' is not assignable to type '"element"'.
    const elem2: JSX.Element = <FunctionComponent<"abc"> />;
                                ~~~~~~~~~~~~~~~~~
!!! error TS2786: 'FunctionComponent' cannot be used as a JSX component.
!!! error TS2786:   Its return type '{ type: "abc" | undefined; }' is not a valid JSX element.
    const elem3: JSX.Element = <ClassComponent />;
                                ~~~~~~~~~~~~~~
!!! error TS2786: 'ClassComponent' cannot be used as a JSX component.
!!! error TS2786:   Its instance type 'ClassComponent' is not a valid JSX element.
!!! error TS2786:     Types of property 'type' are incompatible.
!!! error TS2786:       Type 'string' is not assignable to type '"element-class"'.
    const elem4: JSX.Element = <MixedComponent />;
                                ~~~~~~~~~~~~~~
!!! error TS2786: 'MixedComponent' cannot be used as a JSX component.
!!! error TS2786:   Its element type 'ClassComponent | { type: string | undefined; }' is not a valid JSX element.
!!! error TS2786:     Type 'ClassComponent' is not assignable to type 'Element | ElementClass | null'.
!!! error TS2786:       Type 'ClassComponent' is not assignable to type 'Element | ElementClass'.
!!! error TS2786:         Type 'ClassComponent' is not assignable to type 'ElementClass'.
    
    const obj = {
      MemberFunctionComponent(): {} {
        return {};
      },
      MemberClassComponent: class {},
    };
    
    const elem5: JSX.Element = <obj.MemberFunctionComponent />;
                                ~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS2786: 'obj.MemberFunctionComponent' cannot be used as a JSX component.
!!! error TS2786:   Its return type '{}' is not a valid JSX element.
!!! error TS2786:     Property 'type' is missing in type '{}' but required in type 'Element'.
!!! related TS2728 jsxComponentTypeErrors.tsx:3:5: 'type' is declared here.
    const elem6: JSX.Element = <obj. MemberClassComponent />;
                                ~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS2786: 'obj. MemberClassComponent' cannot be used as a JSX component.
!!! error TS2786:   Its instance type 'MemberClassComponent' is not a valid JSX element.
!!! error TS2786:     Property 'type' is missing in type 'MemberClassComponent' but required in type 'ElementClass'.
!!! related TS2728 jsxComponentTypeErrors.tsx:6:5: 'type' is declared here.
    