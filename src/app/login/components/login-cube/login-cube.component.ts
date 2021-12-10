import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { LoginStatus } from '../../login.model';

@Component({
  selector: 'app-login-cube',
  templateUrl: './login-cube.component.html',
  styleUrls: ['./login-cube.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginCubeComponent implements OnInit {
  public color = 'grey';
  private speed = 0.01;

  @Input()
  set status(value: LoginStatus) {
    switch (value) {
      case 'authenticating':
        this.color = 'blue';
        this.speed = 0.05;
        break;
      case 'success':
        this.color = 'green';
        this.speed = 0.01;
        break;
      case 'error':
        this.color = 'red';
        this.speed = 0.01;
        break;
      default:
        this.color = '#cecece';
        this.speed = 0.01;
        break;
    }
  }

  constructor() {}

  ngOnInit() {}

  onAnimate(mesh: THREE.Mesh) {
    mesh.rotation.x = mesh.rotation.y += this.speed;
  }
}
