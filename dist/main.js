"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./sql.service");
const child_process_1 = require("child_process");
async function bootstrap() {
    const port = 18080;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.set('views', path_1.resolve(__dirname, '..', 'webapp'));
    app.set('view engine', 'ejs');
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
    await app.listen(port);
    child_process_1.exec('start http://127.0.0.1:' + port);
}
bootstrap();
//# sourceMappingURL=main.js.map