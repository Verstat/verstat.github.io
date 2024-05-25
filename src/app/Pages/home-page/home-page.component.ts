import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmailService } from '../../Services/email.service';
import { CommonModule } from '@angular/common';
import { IEmail } from '../../models/email';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [],
  template: `
    <div class="lg:h-max sm:h-48 flex items-center justify-center mt-8">
      <div class="max-w-2xl w-full px-4">
        <h1 class="text-4xl font-bold text-center lg:mb-8 sm:mb-2 text-black">
          Website is coming soon!
        </h1>
        <p class="text-lg text-gray-700 text-center lg:mb-12 sm:mb-6">
          Our website is under construction, but we are happy to offer you our
          services
        </p>
        <form
          [formGroup]="emailForm"
          (ngSubmit)="onSubmit()"
          class="flex flex-col md:flex-row justify-center items-start gap-4"
        >
          <div>
            <input
              formControlName="email"
              type="email"
              id="success"
              placeholder="Enter your email address"
              class="w-full md:w-80 py-2 px-4 rounded-lg border-2 border-black"
              (input)="onChanged()"
              [ngClass]="{
                'bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500':
                  emailForm.controls['email'].valid &&
                  emailForm.controls['email'].touched,
                'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500':
                  emailForm.controls['email'].invalid &&
                  emailForm.controls['email'].touched
              }"
            />
            <div
              *ngIf="(emailForm.touched && emailForm.invalid) || notification"
              class="text-red-500 mt-2 text-left pl-4"
            >
              <p *ngIf="emailForm.controls['email'].errors?.['required']">
                Email is required.
              </p>
              <p *ngIf="emailForm.controls['email'].errors?.['email']">
                Invalid email address.
              </p>
              <p *ngIf="notification">
                {{ notification }}
              </p>
            </div>
          </div>

          <button
            [disabled]="loading || emailForm.invalid"
            type="submit"
            [ngClass]="{
              'bg-gray-700 hover:bg-gray-800':
                emailForm.invalid && emailForm.controls['email'].touched
            }"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            @if(loading){
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading... } @else { Notify Me }
          </button>
        </form>
        <p class="text-xl text-gray-700 text-center lg:mt-12 sm:mt-6">
          Please find our capabilities below
        </p>
      </div>
    </div>
  `,
  styles: `
    
  `,
})
export class HomePageComponent {
  emailForm: FormGroup;
  loading: boolean = false;
  success: boolean = false;
  notification: string | undefined;
  lastSubmitTime: number | null = null;
  submitCooldown: number = 60000; // 1 min

  onChanged() {
    this.notification = undefined;
  }

  constructor(private emailService: EmailService, private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    console.log('submit');
    const currentTime = Date.now();

    const lastSubmitTimeStr = sessionStorage.getItem('lastSubmitTime');
    if (lastSubmitTimeStr) {
      this.lastSubmitTime = parseInt(lastSubmitTimeStr, 10);
    }

    if (
      this.lastSubmitTime &&
      currentTime - this.lastSubmitTime < this.submitCooldown
    ) {
      this.notification = `Please wait ${Math.ceil(
        (this.submitCooldown - (currentTime - this.lastSubmitTime)) / 1000
      )} seconds before submitting again.`;
      return;
    }

    this.loading = true;

    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;

      this.emailService
        .addEmail({ email })
        .then(() => {
          this.success = true;
          this.loading = false;
          this.emailForm.reset();
          this.notification = undefined;

          sessionStorage.setItem('lastSubmitTime', currentTime.toString());
          this.lastSubmitTime = currentTime;
        })
        .catch((error) => {
          this.notification = error;
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }
}
