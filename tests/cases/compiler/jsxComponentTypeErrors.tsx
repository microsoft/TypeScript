// @strict: true
// @jsx: preserve
namespace JSX {
  export interface Element {
    type: 'element';
  }
  export interface ElementClass {
    type: 'element-class';
  }
}

function FunctionComponent<T extends string>({type}: {type?: T}) {
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

const MixedComponent = Math.random() ? FunctionComponent : ClassComponent;

const elem1 = <FunctionComponent type="abc" />;
const elem2 = <FunctionComponent<"abc"> />;
const elem3 = <ClassComponent />;
const elem4 = <MixedComponent />;

const obj = {
  MemberFunctionComponent() {
    return {};
  },
  MemberClassComponent: class {},
};

const elem5 = <obj.MemberFunctionComponent />;
const elem6 = <obj. MemberClassComponent />;
