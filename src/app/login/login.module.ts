import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import {
  RobotExpressiveModule
} from "./components/robot-expressive/robot-expressive.component";
import { LoginPage } from './login.page';

import { HomePageRoutingModule } from './login-routing.module';
import { LoginCubeComponentModule } from './components/login-cube/login-cube.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    LoginCubeComponentModule,
    RobotExpressiveModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
