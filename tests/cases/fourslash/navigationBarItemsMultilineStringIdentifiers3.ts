
//// declare module 'MoreThanOneHundredAndFiftyCharacters\
//// MoreThanOneHundredAndFiftyCharacters\
//// MoreThanOneHundredAndFiftyCharacters\
//// MoreThanOneHundredAndFiftyCharacters\
//// MoreThanOneHundredAndFiftyCharacters\
//// MoreThanOneHundredAndFiftyCharacters\
//// MoreThanOneHundredAndFiftyCharacters' { }

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "'MoreThanOneHundredAndFiftyCharactersMoreThanOneHundredAndFiftyCharactersMoreThanOneHundredAndFiftyCharactersMoreThanOneHundredAndFiftyCharacter...",
            "kind": "module",
            "kindModifiers": "declare"
        }
    ]
});

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "'MoreThanOneHundredAndFiftyCharactersMoreThanOneHundredAndFiftyCharactersMoreThanOneHundredAndFiftyCharactersMoreThanOneHundredAndFiftyCharacter...",
                "kind": "module",
                "kindModifiers": "declare"
            }
        ]
    },
    {
        "text": "'MoreThanOneHundredAndFiftyCharactersMoreThanOneHundredAndFiftyCharactersMoreThanOneHundredAndFiftyCharactersMoreThanOneHundredAndFiftyCharacter...",
        "kind": "module",
        "kindModifiers": "declare",
        "indent": 1
    }
]);
