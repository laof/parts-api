import { createConnection, Connection } from 'typeorm';
import { Photo } from '../entity/Photo';
import { User } from '../entity/User';
createConnection().then(async  connection => {
    // const photo = new Photo();
    // photo.name = 'Me and Bears';
    // photo.description = 'I am near polar bears';
    // photo.fileName = 'photo-with-bears.jpg';
    // photo.views = 212;
    // photo.content = 'fdsafa';
    // photo.isPublished = true;
    // await connection.manager.save(photo);

    // const user = new User();
    // user.name = 'admin';
    // user.password = '123';
    // user.email = 'admin123@qq.com';
    // user.lastTime = '2018-01-10 12:00:00';
    // user.mark = '';

    // await connection.manager.save(user);

    connection.close();
}).catch(error => {
    console.log(error);
});