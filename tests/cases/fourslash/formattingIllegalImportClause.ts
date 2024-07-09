/// <reference path='fourslash.ts' />

//// var expect = require('expect.js');
//// import React   from 'react'/*1*/;
//// import { mount } from 'enzyme';
//// require('../setup');
//// var Amount = require('../../src/js/components/amount');

//// describe('<Failed />', () => {
////   var history
////   beforeEach(() => {
////     history = createMemoryHistory();
////     sinon.spy(history, 'pushState');
////   });

////   afterEach(() => {
////   })

////   it('redirects to order summary', () => {

////   });
//// });

format.document();
goTo.marker("1");
verify.currentLineContentIs("import React from 'react';")