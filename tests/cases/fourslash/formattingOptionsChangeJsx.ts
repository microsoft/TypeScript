///<reference path="fourslash.ts"/>

//@Filename: file.tsx
/////*1*/<Madoka homu={                true    } saya={   (true)  } />;
////
////<PrimaryButton
////    /*2*/{    ...this._getButtonProps()    }
/////>

runTest("1", "<Madoka homu={ true } saya={ (true) } />;", "<Madoka homu={true} saya={(true)} />;");
runTest("2", "    { ...this._getButtonProps() }", "    {...this._getButtonProps()}");


function runTest(markerName: string, expectedStringWhenTrue: string, expectedStringWhenFalse: string) {
    const propertyName = "InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces";

    // Go to the correct file
    goTo.marker(markerName);

    // Set the option to false first
    format.setOption(propertyName, false);

    // Format
    format.document();

    // Verify
    goTo.marker(markerName);
    verify.currentLineContentIs(expectedStringWhenFalse);

    // Set the option to true
    format.setOption(propertyName, true);

    // Format
    format.document();

    // Verify
    goTo.marker(markerName);
    verify.currentLineContentIs(expectedStringWhenTrue);
}