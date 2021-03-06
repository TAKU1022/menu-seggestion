import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '@interfaces/user';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {}

  completeTutorial(tutorial: string, userId: string): Promise<void> {
    const userDocument: AngularFirestoreDocument<User> = this.db.doc<User>(
      `users/${userId}`
    );
    if (tutorial === 'create-my-menu') {
      return userDocument.update({ isCompletedCreateMyMenuTutorial: true });
    } else if (tutorial === 'home') {
      return userDocument.update({ isCompletedHomeTutorial: true });
    }
  }

  changeUserIsCreatedMyMenu(userId: string): Promise<void> {
    return this.db.doc<User>(`users/${userId}`).update({
      isCreatedMyMenu: true,
    });
  }

  changeUserName(userId: string, name: string): Promise<void> {
    return this.db.doc<User>(`users/${userId}`).update({
      name,
    });
  }

  async changeUserAvater(userId: string, message: string): Promise<void> {
    const result = await this.storage
      .ref(`users/${userId}`)
      .putString(message, 'data_url');
    const avaterURL = await result.ref.getDownloadURL();
    return this.db.doc<User>(`users/${userId}`).update({
      avaterURL,
    });
  }

  initializeUserIsEatenFood(userId: string): Promise<void> {
    return this.db.doc<User>(`users/${userId}`).update({
      isEatenBreakfast: false,
      isEatenLunch: false,
      isEatenDinner: false,
    });
  }

  changeUserIsEatenFood(
    userId: string,
    time: string,
    isEaten: boolean
  ): Promise<void> | void {
    switch (time) {
      case 'morning':
        return this.db.doc<User>(`users/${userId}`).update({
          isEatenBreakfast: isEaten,
        });
      case 'noon':
        return this.db.doc<User>(`users/${userId}`).update({
          isEatenLunch: isEaten,
        });
      case 'night':
        return this.db.doc<User>(`users/${userId}`).update({
          isEatenDinner: isEaten,
        });
      default:
        return alert('失敗');
    }
  }

  changeEatCount(userId: string, eatCount: number): Promise<void> {
    return this.db.doc<User>(`users/${userId}`).update({
      eatCount,
    });
  }

  getUserbyId(userId: string): Observable<User> {
    return this.db.doc<User>(`users/${userId}`).valueChanges();
  }

  async deleteUser(): Promise<void> {
    const user: firebase.User = await this.afAuth.currentUser;
    const googleAuthProvider: auth.GoogleAuthProvider = new auth.GoogleAuthProvider();
    return user
      .reauthenticateWithPopup(googleAuthProvider)
      .then(() => {
        return user.delete();
      })
      .catch((error) => {
        alert(error);
      });
  }

  changeUserPostCount(userId: string, postCount: number): Promise<void> {
    return this.db.doc<User>(`users/${userId}`).update({
      postCount,
    });
  }
}
