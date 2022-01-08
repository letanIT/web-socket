// Client tạo kết nối đến server
const socket = new WebSocket('ws://localhost:8080');

// Client gửi tin nhắn sau khi đã kết nối đến server
socket.addEventListener('open', function (event) {
    socket.send('A new member joined!');
});

// Client lắng nghe tin nhắn từ server
socket.addEventListener('message', function (event) {
    // Trang web thêm nội dung tin nhắn vào màn hình
    $('#thread').append('<div class="message friends">' + event.data + '</div>');
	$("#thread").animate({ scrollTop: $(document).height() + 1000}, 1000);
});

// Khi user nhập tin nhắn và gửi đi
$('form').submit(function(){
    // Lấy nội dung của dòng chat
    const message = $('#message').val();
    // Gửi nội dung đoạn chat đến server
    socket.send(message);
    // Xoá đoạn chat đã gửi khỏi ô tin nhắn
    this.reset();

    // Thêm đoạn chat đó vào màn hình
    $('#thread').append('<div class="message my">' + message + '</div>');
	$("#thread").animate({ scrollTop: $(document).height() + 1000}, 1000);
    return false;
})

