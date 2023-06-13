//// [tests/cases/conformance/jsx/jsxUnclosedParserRecovery.ts] ////

//// [jsxParserRecovery.tsx]
// should have no errors here; all these functions should parse and resolve
noName(); noClose(); noCloseTypeArg(); noCloseAttrs(); noCloseTypeArgAttrs(); noCloseBracket(); noCloseBracketTypeArgAttrs(); noSelfclose(); noSelfcloseTypeArgAttrs();
noNameTrailingTag(); noCloseTrailingTag(); noCloseTypeArgTrailingTag(); noCloseAttrsTrailingTag(); noCloseTypeArgAttrsTrailingTag(); noCloseBracketTrailingTag(); noCloseBracketTypeArgAttrsTrailingTag(); // noSelfcloseTrailingTag(); noSelfcloseTypeArgAttrsTrailingTag();
noNameTrailingText(); noCloseTrailingText(); noCloseTypeArgTrailingText(); noCloseAttrsTrailingText(); noCloseTypeArgAttrsTrailingText(); noCloseBracketTrailingText(); noCloseBracketTypeArgAttrsTrailingText(); // noSelfcloseTrailingText(); noSelfcloseTypeArgAttrsTrailingText();

function diddy() {
    return null;
}

var donkey = <div>
    <
</div>;
function noName() { }
var donkey = <div>
    <diddy
</div>;
function noClose() { }
var donkey = <div>
    <diddy<boolean>
</div>;
function noCloseTypeArg() { }
var donkey = <div>
    <diddy bananas="please"
</div>;
function noCloseAttrs() { }
var donkey = <div>
    <diddy<boolean> bananas="please"
</div>;
function noCloseTypeArgAttrs() { }
var donkey = <div>
    <diddy/
</div>;
function noCloseBracket() { }
var donkey = <div>
    <diddy<boolean> bananas="please"/
</div>;
function noCloseBracketTypeArgAttrs() { }
var donkey = <div>
    <diddy>
</div>;
function noSelfclose() { }
var donkey = <div>
    <diddy<boolean> bananas="please">
</div>;
function noSelfcloseTypeArgAttrs() { }

var donkey = <div>
    <
    <diddy/>
</div>;
function noNameTrailingTag() { }
var donkey = <div>
    <diddy
    <diddy/>
</div>;
function noCloseTrailingTag() { }
var donkey = <div>
    <diddy<boolean>
    <diddy/>
</div>;
function noCloseTypeArgTrailingTag() { }
var donkey = <div>
    <diddy bananas="please"
    <diddy/>
</div>;
function noCloseAttrsTrailingTag() { }
var donkey = <div>
    <diddy<boolean> bananas="please"
    <diddy/>
</div>;
function noCloseTypeArgAttrsTrailingTag() { }
var donkey = <div>
    <diddy/
    <diddy/>
</div>;
function noCloseBracketTrailingTag() { }
var donkey = <div>
    <diddy<boolean> bananas="please"/
    <diddy/>
</div>;
function noCloseBracketTypeArgAttrsTrailingTag() { }
var donkey = <div>
    <diddy>
    <diddy/>
</div>;
function noSelfcloseTrailingTag() { }
var donkey = <div>
    <diddy<boolean> bananas="please">
    <diddy/>
</div>;
function noSelfcloseTypeArgAttrsTrailingTag() { }

var donkey = <div>
    <
    Cranky Wrinkly Funky
</div>;
function noNameTrailingText() { }
var donkey = <div>
    <diddy
    Cranky Wrinkly Funky
</div>;
function noCloseTrailingText() { }
var donkey = <div>
    <diddy<boolean>
    Cranky Wrinkly Funky
</div>;
function noCloseTypeArgTrailingText() { }
var donkey = <div>
    <diddy bananas="please"
    Cranky Wrinkly Funky
</div>;
function noCloseAttrsTrailingText() { }
var donkey = <div>
    <diddy<boolean> bananas="please"
    Cranky Wrinkly Funky
</div>;
function noCloseTypeArgAttrsTrailingText() { }
var donkey = <div>
    <diddy/
    Cranky Wrinkly Funky
</div>;
function noCloseBracketTrailingText() { }
var donkey = <div>
    <diddy<boolean> bananas="please"/
    Cranky Wrinkly Funky
</div>;
function noCloseBracketTypeArgAttrsTrailingText() { }
var donkey = <div>
    <diddy>
    Cranky Wrinkly Funky
</div>;
function noSelfcloseTrailingText() { }
var donkey = <div>
    <diddy<boolean> bananas="please">
    Cranky Wrinkly Funky
