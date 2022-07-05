//// [systemModule18.ts]
export import React = require("react");

//// [systemModule18.js]
System.register(["react"], function (exports_1, context_1) {
    "use strict";
    var React;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (React_1) {
                React = React_1;
                exports_1("React", React_1);
            }
        ],
        execute: function () {
        }
    };
});
