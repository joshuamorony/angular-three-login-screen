import { NgModule } from '@angular/core';
import { LoginCubeComponent } from './login-cube.component';

import { NgtCoreModule } from '@angular-three/core';
import { NgtMeshModule } from '@angular-three/core/meshes';
import { NgtMeshStandardMaterialModule } from '@angular-three/core/materials';
import { NgtBoxGeometryModule } from '@angular-three/core/geometries';
import {
  NgtAmbientLightModule,
  NgtSpotLightModule,
} from '@angular-three/core/lights';

@NgModule({
  imports: [
    NgtCoreModule,
    NgtMeshModule,
    NgtBoxGeometryModule,
    NgtMeshStandardMaterialModule,
    NgtAmbientLightModule,
    NgtSpotLightModule,
  ],
  declarations: [LoginCubeComponent],
  exports: [LoginCubeComponent],
})
export class LoginCubeComponentModule {}