</div>;
function noSelfcloseTypeArgAttrsTrailingText() { }


//// [jsxParserRecovery.jsx]
// should have no errors here; all these functions should parse and resolve
noName();
noClose();
noCloseTypeArg();
noCloseAttrs();
noCloseTypeArgAttrs();
noCloseBracket();
noCloseBracketTypeArgAttrs();
noSelfclose();
noSelfcloseTypeArgAttrs();
noNameTrailingTag();
noCloseTrailingTag();
noCloseTypeArgTrailingTag();
noCloseAttrsTrailingTag();
noCloseTypeArgAttrsTrailingTag();
noCloseBracketTrailingTag();
noCloseBracketTypeArgAttrsTrailingTag(); // noSelfcloseTrailingTag(); noSelfcloseTypeArgAttrsTrailingTag();
noNameTrailingText();
noCloseTrailingText();
noCloseTypeArgTrailingText();
noCloseAttrsTrailingText();
noCloseTypeArgAttrsTrailingText();
noCloseBracketTrailingText();
noCloseBracketTypeArgAttrsTrailingText(); // noSelfcloseTrailingText(); noSelfcloseTypeArgAttrsTrailingText();
function diddy() {
    return null;
}
var donkey = <div>
    < />
</div>;
function noName() { }
var donkey = <div>
    <diddy />
</div>;
function noClose() { }
var donkey = <div>
    <diddy />
</div>;
function noCloseTypeArg() { }
var donkey = <div>
    <diddy bananas="please"/>
</div>;
function noCloseAttrs() { }
var donkey = <div>
    <diddy bananas="please"/>
</div>;
function noCloseTypeArgAttrs() { }
var donkey = <div>
    <diddy />
</div>;
function noCloseBracket() { }
var donkey = <div>
    <diddy bananas="please"/>
</div>;
function noCloseBracketTypeArgAttrs() { }
var donkey = <div>
    <diddy>
</></div>;
function noSelfclose() { }
var donkey = <div>
    <diddy bananas="please">
</></div>;
function noSelfcloseTypeArgAttrs() { }
var donkey = <div>
    < />
</div>;
function noNameTrailingTag() { }
var donkey = <div>
    <diddy />
</div>;
function noCloseTrailingTag() { }
var donkey = <div>
    <diddy />
    <diddy />
</div>;
function noCloseTypeArgTrailingTag() { }
var donkey = <div>
    <diddy bananas="please"/>
    <diddy />
</div>;
function noCloseAttrsTrailingTag() { }
var donkey = <div>
    <diddy bananas="please"/>
    <diddy />
</div>;
function noCloseTypeArgAttrsTrailingTag() { }
var donkey = <div>
    <diddy />
    <diddy />
</div>;
function noCloseBracketTrailingTag() { }
var donkey = <div>
    <diddy bananas="please"/>
    <diddy />
</div>;
function noCloseBracketTypeArgAttrsTrailingTag() { }
var donkey = <div>
    <diddy>
    <diddy />
</></div>;
function noSelfcloseTrailingTag() { }
var donkey = <div>
    <diddy bananas="please">
    <diddy />
</></div>;
function noSelfcloseTypeArgAttrsTrailingTag() { }
var donkey = <div>
    <Cranky Wrinkly Funky/>
</div>;
function noNameTrailingText() { }
var donkey = <div>
    <diddy Cranky Wrinkly Funky/>
</div>;
function noCloseTrailingText() { }
var donkey = <div>
    <diddy Cranky Wrinkly Funky/>
</div>;
function noCloseTypeArgTrailingText() { }
var donkey = <div>
    <diddy bananas="please" Cranky Wrinkly Funky/>
</div>;
function noCloseAttrsTrailingText() { }
var donkey = <div>
    <diddy bananas="please" Cranky Wrinkly Funky/>
</div>;
function noCloseTypeArgAttrsTrailingText() { }
var donkey = <div>
    <diddy />
    Cranky Wrinkly Funky
</div>;
function noCloseBracketTrailingText() { }
var donkey = <div>
    <diddy bananas="please"/>
    Cranky Wrinkly Funky
</div>;
function noCloseBracketTypeArgAttrsTrailingText() { }
var donkey = <div>
    <diddy>
    Cranky Wrinkly Funky
</></div>;
function noSelfcloseTrailingText() { }
var donkey = <div>
    <diddy bananas="please">
    Cranky Wrinkly Funky
</></div>;
function noSelfcloseTypeArgAttrsTrailingText() { }
