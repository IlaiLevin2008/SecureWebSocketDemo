// analyzer.js
const net = require("net");
const decoder = new TextDecoder("utf-8");

const PORT = 8000;

console.log(
  `[Packet Analyzer] Listening on all network interfaces on port ${PORT}...`
);

const server = net.createServer((socket) => {
  const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(
    `\n[Analyzer - ${new Date().toISOString()}] New connection from ${clientAddress}`
  );

  socket.on("data", (data) => {
    const receivedMessage = decoder.decode(data);
    console.log(
      `[Analyzer - ${new Date().toISOString()}] Received data from ${clientAddress}:`
    );

    // This is a more intelligent analyzer. It tries to detect message types.
    if (receivedMessage.startsWith("-----BEGIN PUBLIC KEY-----")) {
      console.log(`[Analyzer] Detected a public key exchange.`);
      console.log(
        `[Analyzer] Public Key Content (intercepted): ${receivedMessage}`
      );
    } else if (data.length > 32 && receivedMessage.length === 0) {
      console.log(
        `[Analyzer] Received ${data.length} bytes of encrypted/binary data.`
      );
      console.log(`[Analyzer] Content: (Unreadable encrypted data)`);
    } else {
      console.log(
        `[Analyzer] Received ${data.length} bytes of unencrypted text.`
      );
      console.log(`[Analyzer] Content: "${receivedMessage}"`);
    }
  });

  socket.on("close", () => {
    console.log(
      `[Analyzer - ${new Date().toISOString()}] Connection closed by ${clientAddress}`
    );
  });

  socket.on("error", (err) => {
    console.error(
      `[Analyzer - ${new Date().toISOString()}] Socket error from ${clientAddress}: ${
        err.message
      }`
    );
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[Packet Analyzer] Server is running and ready for connections.`);
  console.log(
    `[Packet Analyzer] To test, connect from a web page using this machine's local IP address.`
  );
});
