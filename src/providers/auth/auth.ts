import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import firebase from 'firebase/app';
import { userProfile } from '../../models/user-profile';
import { teamProfile } from '../../models/team-profile';

@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth,
    public fireStore: AngularFirestore
  ) {
    
  }

  loginUser(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
  
  async createAdminUser(email: string, password: string): Promise<firebase.User> {
    try {  
      const adminUser: firebase.User = await this.afAuth.auth.
      createUserWithEmailAndPassword(email, password);

      const userProfileDocument: AngularFirestoreDocument<userProfile> = this.fireStore.doc(`userProfile/${adminUser.uid}`);

      await userProfileDocument.set({
        id: adminUser.uid,
        email: adminUser.email,
        teamAdmin: true,
        teamId: adminUser.uid
      });

      const teamProfile: AngularFirestoreDocument<teamProfile> = this.fireStore.doc(`teamProfile/${adminUser.uid}`);

      await teamProfile.set({
        id: adminUser.uid,
        teamAdmin: adminUser.uid,
        groceryList: null
      });

        return adminUser;
    } catch (error) {
      console.log(error);
    }
  }

  createRegularUser(email: string): Promise<any> {
    const teamAdmin: firebase.User = this.afAuth.auth.currentUser;
    const userCollection: AngularFirestoreCollection<any> = this.fireStore.collection(`teamProfile/${teamAdmin.uid}/teamMemberList`);

    const id: string = this.fireStore.createId();

    const regularUser = {
      id: id,
      email: email,
      teamId: teamAdmin.uid
    };

    return userCollection.add(regularUser);
  }
}
