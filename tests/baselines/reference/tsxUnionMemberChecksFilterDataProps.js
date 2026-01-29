//// [tests/cases/compiler/tsxUnionMemberChecksFilterDataProps.tsx] ////

//// [tsxUnionMemberChecksFilterDataProps.tsx]
/// <reference path="/.lib/react16.d.ts" />
import React, { ReactElement } from "react";

declare function NotHappy(props: ({ fixed?: boolean } | { value?: number })): ReactElement<any>;
declare function Happy(props: { fixed?: boolean, value?: number }): ReactElement<any>;

const RootNotHappy = () => (<NotHappy data-testid="my-test-id" />);
const RootHappy = () => (<Happy data-testid="my-test-id" />);


//// [tsxUnionMemberChecksFilterDataProps.js]
/// <reference path="/.lib/react16.d.ts" />
import React from "react";
const RootNotHappy = () => (React.createElement(NotHappy, { "data-testid": "my-test-id" }));
const RootHappy = () => (React.createElement(Happy, { "data-testid": "my-test-id" }));
