import { NgtDestroyedService, NgtRender } from '@angular-three/core';
import { NgtGLTFLoaderService } from '@angular-three/soba/loaders';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Group,
  LoopOnce,
  Mesh,
} from 'three';
import { LoginStore } from '../../login.store';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgtDestroyedService]
})
export class RobotComponent implements OnInit {
  robot$ = this.gltfLoaderService.load('assets/RobotExpressive.glb');

  states = [
    'Idle',
    'Walking',
    'Running',
    'Dance',
    'Death',
    'Sitting',
    'Standing',
  ];
  emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];

  animationMixer?: AnimationMixer;

  #actions: Record<string, AnimationAction> = {};
  #activeAction?: AnimationAction;
  #previousAction?: AnimationAction;

  constructor(private gltfLoaderService: NgtGLTFLoaderService, private loginStore: LoginStore, private destroyed: NgtDestroyedService) {
  }

  ngOnInit() {
    this.loginStore.status$.pipe(takeUntil(this.destroyed)).subscribe(status => {
      switch (status) {
        case 'pending':
          this.fadeToAction('Walking');
          break;
        case 'authenticating':
          this.fadeToAction('Running');
          break;
        case 'success':
          this.fadeToAction('ThumbsUp');
          break;
        case 'error':
          this.fadeToAction('Death');
          break;
      }
    });
  }

  onReady(model: Group, animations: AnimationClip[]) {
    this.animationMixer = new AnimationMixer(model);

    model.traverse((child) => {
      if ((child as Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    for (const animation of animations) {
      const action = this.animationMixer.clipAction(animation);
      this.#actions[animation.name] = action;

      if (
        this.emotes.indexOf(animation.name) >= 0 ||
        this.states.indexOf(animation.name) >= 4
      ) {
        action.clampWhenFinished = true;
        action.loop = LoopOnce;
      }
    }

    this.#activeAction = this.#actions.Walking;
    this.#activeAction.play();
  }

  onAnimateReady({ delta }: NgtRender) {
    if (this.animationMixer) {
      this.animationMixer.update(delta);
    }
  }

  fadeToAction(state: string, duration: number = 0.5) {
    this.#previousAction = this.#activeAction;
    this.#activeAction = this.#actions[state];

    if (this.#previousAction !== this.#activeAction) {
      this.#previousAction?.fadeOut(duration);
    }

    this.#activeAction?.reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(duration)
      .play();
  }
}
