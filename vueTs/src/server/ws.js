const ws = require('nodejs-websocket');
const moment = require('moment')
function broadcast(obj){
    server.connections.forEach((conn)=>{
        conn.sendText(JSON.stringify(obj))
    })
}

const server = ws.createServer(function(conn){
    conn.on('text', function(data){
        console.log(data);
        const obj = JSON.parse(data);
        switch(obj.type){
            case 1:
                broadcast({
                    type: 1,
                    nickname: obj.nickname,
                    uid: obj.uid,
                    msg: `${obj.nickname}进入聊天室`
                })
                break;
            case 2:
                broadcast({
                    type: 2,
                    nickname: obj.nickname,
                    uid: obj.uid,
                    msg: obj.msg,
                    date: moment().format('YYYY-MM-DD HH:mm:ss'),
                })
                break;
        }
    })
    conn.on('close', function(e){
        console.log(e, '服务端链接关闭')
    })
    conn.on('error', function(e){
        console.log(e, '服务端异常')
    })
}).listen(8081)
console.log('服务端已开启')