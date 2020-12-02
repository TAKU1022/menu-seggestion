import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ImageCroppedEvent, Dimensions } from 'ngx-image-cropper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  private userId: string = this.authService.userId;

  user$: Observable<User> = this.authService.user$;
  imageChangedEvent: any;
  croppedImage: string;
  nameForm = new FormControl('', [
    Validators.required,
    Validators.maxLength(25),
  ]);

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  changeUserName(): Promise<void> {
    const newUserName = this.nameForm.value;
    return this.userService
      .changeUserName(this.userId, newUserName)
      .then(() => {
        this.snackBar.open('変更されました', null);
        this.nameForm.reset();
      })
      .catch(() => {
        this.snackBar.open('変更に失敗しました', null);
      });
  }

  changeFileEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  cropImage(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  failLoadImage(selectedImage): void {
    alert('画像の読み込みに失敗しました');
    selectedImage.value = '';
    this.imageChangedEvent = null;
  }

  resetImage(selectedImage): void {
    selectedImage.value = '';
    this.imageChangedEvent = null;
    this.croppedImage = '';
  }

  changeUserAvater(selectedImage): Promise<void> {
    return this.userService
      .changeUserAvater(this.userId, this.croppedImage)
      .then(() => {
        this.snackBar.open('変更されました', null);
        selectedImage.value = '';
        this.imageChangedEvent = null;
      })
      .catch(() => {
        this.snackBar.open('変更に失敗しました', null);
      });
  }
}
