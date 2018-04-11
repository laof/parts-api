"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Photo_1 = require("./entity/Photo");
typeorm_1.createConnection().then(async (connection) => {
    const photo = new Photo_1.Photo();
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
