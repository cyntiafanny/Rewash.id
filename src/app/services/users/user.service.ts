import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from './user';
import {emailVerified} from '@angular/fire/auth-guard';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private dbPath = '/users';
  usersRef: AngularFireList<User> = null;
  dbRef: any;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }

  /* After user sign up, create new reference to that user in DB */
  create(user: any): any {
    const { uid , providerData } = user;
    console.log('===uid', uid);
    console.log('===email', providerData[0].email);
    this.dbRef = this.db.database.ref().child('users');
    console.log('===this.dbRef', this.dbRef);
    this.dbRef.child(`${uid}`).set({
      email: providerData[0].email
    });
  }
}
