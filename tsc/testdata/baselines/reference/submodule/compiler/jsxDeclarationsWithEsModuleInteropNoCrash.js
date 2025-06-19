//// [tests/cases/compiler/jsxDeclarationsWithEsModuleInteropNoCrash.tsx] ////

//// [jsxDeclarationsWithEsModuleInteropNoCrash.jsx]
/// <reference path="/.lib/react16.d.ts" preserve="true" />
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  bar: PropTypes.bool,
};

const defaultProps = {
  bar: false,
};

function Foo({ bar }) {
  return <div>{bar}</div>;
}

Foo.propTypes = propTypes;
Foo.defaultProps = defaultProps;

export default Foo;



//// [jsxDeclarationsWithEsModuleInteropNoCrash.d.ts]
declare function Foo({ bar }: {
    bar: any;
}): JSX.Element;
export default Foo;


//// [DtsFileErrors]


jsxDeclarationsWithEsModuleInteropNoCrash.d.ts(3,5): error TS2503: Cannot find namespace 'JSX'.


==== jsxDeclarationsWithEsModuleInteropNoCrash.d.ts (1 errors) ====
    declare function Foo({ bar }: {
        bar: any;
    }): JSX.Element;
        ~~~
!!! error TS2503: Cannot find namespace 'JSX'.
    export default Foo;
    