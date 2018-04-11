"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
typeorm_1.createConnection().then(async (connection) => {
    connection.close();
}).catch(error => {
    console.log(error);
});
