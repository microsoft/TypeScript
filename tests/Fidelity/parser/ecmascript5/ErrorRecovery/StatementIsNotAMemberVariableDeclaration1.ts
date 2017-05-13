return {

  "set": function (key, value) {

    // 'private' should not be considered a member variable here.
    private[key] = value;

  }

};