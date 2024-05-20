import {Component, HostListener, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <header>
      <div class="flex items-center justify-center w-full h-auto">
        <a routerLink="/" class="flex items-center">
          <div class="overflow-hidden sm:h-24 h-32 w-full flex items-start justify-center">
            @if (isSmall)
            {
              <img ngSrc="../../../../assets/img/logo/Full-Logo-2-Colour-3_FNL.svg" priority width="200" height="200" alt="Logo" class="-translate-y-10 "/>
            } @else {
              <img ngSrc="../../../../assets/img/logo/Horizontal-Logo-1-2-Colour-3_FNL.svg" priority width="500" height="500" alt="Logo" class="sm:-translate-y-48 -translate-y-48"/>
            }
          </div>
        </a>
      </div>
    </header>
  `,
  styles: ``
})
export class HomeHeaderComponent implements OnInit {
  isSmall: boolean = false;
  ngOnInit() {
    this.updateLogoPath(window.innerWidth);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const target = event.target as Window;
    this.updateLogoPath(target.innerWidth);
  }

  updateLogoPath(width: number): void {
    this.isSmall = width < 640;
  }
}
