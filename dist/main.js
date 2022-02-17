"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
const app_module_1 = require("./app.module");
const expressApp = express_1.default();
const adapter = new platform_express_1.ExpressAdapter(expressApp);
const port = process.env.PORT || 5000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter);
    app.disable('x-powered-by');
    if (process.env.NODE_ENV === 'development') {
        await app.listen(port);
        if (module.hot) {
            module.hot.accept();
            module.hot.dispose(() => app.close());
        }
    }
    else {
        await app.init();
    }
    return expressApp;
}
exports.bootstrap = bootstrap;
if (process.env.NODE_ENV === 'development') {
    let info = `listen on http://localhost:${port}`;
    info = module.hot ? 'webpack HRM ' + info : 'Tsc App ' + info;
    bootstrap().then(() => {
        console.log(info);
    });
}
//# sourceMappingURL=main.js.map