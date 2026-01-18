// @strict: true
// @allowUnreachableCode: false
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61259

const a = (v: 1 | 2) => {
  try {
    switch (v) {
      case 1:
        return v;
      case 2:
        return v;
    }
  } finally {
    console.log("exit");
  }
};

const b = (v: number) => {
  try {
    switch (v) {
      case 1:
        return v;
      default:
        return v;
    }
  } finally {
    console.log("exit");
  }
};

const c = (v: 1 | 2) => {
  try {
    switch (v) {
      case 1:
        return v;
      case 2:
        return v;
    }
  } finally {
    if (Math.random()) {
      console.log("exit");
    }
  }
};

const d = (v: number) => {
  try {
    switch (v) {
      case 1:
        return v;
      default:
        return v;
    }
  } finally {
    if (Math.random()) {
      console.log("exit");
    }
  }
};

// https://github.com/microsoft/TypeScript/issues/63004
const report: (e: any) => never = (e): never => {
  throw e;
};

const foo = async (): Promise<number> => {
  try {
    return 3;
  } catch (e) {
    report(e);
  } finally {
    if (Math.random()) {
      console.log("heh");
    }
  }
};
