const { network } = require("hardhat");
const { encryptDataField } = require("@swisstronik/utils");

async function sendShieldedTransaction(signer, destination, data, value) {
  // Get the RPC link from the network configuration
  const rpcLink = network.config.url;

  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpcLink, data);

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value: value,
  });
}

module.exports = { sendShieldedTransaction };
