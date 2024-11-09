import { createPlugin } from "../dist";
import { Manifest } from "../dist";
import manifest from "../manifest.json";
import { helloWorld } from "./handlers/hello-world";
import { envSchema, pluginSettingsSchema } from "./types";
import dotenv from "dotenv";
dotenv.config();

const pk = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuHo/GFIOeSAVD1bucfJY
81sRU5PtrDXcjM+JgZNRGvaNzkqMB+IfqwkA8op3ENZ69lw4CXmZ/r5Z0k2KmZX9
H0UovxZr/LdFi5Es28lKOF1cVRyXHGGF1dbP3TbAzktUoqUQTLxfRKHTaszRUCEN
CDIXvJ5irha/9EDwXz/pahFQ7DmvwGevF3TgJNtmkpXcR35lF1sjl59TZQFiRR93
5a7hS+x3qsmALh+rtjzx6qz/Ahi7rJmIbuXADsga5epr0VpSBbg5dENRoMl9Z0NC
1qNYIwb/obKuE36RGQ1L1MkO9/E385v7x4eWA1BMpChFXhf6jxCa+w4t7YLxMQhm
3QIDAQAB
-----END PUBLIC KEY-----`;

export default createPlugin(helloWorld, manifest as Manifest, {
  kernelPublicKey: pk,
  logLevel: "debug",
  postCommentOnError: true,
  envSchema: envSchema,
  settingsSchema: pluginSettingsSchema,
});
