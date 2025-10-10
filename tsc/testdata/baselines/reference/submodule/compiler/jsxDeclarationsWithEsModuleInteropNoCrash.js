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
/// <reference path="..react16.d.ts" preserve="true" />
import PropTypes from 'prop-types';
declare function Foo({ bar }: {
    bar: any;
}): JSX.Element;
declare namespace Foo {
    var propTypes: {
        bar: PropTypes.Requireable<boolean>;
    };
}
declare namespace Foo {
    var defaultProps: {
        bar: boolean;
    };
}
export default Foo;
