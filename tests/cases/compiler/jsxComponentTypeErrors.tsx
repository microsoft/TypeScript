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

const FunctionComponent = () => ({
  type: 'string',
});

class ClassComponent {
  type = 'string';
}

const MixedComponent = Math.random() ? FunctionComponent : ClassComponent;

const elem1 = <FunctionComponent />;
const elem2 = <ClassComponent />;
const elem3 = <MixedComponent />;

const obj = {
  MemberFunctionComponent() {
    return {};
  },
  MemberClassComponent: class {},
};

const elem4 = <obj.MemberFunctionComponent />;
const elem5 = <obj.MemberClassComponent />;
