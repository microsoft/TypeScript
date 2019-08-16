//// [jsxComponentTypeErrors.tsx]
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


//// [jsxComponentTypeErrors.jsx]
"use strict";
function FunctionComponent(_a) {
    var type = _a.type;
    return {
        type: type
    };
}
FunctionComponent.useThis = function () {
    return <this type="foo"/>;
};
var ClassComponent = /** @class */ (function () {
    function ClassComponent() {
        this.type = 'string';
    }
    return ClassComponent;
}());
var MixedComponent = Math.random() ? FunctionComponent : ClassComponent;
var elem1 = <FunctionComponent type="abc"/>;
var elem2 = <FunctionComponent />;
var elem3 = <ClassComponent />;
var elem4 = <MixedComponent />;
var obj = {
    MemberFunctionComponent: function () {
        return {};
    },
    MemberClassComponent: /** @class */ (function () {
        function MemberClassComponent() {
        }
        return MemberClassComponent;
    }())
};
var elem5 = <obj.MemberFunctionComponent />;
var elem6 = <obj.MemberClassComponent />;
