const axios = require('axios');
var http = require('http');
var https = require('https');
var querystring = require('query-string'); // hàm xử lý chuỗi url
var Port = normalizePort(process.env.PORT || 1000);

var Dich_vu = http.createServer(async function(req, res) {
    if (req.url === '/sms') {
        var json = `{
            "ApiKey": "C671FB9BF15391FA5FFC62A3AC9A34",
            "Content": "15 la ma xac minh dang ky Baotrixemay cua ban",
            "Phone": "0945078855",
            "SecretKey": "D3C47022E82732DD589C9E2AC56742",
            "IsUnicode": "0",
            "Brandname": "Baotrixemay",
            "SmsType": "2"
        }`;


        const result = await axios.post('http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/', json, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });

        // result.data.data; // '{"answer":42}'

        // result.data.headers['Content-Type']; // 'application/json',
        res.write('gui tin thanh cong');
        res.end();
    } else if (req.url === '/zalo') {
        // var json = `{
        //     "ApiKey": "1DF94016A1DC70F323C432E274EB3F",
        //     "Content": "Xin chào linh,
        //     Cám ơn bạn đã đăng ký tài khoản sử dụng dịch vụ .
        //     Mã xác thực tài khoản hệ thống là: 1223. Không tiết lộ cho bất kỳ ai, Mã xác nhận sẽ có hiệu lực trong 5 phút.",
        //     "Phone": "0945078855",
        //     "SecretKey": "BC0AF90967B9F9BD6EBAAD23A8836",
        //     "IsUnicode": "0",
        //     "Brandname": "SVoucher",
        //     "SmsType": "2"
        // }`;
        var json = `{
            "ApiKey": "C671FB9BF15391FA5FFC62A3AC9A34",
            "SecretKey": "D3C47022E82732DD589C9E2AC56742",
            "Phone": "0945078855",
            "OAID": "4097311281936189049",
            "TempID": "200605",
            "Params": ["Anh Linh", "1234"]
        }`;

        const result = await axios.post('http://rest.esms.vn/MainService.svc/xml/SendZaloMessage_V4_post_json/', json, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });

        // result.data.data; // '{"answer":42}'

        // result.data.headers['Content-Type']; // 'application/json',
        // console.log(result);
        res.write('gui tin zalo thanh cong');
        res.end();
    } else {
        res.end('app is working');
    }
})


Dich_vu.listen(Port, console.log(`Dịch vụ Dữ liệu đang thực thi tại địa chỉ: http://localhost:${Port}`));
Dich_vu.on('error', onError);
Dich_vu.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof Port === 'string' ?
        'Pipe ' + Port :
        'Port ' + Port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = Dich_vu.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind);
}