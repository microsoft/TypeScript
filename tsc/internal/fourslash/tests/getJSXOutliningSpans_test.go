package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetJSXOutliningSpans(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import React, { Component } from 'react';

export class Home extends Component[| {
  render()[| {
    return [|(
    [|<div>
      [|<h1>Hello, world!</h1>|]
      [|<ul>
        [|<li>
          [|<a [|href='https://get.asp.net/'|]>
            ASP.NET Core
          </a>|]
        </li>|]
        [|<li>[|<a [|href='https://facebook.github.io/react/'|]>React</a>|] for client-side code</li>|]
        [|<li>[|<a [|href='http://getbootstrap.com/'|]>Bootstrap</a>|] for layout and styling</li>|]
      </ul>|]
      <div
        [|accesskey="test"
        class="active"
        dir="auto"|] />
      <PageHeader [|title="Log in"
        {...[|{
          item: true,
          xs: 9,
          md: 5
        }|]}|]
      />
      [|<>
          text 
      </>|]
    </div>|]
    )|];
  }|]
}|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOutliningSpans(t)
}
