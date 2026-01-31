// @target: es2015
// @strict: false
return {

  "set": function (key, value) {

    // 'private' should not be considered a member variable here.
    private[key] = value;

  }

};