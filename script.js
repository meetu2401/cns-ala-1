// Generate RSA key pair
const encryptor = new JSEncrypt({ default_key_size: 2048 });
encryptor.getKey();
const privateKey = encryptor.getPrivateKey();
const decryptor = new JSEncrypt();
decryptor.setPrivateKey(privateKey);

function encryptMessage() {
  const message = document.getElementById("message").value;
  const aesKey = CryptoJS.lib.WordArray.random(16).toString();
  const encryptedMsg = CryptoJS.AES.encrypt(message, aesKey).toString();
  const encryptedKey = encryptor.encrypt(aesKey);

  document.getElementById("rsaKeyOutput").innerText = encryptedKey;
  document.getElementById("aesMsgOutput").innerText = encryptedMsg;

  document.getElementById("encryptedKey").value = encryptedKey;
  document.getElementById("encryptedMsg").value = encryptedMsg;
}

function decryptMessage() {
  const encryptedKey = document.getElementById("encryptedKey").value;
  const encryptedMsg = document.getElementById("encryptedMsg").value;

  const decryptedAESKey = decryptor.decrypt(encryptedKey);
  if (!decryptedAESKey) {
    document.getElementById("decryptedOutput").innerText = "❌ Failed to decrypt AES key!";
    return;
  }

  const decryptedBytes = CryptoJS.AES.decrypt(encryptedMsg, decryptedAESKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

  document.getElementById("decryptedOutput").innerText = decryptedText || "❌ Decryption failed.";
}
