var exec = require('child_process').exec,
    last = exec('.\\redis-server.exe .\\redis.conf');

last.stdout.on('data', function (data) {
    console.log('redis server 启动成功：\n\n\n' + data);
});

last.on('exit', function (code) {
    console.log('子进程已关闭，代码：' + code);
});