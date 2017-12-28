///<reference path="fourslash.ts"/>

//@Filename: file.tsx
/////*InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces1*/<Madoka homu={                true    } saya={   (true)  } />;
////
////<PrimaryButton
////    /*InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces2*/{    ...this._getButtonProps()    }
/////>

runTest("InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces1", "<Madoka homu={ true } saya={ (true) } />;", "<Madoka homu={true} saya={(true)} />;");
runTest("InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces2", "    { ...this._getButtonProps() }", "    {...this._getButtonProps()}");


function runTest(propertyName: string, expectedStringWhenTrue: string, expectedStringWhenFalse: string) {
    // Go to the correct file
    goTo.marker(propertyName);

    // Set the option to false first
    format.setOption(propertyName.slice(0, -1), false);

    // Format
    format.document();

    // Verify
    goTo.marker(propertyName);
    verify.currentLineContentIs(expectedStringWhenFalse);

    // Set the option to true
    format.setOption(propertyName.slice(0, -1), true);

    // Format
    format.document();

    // Verify
    goTo.marker(propertyName);
    verify.currentLineContentIs(expectedStringWhenTrue);
}