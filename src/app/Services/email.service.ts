import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { IEmail } from '../models/email';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private dbPath = '/emails';
  emailsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.emailsRef = db.list(this.dbPath);
  }

  addEmail(email: IEmail): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.database
        .ref(this.dbPath)
        .orderByChild('email')
        .equalTo(email.email)
        .once('value', (snapshot) => {
          const exists = snapshot.exists();
          if (!exists) {
            this.emailsRef
              .push(email)
              .then(() => resolve())
              .catch((error) => reject(error));
          } else {
            reject('Email already registered');
          }
        });
    });
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.db
      .list<IEmail>(this.dbPath, (ref) =>
        ref.orderByChild('email').equalTo(email)
      )
      .valueChanges()
      .pipe(map((emails) => emails.length > 0));
  }
}
