/// <reference path="fourslash.ts" />

//// interface TFunction {
////     (_: 'login.title', __?: {}): string;
////     (_: 'login.description', __?: {}): string;
////     (_: 'login.sendEmailAgree', __?: {}): string;
////     (_: 'login.termsOfUse', __?: {}): string;
////     (_: 'login.privacyPolicy', __?: {}): string;
////     (_: 'login.sendEmailButton', __?: {}): string;
////     (_: 'login.emailInputPlaceholder', __?: {}): string;
////     (_: 'login.errorWrongEmailTitle', __?: {}): string;
////     (_: 'login.errorWrongEmailDescription', __?: {}): string;
////     (_: 'login.errorGeneralEmailTitle', __?: {}): string;
////     (_: 'login.errorGeneralEmailDescription', __?: {}): string;
////     (_: 'login.loginErrorTitle', __?: {}): string;
////     (_: 'login.loginErrorDescription', __?: {}): string;
////     (_: 'login.openEmailAppErrorTitle', __?: {}): string;
////     (_: 'login.openEmailAppErrorDescription', __?: {}): string;
////     (_: 'login.openEmailAppErrorConfirm', __?: {}): string;
//// }
//// const f: TFunction = (() => {}) as any;
//// f('[|login./**/|]')

verify.completions({
    marker: "",
    exact: [
        { name: "login.title", replacementSpan: test.ranges()[0] },
        { name: "login.description", replacementSpan: test.ranges()[0] },
        { name: "login.sendEmailAgree", replacementSpan: test.ranges()[0] },
        { name: "login.termsOfUse", replacementSpan: test.ranges()[0] },
        { name: "login.privacyPolicy", replacementSpan: test.ranges()[0] },
        { name: "login.sendEmailButton", replacementSpan: test.ranges()[0] },
        { name: "login.emailInputPlaceholder", replacementSpan: test.ranges()[0] },
        { name: "login.errorWrongEmailTitle", replacementSpan: test.ranges()[0] },
        { name: "login.errorWrongEmailDescription", replacementSpan: test.ranges()[0] },
        { name: "login.errorGeneralEmailTitle", replacementSpan: test.ranges()[0] },
        { name: "login.errorGeneralEmailDescription", replacementSpan: test.ranges()[0] },
        { name: "login.loginErrorTitle", replacementSpan: test.ranges()[0] },
        { name: "login.loginErrorDescription", replacementSpan: test.ranges()[0] },
        { name: "login.openEmailAppErrorTitle", replacementSpan: test.ranges()[0] },
        { name: "login.openEmailAppErrorDescription", replacementSpan: test.ranges()[0] },
        { name: "login.openEmailAppErrorConfirm", replacementSpan: test.ranges()[0] },
    ]
});