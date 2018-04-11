"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cors = require("cors");
require("./sql.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors());
    app.use(express.static('checkcode'));
    await app.listen(18080);
}
bootstrap();
