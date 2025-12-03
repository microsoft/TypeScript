/// <reference path="fourslash.ts" />

// @Filename: /a.ts
//// import React from 'react'
//// class Slider extends React.Component {
////     static defau/**/ltProps = {
////         onMouseDown: () => { },
////         onMouseUp: () => { },
////         unit: 'px',
////     }
////     handleChange = () => 10;
//// }

verify.completions({
    marker: "",
    isNewIdentifierLocation: true,
    exact: completion.classElementKeywords,
});