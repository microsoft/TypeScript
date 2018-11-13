// @jsx: preserve
// not _actually_ making react available in this test to regression test #22948
import * as React from 'react';

const Test123 = () => <div/>;

function testComponent(props) {
    return <Test123 {...props}/>;
}