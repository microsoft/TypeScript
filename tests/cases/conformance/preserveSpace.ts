function f() {
  return [].filter(x => {
        if (!x) return false; // testing comments
        if (x)
            return true; // testing comments
        if (x) {
            return false; // testing comments
        } else {
            console.log("here"); // testing comments
        }
        let i: number = 0;
        while (i > 0) i = i - 1;
        do console.log("here");
        while (false);

        try {
            return true;
        } catch (e) {
            return false;
        }
  });
}