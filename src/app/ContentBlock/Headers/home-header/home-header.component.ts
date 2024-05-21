import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <header>
      <div class="flex items-center justify-center w-full h-auto">
        <a routerLink="/" class="flex items-center">
          <div
            class="overflow-hidden sm:h-24 h-32 w-full flex items-start justify-center"
          >
            <div class="sm:hidden block">
              <img
                [ngSrc]="
                  baseUrl + '/assets/img/logo/Full-Logo-2-Colour-3_FNL.svg'
                "
                priority
                width="200"
                height="200"
                alt="Logo"
                class="-translate-y-10"
              />
            </div>
            <div class="sm:block hidden">
              <img
                [ngSrc]="
                  baseUrl +
                  '/assets/img/logo/Horizontal-Logo-1-2-Colour-3_FNL.svg'
                "
                priority
                width="500"
                height="500"
                alt="Logo"
                class="sm:-translate-y-48 -translate-y-48"
              />
            </div>
          </div>
        </a>
      </div>
    </header>
  `,
  styles: ``,
})
export class HomeHeaderComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  ngOnInit() {}
}
