"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoMiddleware_1 = __importDefault(require("./middleware/mongoMiddleware"));
const mainRouter_1 = __importDefault(require("./router/mainRouter"));
require("dotenv/config");
const superAdmin_1 = __importDefault(require("./config/superAdmin"));
const cookieMiddleware_1 = __importDefault(require("./middleware/cookieMiddleware"));
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(mongoMiddleware_1.default);
(0, cookieMiddleware_1.default)(app);
app.use(mainRouter_1.default);
// super admin account:
app.post('/setupadmin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, superAdmin_1.default)(req);
    res.status(200).send('Admin setup complete');
}));
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});
