"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./sql.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors());
    app.use(cookieParser());
    app.use(session({
        secret: '12345',
        name: 'lovaApp',
        cookie: { maxAge: 1000 * 60 * 30 },
        resave: false,
        saveUninitialized: true,
    }));
    app.use(express.static('checkcode'));
    app.use(express.static('webapp'));
    await app.listen(18080);
}
bootstrap();
//# sourceMappingURL=main.js.map