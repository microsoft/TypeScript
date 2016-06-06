//// [file.tsx]

import React = require('react');

type Invalid1 = React.ComponentClass<any> | string;

const X: Invalid1 = "Should fail to construct";

<X />;




//// [file.js]
"use strict";
var React = require('react');
var X = "Should fail to construct";
React.createElement(X, null);
