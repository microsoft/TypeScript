//// [jsxDeclarationsWithEsModuleInteropNoCrash.jsx]
/// <reference path="/.lib/react16.d.ts" />
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
/// <reference path="../../../..react16.d.ts" />
export default Foo;
declare function Foo({ bar }: {
    bar: any;
}): JSX.Element;
declare namespace Foo {
    export { propTypes };
    export { defaultProps };
}
declare namespace propTypes {
    const bar: PropTypes.Requireable<boolean>;
}
declare namespace defaultProps {
    const bar_1: boolean;
    export { bar_1 as bar };
}
import PropTypes from "prop-types";
