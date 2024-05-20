import { Component } from '@angular/core';
import {HomeFooterComponent} from "../../ContentBlock/Footers/home-footer/home-footer.component";
import {HomeHeaderComponent} from "../../ContentBlock/Headers/home-header/home-header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [HomeFooterComponent, HomeHeaderComponent, RouterOutlet],
  template: `
    <div class="flex flex-col min-h-dvh">
      <app-home-header/>
      <main class="grow">
        <router-outlet class="h-full"/>
      </main>
      <app-home-footer/>
    </div>
  `,
  styles: ``
})
export class HomeLayoutComponent {

}
