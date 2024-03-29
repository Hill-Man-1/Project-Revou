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
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const userModel_1 = __importDefault(require("../models/userModel"));
const insertAdmin = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req || !req.db) {
            console.error("Error!! Can't input Admin data: Request or db is undefined");
            return;
        }
        const adminCheck = yield userModel_1.default.findOne({ role: 'admin' });
        if (!adminCheck) {
            const adminFirstName = process.env.ADMIN_FIRSTNAME;
            const adminLastName = process.env.ADMIN_LASTNAME;
            const adminUsername = process.env.ADMIN_USERNAME;
            const adminEmail = process.env.ADMIN_EMAIL;
            const adminPass = process.env.ADMIN_PASS;
            const hashedPass = yield bcrypt_1.default.hash(adminPass, 10);
            const newAdmin = new userModel_1.default({
                first_name: adminFirstName,
                last_name: adminLastName,
                username: adminUsername,
                email: adminEmail,
                password: hashedPass,
                role: 'admin'
            });
            yield newAdmin.save();
            console.log("Admin Account successfully created! Welcome!");
        }
        else {
            console.log("Reminder: Admin already exists", adminCheck);
            return;
        }
    }
    catch (error) {
        console.error("Error!! Can't input Admin data", error);
    }
});
exports.default = insertAdmin;
