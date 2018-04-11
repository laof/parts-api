"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const Photo_1 = require("./entity/Photo");
const marked = require("marked");
const fs_1 = require("fs");
let AppController = class AppController {
    root() {
        const markstr = fs_1.readFileSync('api.md').toString();
        const apiHtml = marked(markstr);
        return apiHtml;
    }
    async getList() {
        return typeorm_1.createConnection().then(async (connection) => {
            const photoRepository = connection.getRepository(Photo_1.Photo);
            const column = await photoRepository.find();
            connection.close();
            return column;
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "root", null);
__decorate([
    common_1.Post('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getList", null);
AppController = __decorate([
    common_1.Controller()
], AppController);
exports.AppController = AppController;
