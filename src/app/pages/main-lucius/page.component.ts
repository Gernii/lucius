import { Component } from '@angular/core';
import { initializeLucius } from '../lucius/lucius';
import { LuciusComponent } from '../lucius/lucius.component';
import StarterKit from '@tiptap/starter-kit';
@Component({
  standalone: true,
  imports: [LuciusComponent],
  template: ` <ge-lucius [lucius]="lucius"></ge-lucius> `,
})
export class PageComponent {
  protected lucius = initializeLucius({
    extensions: [StarterKit],
  });
}
