//// [tests/cases/compiler/jsxChildrenSingleChildConfusableWithMultipleChildrenNoError.tsx] ////

//// [jsxChildrenSingleChildConfusableWithMultipleChildrenNoError.tsx]
/// <reference path="/.lib/react16.d.ts" />

import * as React from 'react'

type Tab = [string, React.ReactNode]  // [tabName, tabContent]

interface Props {
    children: Tab[]
}

function TabLayout(props: Props) {
    return <div/>
}

export class App extends React.Component<{}> {
    render() {
        return <TabLayout>
            {[
                ['Users', <div/>],
                ['Products', <div/>]
            ]}
        </TabLayout>
    }
}

//// [jsxChildrenSingleChildConfusableWithMultipleChildrenNoError.js]
"use strict";
/// <reference path="react16.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const React = require("react");
function TabLayout(props) {
    return React.createElement("div", null);
}
class App extends React.Component {
    render() {
        return React.createElement(TabLayout, null, [
            ['Users', React.createElement("div", null)],
            ['Products', React.createElement("div", null)]
        ]);
    }
}
exports.App = App;
