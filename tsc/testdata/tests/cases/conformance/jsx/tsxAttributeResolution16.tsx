// @target: es2015
// @module: commonjs
// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

interface Address {
  street: string;
  country: string;
}

interface CanadianAddress extends Address {
    postalCode: string;
}

interface AmericanAddress extends Address {
    zipCode: string;
}

type Properties = CanadianAddress | AmericanAddress;

export class AddressComp extends React.Component<Properties, void> {
  public render() {
    return null;
  }
}

let a = <AddressComp postalCode='T1B 0L3' street="vancouver" country="CA" />