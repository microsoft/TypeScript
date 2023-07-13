// @strict: true
// @noEmit: true
// @jsx: preserve

/// <reference path="/.lib/react16.d.ts" />

import React = require('react');

type TranslationEntry = {
    args: [] | [unknown];
}
type Translations = {
    a: { args: [string] },
    b: { args: [] }
}
type TProps<Entry extends TranslationEntry> = {
    getTranslationEntry: (allTranslations: Translations) => Entry,
} & (Entry["args"] extends [unknown] ? {
    args: Entry["args"][0]
} : {});

declare function T<Entry extends TranslationEntry>(
    props: TProps<Entry>
): JSX.Element;

<T getTranslationEntry={(allTranslations) => allTranslations.a} args="a" />
