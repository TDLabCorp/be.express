import { createCipheriv, createDecipheriv } from "crypto";

const algorithm = "aes-256-cbc";
const cipherKey = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const cipherIV = "bbbbbbbbbbbbbbbb";

export function encrypt(text: string): string {
  const cipher = createCipheriv(algorithm, cipherKey, cipherIV);
  let enctypted = cipher.update(text, "utf8", "hex");
  enctypted += cipher.final("hex");
  return enctypted;
}

export function decrypt(encrypted: string): string {
  const decipher = createDecipheriv(algorithm, cipherKey, cipherIV);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
