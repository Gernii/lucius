import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import '../styles.css';
@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'ge-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {}
