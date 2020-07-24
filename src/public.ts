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

import { sign_detached_verify } from "../deps/deps.js";
import { Codec } from "./codec.ts";
import { KeyPair, NKeysError, NKeysErrorCode } from "./nkeys.ts";

/**
 * KeyPair capable of verifying only
 */
export class PublicKey implements KeyPair {
  publicKey: Uint8Array;

  constructor(publicKey: Uint8Array) {
    this.publicKey = publicKey;
  }

  getPublicKey(): string {
    return new TextDecoder().decode(this.publicKey);
  }

  getPrivateKey(): Uint8Array {
    throw new NKeysError(NKeysErrorCode.PublicKeyOnly);
  }

  getSeed(): Uint8Array {
    throw new NKeysError(NKeysErrorCode.PublicKeyOnly);
  }

  sign(_: Uint8Array): Uint8Array {
    throw new NKeysError(NKeysErrorCode.CannotSign);
  }

  verify(input: Uint8Array, sig: Uint8Array): boolean {
    let buf = Codec._decode(this.publicKey);
    return sign_detached_verify(input, sig, buf.slice(1));
  }
}
