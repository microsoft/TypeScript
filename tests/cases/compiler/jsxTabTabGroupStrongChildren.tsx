// @jsx: react
// @esModuleInterop: true
// @strict: true
/// <reference path="/.lib/react16.d.ts" />
import React from "react";

export interface TabGroupProps {
    // Has to be a union of a single type and an array type for ~legacy reasons~
    // It's just how jsx children are checked, as they predate tuple types
    children: React.ComponentElement<TabProps, Tab>[] | React.ComponentElement<TabProps, Tab>;
}

export interface TabProps {}

export class Tab extends React.Component<TabProps> {
    private a!: void; // nominally tag `Tab`
    render(): JSX.Element {
        return <div></div>;
    }
}
export class NotTab extends React.Component<TabProps> {
    private a!: void; // nominally tag `NotTab` (which is now distinct from `Tab`)
    render(): JSX.Element {
        return <div></div>;
    }
}
export class TabGroup extends React.Component<TabGroupProps> {
    render() {
        return <div>{this.props.children}</div>
    }
}

const elem = <div/>; // sanity check DetailedHtmlElement

const output = <TabGroup>
    <Tab/>
</TabGroup>;

const shouldFail = <TabGroup>
    <Tab/>
    <div/>
</TabGroup>;

const alsoFails = <TabGroup>
    <NotTab/>
</TabGroup>;


// Function component ver:

// This uses `SFCElement` and `SFC` - nowadays those are called `FunctionComponentElement` and `FunctionComponent`

export interface FCTabGroupProps {
    children: React.SFCElement<FCTabProps>[] | React.SFCElement<FCTabProps>;
}

export interface FCTabProps {}

const FCTabGroup: React.SFC<FCTabGroupProps> = props => <div>{props.children}</div>;

const FCTab = (props: FCTabProps) => <div></div>;

const fctab = <FCTabGroup>
    <FCTab/>
</FCTabGroup>;

const notATab = <FCTabGroup>
    <div/>
</FCTabGroup>;

const NotFCTab = (props: {}) => <div></div>;

// No way to error on this, is (structurally) indistinguishable from the above
const alsoNotATab = <FCTabGroup>
    <NotFCTab/>
</FCTabGroup>;