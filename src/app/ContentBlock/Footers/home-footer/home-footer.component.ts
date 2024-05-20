import {Component, OnInit} from '@angular/core';
import {MailtoService} from "../../../Services/mailto.service";

@Component({
  selector: 'app-home-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="z-50">
      <div
        class="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-8 lg:px-4"
      >
        <div
          class="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:col-span-2 lg:grid-cols-4 md:grid-cols-2"
        >
          <!--Precision machining-->
          <div>
            <p class="font-medium whiteModeText">Precision machining</p>
            <ul class="mt-6 space-y-4 text-sm">
              <li>
                <p class="whiteModeText">
                  3 axes CNC milling (50”/20”/25”)
                </p>
              </li>
              <li><p class="whiteModeText">
                5 axes CNC milling (D14”/H12”)
              </p></li>
              <li><p class="whiteModeText">
                CNC turning (D 11” L50”)
              </p></li>
              <li><p class="whiteModeText">
                Cylindrical OD&ID grinding (D12” L40”)
              </p></li>
            </ul>
          </div>
          <!--Engineering design-->
          <div>
            <p class="font-medium whiteModeText">Engineering design</p>
            <ul class="mt-6 space-y-4 text-sm">
              <li>
                <p class="whiteModeText">
                  Equipment design to specification
                </p>
              </li>
              <li> <p class="whiteModeText">
                Reverse design
              </p></li>
              <li><p class="whiteModeText">
                Design for repair needs
              </p></li>
            </ul>
          </div>
          <!--Welding to various specifications-->
          <div>
            <p class="font-medium whiteModeText">Welding to various specifications</p>
            <ul class="mt-6 space-y-4 text-sm">
              <li>
                <p class="whiteModeText">
                  Process: MIG, TIG, Laser
                </p>
              </li>
              <li><p class="whiteModeText">
                Materials: Aluminum, Stainless Steel, Titanium, Copper, Brass, High Carbon Steel, Alloy Steel.
              </p></li>
              <li><p class="whiteModeText">
                Welders: CWB and Red Seal certified.
              </p></li>
              <li><p class="whiteModeText">
                Cylindrical OD&ID grinding (D12” L40”)
              </p></li>
            </ul>
          </div>
          <!--Contact us-->
          <div>
            <p class="font-medium whiteModeText">Contact us</p>
            <ul class="mt-6 space-y-4 text-sm">
              <li>
                <a
                  [href]="mailtoUrl"
                  class="text-black cursor-pointer underline">
                  office&#64;verstat.ca
                </a>
              </li>
              <li><p class="whiteModeText">
                (647)-632-7606
              </p></li>
              <li><p class="whiteModeText">
                418 Hanlan Rd, Unit 32
              </p></li>
              <li><p class="whiteModeText">
                Woodbridge, ON L4L 4Z1
              </p></li>
            </ul>
          </div>

          <p class="text-xs whiteModeText">
            Made proudly with love by
            <a href="https://www.dvigunity.com/" target="_blank" class="underline text-blue-500">Dvigunity</a>
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: `
  .whiteModeText{
    color: black;
    cursor: default;
  }
  `
})
export class HomeFooterComponent implements OnInit {
  recipient: string = 'info@example.com';
  subject: string = 'Feedback';
  body: string = 'I would like to give feedback...';
  mailtoUrl: string = '';

  constructor(private mailtoService: MailtoService) {}

  ngOnInit() {
    this.updateMailtoUrl();
  }

  updateMailtoUrl() {
    this.mailtoUrl = this.mailtoService.generateMailtoLink(this.recipient, this.subject, this.body);
  }
}
