//// [parserStatementIsNotAMemberVariableDeclaration1.ts]
return {

  "set": function (key, value) {

    // 'private' should not be considered a member variable here.
    private[key] = value;

  }

};

//// [parserStatementIsNotAMemberVariableDeclaration1.js]
return {
    "set": function (key, value) {
        // 'private' should not be considered a member variable here.
        private[key] = value;
    }
};
