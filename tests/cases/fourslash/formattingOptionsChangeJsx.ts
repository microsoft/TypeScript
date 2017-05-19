///<reference path="fourslash.ts"/>

//@Filename: file.tsx
/////*InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces*/<Madoka homu={                true    } saya={   (true)  } />;

runTest("InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces", "<Madoka homu={ true } saya={ (true) } />;", "<Madoka homu={true} saya={(true)} />;");


function runTest(propertyName: string, expectedStringWhenTrue: string, expectedStringWhenFalse: string) {
    // Go to the correct file
    goTo.marker(propertyName);

    // Set the option to false first
    format.setOption(propertyName, false);

    // Format
    format.document();

    // Verify
    goTo.marker(propertyName);
    verify.currentLineContentIs(expectedStringWhenFalse);

    // Set the option to true
    format.setOption(propertyName, true);

    // Format
    format.document();

    // Verify
    goTo.marker(propertyName);
    verify.currentLineContentIs(expectedStringWhenTrue);
}