require('dotenv').config();
const PORT = process.env.PORT || 8000
const express = require("express");
const app = express();
const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 8080, // websocket server chạy trên địa chỉ localhost:8080
    perMessageDeflate: {
        zlibDeflateOptions: {
            // See zlib defaults.
            chunkSize: 1024,
            memLevel: 7, // số người tham gia chat
            level: 3
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024 // Size (in bytes) below which messages
        // should not be compressed.
    }
});

// Server định nghĩa event khi có client tạo kết nối đến websocket server
wss.on('connection', function connection(ws) {
    // server nhận tin nhắn từ 1 cline nào đó
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        
        // Và gửi tin nhắn (message) đó đến tất cả client  đang kết nối
        wss.clients.forEach(function each(client) {
            // Kiểm tra cline có đang kết nối hay không
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                // Nếu có thì gửi tin nhắn
                client.send(message);
            }
        });
    });

});

app.use(express.static('public'));
app.get('/', function (req, res, ext) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT);
console.log(`Server running on http://localhost:${PORT}`);