//// [destructuringNestedObject.ts]
interface Props {
    innerObject?: {
        innerObject2?: {
            name?: string;
            email?: string;
        }
    };
}

export const nestedDestructure1 = (props: Props) => {
    const {
        innerObject: {
            innerObject2: { name, email } = {}  // should ok
        } = {}
    } = props;
    console.log(name, email);
};

export const nestedDestructure2 = (props: Props) => {
    const {
        innerObject: {
            innerObject2: { name, email }   // should error
        } = {}
    } = props;
    console.log(name, email);
};

export const nestedDestructure3 = (props: Props) => {
    const {
        innerObject: {
            innerObject2: { name, email } = {}
        }      // should error
    } = props;
    console.log(name, email);
};

type NestedTuple = [[[string | undefined] | undefined] | undefined]


export const nestedTupleDestructure1 = (props: NestedTuple) => {
    const [[[s] = []] = []] = props;  // should ok
}

export const nestedTupleDestructure2 = (props: NestedTuple) => {
    const [[[s]] = []] = props; // should error
}

export const nestedTupleDestructure3 = (props: NestedTuple) => {
    const [[[s]]] = props; // should error
}



//// [destructuringNestedObject.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestedTupleDestructure3 = exports.nestedTupleDestructure2 = exports.nestedTupleDestructure1 = exports.nestedDestructure3 = exports.nestedDestructure2 = exports.nestedDestructure1 = void 0;
var nestedDestructure1 = function (props) {
    var _a = props.innerObject, _b = _a === void 0 ? {} : _a, _c = _b.innerObject2 // should ok
    , _d = _c === void 0 ? {} : _c // should ok
    , name = _d.name, email = _d.email;
    console.log(name, email);
};
exports.nestedDestructure1 = nestedDestructure1;
var nestedDestructure2 = function (props) {
    var _a = props.innerObject, _b = _a === void 0 ? {} : _a, _c = _b.innerObject2 // should error
    , name = _c.name, email = _c.email;
    console.log(name, email);
};
exports.nestedDestructure2 = nestedDestructure2;
var nestedDestructure3 = function (props) {
    var _a = props.innerObject.innerObject2, _b = _a === void 0 ? {} : _a, name = _b.name, email = _b.email;
    console.log(name, email);
};
exports.nestedDestructure3 = nestedDestructure3;
var nestedTupleDestructure1 = function (props) {
    var _a = props[0], _b = _a === void 0 ? [] : _a, _c = _b[0], _d = _c === void 0 ? [] : _c, s = _d[0]; // should ok
};
exports.nestedTupleDestructure1 = nestedTupleDestructure1;
var nestedTupleDestructure2 = function (props) {
    var _a = props[0], _b = _a === void 0 ? [] : _a, s = _b[0][0]; // should error
};
exports.nestedTupleDestructure2 = nestedTupleDestructure2;
var nestedTupleDestructure3 = function (props) {
    var s = props[0][0][0]; // should error
};
exports.nestedTupleDestructure3 = nestedTupleDestructure3;
