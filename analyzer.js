const net = require('net');
const decoder = new TextDecoder('utf-8');

const PORT = 8000;

console.log(`[Packet Analyzer] Listening on port ${PORT}...`);

const server = net.createServer((socket) => {
    console.log('\n[Packet Analyzer] New connection received.');

    socket.on('data', (data) => {
        const receivedMessage = decoder.decode(data);
        console.log(`[Packet Analyzer] Raw bytes received (${data.length} bytes): ${receivedMessage}`);
    });

    socket.on('close', () => {
        console.log('[Packet Analyzer] Connection closed.');
    });

    socket.on('error', (err) => {
        console.error(`[Packet Analyzer] Socket error: ${err.message}`);
    });
});

server.listen(PORT, 'localhost', () => {
    console.log(`[Packet Analyzer] Server is running at tcp://localhost:${PORT}`);
});