import { Component } from '@angular/core';
import { InitializeKit } from '../lucius/extensions';
import { initializeLucius } from '../lucius/lucius';
import { LuciusComponent } from '../lucius/lucius.component';
@Component({
  standalone: true,
  imports: [LuciusComponent],
  template: `
    <button (click)="clo()">purple</button>
    <div class="mx-auto mt-10 max-w-2xl rounded bg-slate-100 p-4">
      <ge-lucius [lucius]="lucius"></ge-lucius>
    </div>
  `,
})
export class PageComponent {
  protected lucius = initializeLucius({
    extensions: [InitializeKit],
  });

  protected clo() {
    this.lucius.editor.chain().focus().setColor('#958DF1').run();
  }
}
