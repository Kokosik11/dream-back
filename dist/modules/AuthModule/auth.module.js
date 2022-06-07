"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_config_1 = require("../../config/jwt.config");
const passport_config_1 = require("../../config/passport.config");
const dbmodule_module_1 = require("../../persistance/dbmodule.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const roles_guard_1 = require("./guards/roles.guard");
const google_strategy_1 = require("./strategies/google.strategy");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.registerAsync(passport_config_1.passportConfigAsync),
            jwt_1.JwtModule.registerAsync(jwt_config_1.jwtConfigAsync),
            dbmodule_module_1.DbModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [google_strategy_1.GoogleStrategy, jwt_strategy_1.JwtStrategy, auth_service_1.AuthService, roles_guard_1.RolesGuard],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map