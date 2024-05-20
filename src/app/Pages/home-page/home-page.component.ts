import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  template: `
      <div class="lg:h-96 sm:h-48 flex items-center justify-center">
        <div class="max-w-2xl w-full px-4">
          <h1 class="text-4xl font-bold text-center lg:mb-8 sm:mb-2 text-black">Coming Soon!</h1>
          <p class="text-lg text-gray-700 text-center lg:mb-12 sm:mb-6">Our website is under construction. We'll be back soon!
          </p>
          <form class="flex flex-col md:flex-row justify-center items-center gap-4">
            <input class="w-full md:w-80  py-2 px-4 border text-gray-800  border-gray-200 dark:border-gray-600 bg-white" type="email" placeholder="Enter your email address">
            <button class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 border">Notify Me</button>
          </form>
        </div>
      </div>

  `,
  styles: ``
})
export class HomePageComponent {

}
