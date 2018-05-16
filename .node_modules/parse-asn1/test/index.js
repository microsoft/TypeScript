var test = require('tape')
var fs = require('fs')
var parseKey = require('../')
var rsa1024 = {
  private: fs.readFileSync(__dirname + '/rsa.1024.priv'),
  public: fs.readFileSync(__dirname + '/rsa.1024.pub')
}
var rsa2028 = {
  private: fs.readFileSync(__dirname + '/rsa.2028.priv'),
  public: fs.readFileSync(__dirname + '/rsa.2028.pub')
}
var nonrsa1024 = {
  private: fs.readFileSync(__dirname + '/1024.priv'),
  public: fs.readFileSync(__dirname + '/1024.pub')
}
var pass1024 = {
  private: {
    passphrase: 'fooo',
    key: fs.readFileSync(__dirname + '/pass.1024.priv')
  },
  public: fs.readFileSync(__dirname + '/pass.1024.pub')
}
var ec = {
  private: fs.readFileSync(__dirname + '/ec.priv'),
  public: fs.readFileSync(__dirname + '/ec.pub')
}
var ecpass = {
  private: {
    key: fs.readFileSync(__dirname + '/ec.pass.priv'),
    passphrase: 'bard'
  },
  public: fs.readFileSync(__dirname + '/ec.pub')
}
var dsa = {
  private: fs.readFileSync(__dirname + '/dsa.1024.priv'),
  public: fs.readFileSync(__dirname + '/dsa.1024.pub')
}
var dsa2 = {
  private: fs.readFileSync(__dirname + '/dsa.2048.priv'),
  public: fs.readFileSync(__dirname + '/dsa.2048.pub')
}
var dsapass = {
  private: {
    key: fs.readFileSync(__dirname + '/pass.dsa.1024.priv'),
    passphrase: 'password'
  },
  public: fs.readFileSync(__dirname + '/pass.dsa.1024.pub')
}
var dsapass2 = {
  private: {
    key: fs.readFileSync(__dirname + '/pass2.dsa.1024.priv'),
    passphrase: 'password'
  },
  public: fs.readFileSync(__dirname + '/pass2.dsa.1024.pub')
}
var rsapass = {
  private: {
    key: fs.readFileSync(__dirname + '/pass.rsa.1024.priv'),
    passphrase: 'password'
  },
  public: fs.readFileSync(__dirname + '/pass.rsa.1024.pub')
}
var rsapass2 = {
  private: {
    key: fs.readFileSync(__dirname + '/pass.rsa.2028.priv'),
    passphrase: 'password'
  },
  public: fs.readFileSync(__dirname + '/pass.rsa.2028.pub')
}
var cert = {
  private: fs.readFileSync(__dirname + '/rsa.1024.priv'),
  public: fs.readFileSync(__dirname + '/node.cert')
}
var i = 0
function testIt (keys) {
  test('key ' + (++i), function (t) {
    t.plan(2)
    t.ok(parseKey(keys.public), 'public key')
    t.ok(parseKey(keys.private), 'private key')
  })
}

function testEOL (keys) {
  var publicKey = keys.public.toString()
  var newLineRegex = /\r?\n/g
  var genPrivate = function (replace) {
    if (keys.private.key) {
      return { key: keys.private.key.toString().replace(newLineRegex, replace), passphrase: keys.private.passphrase }
    } else {
      return keys.private.toString().replace(newLineRegex, replace)
    }
  }
  var testN = {
    private: genPrivate('\n'),
    public: publicKey.replace(newLineRegex, '\n')
  }
  testIt(testN)
  var testR = {
    private: genPrivate('\r'),
    public: publicKey.replace(newLineRegex, '\r')
  }
  testIt(testR)
  var testRN = {
    private: genPrivate('\r\n'),
    public: publicKey.replace(newLineRegex, '\r\n')
  }
  testIt(testRN)
}

testIt(dsa)
testIt(dsa2)
testIt(rsa1024)
testIt(ec)
testIt(rsa2028)
testIt(nonrsa1024)
testIt(ecpass)
testIt(dsapass)
testIt(dsapass2)
testIt(rsapass)
testIt(rsapass2)
testIt(pass1024)
testIt(pass1024)
testIt(cert)

testEOL(dsa)
testEOL(dsa2)
testEOL(rsa1024)
testEOL(ec)
testEOL(rsa2028)
testEOL(nonrsa1024)
testEOL(ecpass)
testEOL(dsapass)
testEOL(dsapass2)
testEOL(rsapass)
testEOL(rsapass2)
testEOL(pass1024)
testEOL(pass1024)
testEOL(cert)
