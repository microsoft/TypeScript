package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingIllegalImportClause(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var expect = require('expect.js');
import React   from 'react'/*1*/;
import { mount } from 'enzyme';
require('../setup');
var Amount = require('../../src/js/components/amount');
describe('<Failed />', () => {
  var history
  beforeEach(() => {
    history = createMemoryHistory();
    sinon.spy(history, 'pushState');
  });
  afterEach(() => {
  })
  it('redirects to order summary', () => {
  });
});`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `import React from 'react';`)
}
