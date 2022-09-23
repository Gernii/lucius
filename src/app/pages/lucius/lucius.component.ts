import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Content } from '@tiptap/core';
import { Lucius } from '../lucius/lucius';

@Component({
  standalone: true,
  selector: 'ge-lucius',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      #container
      spellcheck="false"
      autocapitalize="off"
      class="prose-slate max-w-none"
    ></div>
  `,
  styleUrls: ['./lucius.component.css'],
})
export class LuciusComponent implements OnInit {
  @ViewChild('container', { static: true })
  private elementRef?: ElementRef;

  @Input() lucius?: Lucius;

  @Input() set content(content: Content) {
    this.lucius?.updateContent(content);
  }

  ngOnInit() {
    const element = this.elementRef?.nativeElement;
    if (!element) return;

    this.attachElement(element);
  }

  private attachElement(element: HTMLElement) {
    if (!this.lucius) return;
    this.lucius.attach(element);
  }
}
