// Copyright 2012 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that Intl.DateTimeFormat has a supportedLocalesOf
 * property, and it works as planned.
 * @author: Roozbeh Pournader
 */

var defaultLocale = new Intl.DateTimeFormat().resolvedOptions().locale;
var notSupported = 'zxx'; // "no linguistic content"
var requestedLocales = [defaultLocale, notSupported];
    
var supportedLocales;

if (!Intl.DateTimeFormat.hasOwnProperty('supportedLocalesOf')) {
    $ERROR("Intl.DateTimeFormat doesn't have a supportedLocalesOf property.");
}
    
supportedLocales = Intl.DateTimeFormat.supportedLocalesOf(requestedLocales);
if (supportedLocales.length !== 1) {
    $ERROR('The length of supported locales list is not 1.');
}
    
if (supportedLocales[0] !== defaultLocale) {
    $ERROR('The default locale is not returned in the supported list.');
}

