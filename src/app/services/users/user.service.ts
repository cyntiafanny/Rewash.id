import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, snapshotChanges} from '@angular/fire/database';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private dbPath = '/users';
  usersRef: AngularFireList<User> = null;
  dbRef: any;
  loggedInUser: User;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }

  /* After user sign up, create new reference to that user in DB */
  create(user: any): any {
    const { uid , providerData } = user;
    // console.log('===uid', uid);
    // console.log('===email', providerData[0].email);
    this.dbRef = this.db.database.ref().child('users');
    // console.log('===this.dbRef', this.dbRef);
    this.dbRef.child(`${uid}`).set({
      email: providerData[0].email
    });
  }

  setLoggedInUser(data: any) {
    const { uid, email } = data;
    this.loggedInUser = new User();
    this.dbRef = this.db.database.ref('users/' + uid).once('value').then((dataSnapshot) => {
      // console.log('===dataSnapshot', dataSnapshot.val());
      this.loggedInUser.id = uid;
      this.loggedInUser.name = dataSnapshot.val().fullName || '';
      this.loggedInUser.email = dataSnapshot.val().email || email;
      this.loggedInUser.address = dataSnapshot.val().address || [];
      this.loggedInUser.imageUrl = dataSnapshot.val().imageUrl || [];
    });
    console.log('===this.loggedInUser', this.loggedInUser);
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }
}
