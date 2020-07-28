/**
 * @ignore
 */
//@ts-ignore
const nacl = require("tweetnacl");
/**
 * @ignore
 */
//@ts-ignore
const helper = {
  randomBytes: nacl.randomBytes,
  verify: nacl.sign.detached.verify,
  fromSeed: nacl.sign.keyPair.fromSeed,
  sign: nacl.sign.detached,
};

/**
 * @ignore
 */
//@ts-ignore
const { setEd25519Helper } = require("./helper.ts");
setEd25519Helper(helper);

/**
 * @ignore
 */
//@ts-ignore
export * from "./mod.ts";
