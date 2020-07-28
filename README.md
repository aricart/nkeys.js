# ts-nkeys


A public-key signature system based on Ed25519 for the [NATS ecosystem system](https://nats.io) in JavaScript and Typescript.

[![license](https://img.shields.io/github/license/nats-io/ts-nats.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![nkeys.js](https://github.com/aricart/nkeys.js/workflows/nkeys.js/badge.svg)](https://github.com/aricart/nkeys.js/actions)
[![Coveralls github branch](https://img.shields.io/coveralls/github/nats-io/ts-nkeys/master.svg)](https://coveralls.io/github/nats-io/ts-nkeys)
[![npm](https://img.shields.io/npm/v/ts-nkeys.svg)](https://www.npmjs.com/package/ts-nkeys)
[![npm](https://img.shields.io/npm/dt/ts-nkeys.svg)](https://www.npmjs.com/package/ts-nkeys)

ts-nkeys is a typescript nats library for node that for generating nkeys.

## Installation

```bash
npm install ts-nkeys
```

## Basic Usage

```typescript
import {
  createUser,
  fromPublic,
  fromSeed,
} from "src/mod.ts";

// create an user nkey KeyPair (can also create accounts, operators, etc).
const user = createUser();

// A seed is the public and private keys together.
const seed: Uint8Array = user.getSeed();

// Seeds are encoded into Uint8Array, and start with
// the letter 'S'. Seeds need to be kept safe and never shared
console.log(`seeds start with s: ${seed[0] === "S".charCodeAt(0)}`);

// A seed's second letter encodes it's type:
// `U` for user,
// `A` for account,
// `O` for operators
console.log(`nkey is for a user? ${seed[1] === "U".charCodeAt(0)}`);

// To view a seed, simply decode it:
console.log(new TextDecoder().decode(seed));

// you can recreate the keypair with its seed:
const priv = fromSeed(seed);

// Using the KeyPair, you can cryptographically sign content:
const data = new TextEncoder().encode("Hello World!");
const sig = priv.sign(data);

// and verify a signature:
const valid = user.verify(data, sig);
if (!valid) {
  console.error("couldn't validate the data/signature against my key");
} else {
  console.error("data was verified by my key");
}

// others can validate using your public key:
const publicKey = user.getPublicKey();
const pub = fromPublic(publicKey);
if (!pub.verify(data, sig)) {
  console.error(`couldn't validate the data/signature with ${publicKey}`);
} else {
  console.info(`data was verified by ${publicKey}`);
}

// when extracting with seeds or private keys
// you should clear them when done:
seed.fill(0);

// you should also clear the keypairs:
user.clear();
priv.clear();
```


## Supported Node Versions

Our support policy for Nodejs versions follows [Nodejs release support](https://github.com/nodejs/Release).
We will support and build node-nats on even-numbered Nodejs versions that are current or in LTS.

## License

Unless otherwise noted, the NATS source files are distributed under the Apache Version 2.0 license found in the LICENSE file.
