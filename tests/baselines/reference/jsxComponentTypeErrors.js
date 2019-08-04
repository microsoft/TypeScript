//// [jsxComponentTypeErrors.tsx]
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


//// [jsxComponentTypeErrors.jsx]
"use strict";
var FunctionComponent = function () { return ({
    type: 'string'
}); };
var ClassComponent = /** @class */ (function () {
    function ClassComponent() {
        this.type = 'string';
    }
    return ClassComponent;
}());
var MixedComponent = Math.random() ? FunctionComponent : ClassComponent;
var elem1 = <FunctionComponent />;
var elem2 = <ClassComponent />;
var elem3 = <MixedComponent />;
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
var elem4 = <obj.MemberFunctionComponent />;
var elem5 = <obj.MemberClassComponent />;
