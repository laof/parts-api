import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { Photo } from './entity/Photo';
createConnection().then(async  connection => {
    const photo = new Photo();
    photo.name = 'Me and Bears';
    photo.description = 'I am near polar bears';
    photo.fileName = 'photo-with-bears.jpg';
    photo.views = 212;
    photo.content = 'fdsafa';
    photo.isPublished = true;
    await connection.manager.save(photo);
    connection.close();
}).catch(error => {
    console.log(11);
});