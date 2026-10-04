// @target: es2015
// @ignoreDeprecations: 6.0
// @strict: false
// @alwaysStrict: true, false
return {

  "set": function (key, value) {

    // 'private' should not be considered a member variable here.
    private[key] = value;

  }

};