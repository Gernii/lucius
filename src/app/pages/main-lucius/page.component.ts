import { Component } from '@angular/core';

@Component({
  standalone: true,

  template: `
    <div
      #container
      spellcheck="true"
      autocapitalize="off"
      class="prose"
      class=""
    ></div>
  `,
})
export class PageComponent {}
