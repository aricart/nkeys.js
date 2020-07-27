// @ts-ignore
const nacl = require("tweetnacl");
const helper = {
  randomBytes: nacl.randomBytes,
  verify: nacl.sign.detached.verify,
  fromSeed: nacl.sign.keyPair.fromSeed,
  sign: nacl.sign.detached,
};

//@ts-ignore
const {setEd25519Helper} = require('./mod.js')
setEd25519Helper(helper);

