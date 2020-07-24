/*
 * Copyright 2018-2020 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  sign_keyPair_fromSeed,
  sign_detached,
  sign_detached_verify,
} from "../deps/deps.js";
import { Codec } from "./codec.ts";
import { KeyPair, Prefix } from "./nkeys.ts";

export class KP implements KeyPair {
  seed: Uint8Array;
  constructor(seed: Uint8Array) {
    this.seed = seed;
  }

  getRawSeed(): Uint8Array {
    let sd = Codec.decodeSeed(this.seed);
    return sd.buf;
  }

  getSeed(): Uint8Array {
    return this.seed;
  }

  getPublicKey(): string {
    const sd = Codec.decodeSeed(this.seed);
    const kp = sign_keyPair_fromSeed(this.getRawSeed());
    const buf = Codec.encode(sd.prefix, kp.publicKey);
    return new TextDecoder().decode(buf);
  }

  getPrivateKey(): Uint8Array {
    const kp = sign_keyPair_fromSeed(this.getRawSeed());
    return Codec.encode(Prefix.Private, kp.secretKey);
  }

  sign(input: Uint8Array): Uint8Array {
    const kp = sign_keyPair_fromSeed(this.getRawSeed());
    return sign_detached(input, kp.secretKey);
  }

  verify(input: Uint8Array, sig: Uint8Array): boolean {
    const kp = sign_keyPair_fromSeed(this.getRawSeed());
    return sign_detached_verify(input, sig, kp.publicKey);
  }
}
