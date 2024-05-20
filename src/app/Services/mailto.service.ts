import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MailtoService {
  constructor() {}

  generateMailtoLink(recipient: string, subject: string, body: string): string {
    return `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }
}
