import { NgtCoreModule } from '@angular-three/core';
import { NgtGridHelperModule } from '@angular-three/core/helpers';
import {
  NgtAmbientLightModule,
  NgtDirectionalLightModule,
  NgtHemisphereLightModule,
} from '@angular-three/core/lights';
import { NgtMeshPhongMaterialModule } from '@angular-three/core/materials';
import { NgtPrimitiveModule } from '@angular-three/core/primitive';
import { NgtSobaLoaderModule } from '@angular-three/soba/loaders';
import { NgtSobaPlaneModule } from '@angular-three/soba/shapes';
import { NgtSobaStarsModule } from '@angular-three/soba/staging';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
} from '@angular/core';
import { GridHelper, Material } from 'three';
import { RobotComponent } from './robot.component';

@Component({
  selector: 'app-robot-expressive',
  templateUrl: './robot-expressive.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RobotExpressiveComponent {
  onGridHelperReady(helper: GridHelper) {
    const material = helper.material as Material;
    material.opacity = 0.2;
    material.transparent = true;
  }
}

@NgModule({
  declarations: [RobotExpressiveComponent, RobotComponent],
  exports: [RobotExpressiveComponent],
  imports: [
    NgtCoreModule,
    NgtHemisphereLightModule,
    NgtDirectionalLightModule,
    NgtSobaPlaneModule,
    NgtSobaStarsModule,
    NgtMeshPhongMaterialModule,
    NgtGridHelperModule,
    CommonModule,
    NgtSobaLoaderModule,
    NgtPrimitiveModule,
  ],
})
export class RobotExpressiveModule {}
