//// [tests/cases/conformance/jsx/tsxAttributeResolution16.tsx] ////

//// [file.tsx]
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

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressComp = void 0;
const React = require("react");
class AddressComp extends React.Component {
    render() {
        return null;
    }
}
exports.AddressComp = AddressComp;
let a = <AddressComp postalCode='T1B 0L3' street="vancouver" country="CA"/>;
