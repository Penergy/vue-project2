var getPixels = require("get-pixels")
var mysql = require('mysql');

// Create a connection
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: '3306',
    database: 'vue-images'
})

connection.connect(function(err){
    if(err){
        console.log('[query] - :' + err);
        return
    }else{
        console.log('[connection connect] succedd!');
    }
})
//查询
connection.query('SELECT * FROM images-hex', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0]);
});
//关闭连接
connection.end();

// getPixels("./images/test-img1.png", function (err, pixels) {
//     if (err) {
//         console.log("Bad image path")
//         return
//     }
//     console.log(pixels)
//     var pixels_in_hex_value = [];
//     var index = 0;
//     for (let i = 0; i < pixels.shape[0]; i++) {
//         for (let j = 0; j < pixels.shape[1]; j++) {
//             let str = "rgb(" + pixels.get(i, j, 0) + ','
//                 + pixels.get(i, j, 1) + ','
//                 + pixels.get(i, j, 2) + ')';
//             // console.log(str.colorHex());
//             pixels_in_hex_value[index] = str.colorHex();
//             index++;
//         }
//     }
//     console.log(pixels_in_hex_value.toString())
//     return
//     // console.log(pixels_in_hex_value)
//     // console.log('rgb(13,128,182)'.colorHex());

// })

var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/*RGB颜色转换为16进制*/
String.prototype.colorHex = function () {
    var that = this;
    if (/^(rgb|RGB)/.test(that)) {
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i = 0; i < aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            if (Number(aColor[i]) <= 15) {
                hex = "0" + hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = that;
        }
        return strHex;
    } else if (reg.test(that)) {
        var aNum = that.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return that;
        } else if (aNum.length === 3) {
            var numHex = "#";
            for (var i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return that;
    }
};