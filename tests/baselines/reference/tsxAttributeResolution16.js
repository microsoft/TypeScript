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
export class AddressComp extends React.Component {
    render() {
        return null;
    }
}
let a = <AddressComp postalCode='T1B 0L3' street="vancouver" country="CA"/>;
