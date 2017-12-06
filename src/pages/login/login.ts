import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavParams,
  NavController,
  Alert,
  AlertController,
  Loading,
  LoadingController
} from 'ionic-angular';
import { 
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    formBuilder: FormBuilder
  ) {

    this.loginForm = formBuilder.group({
      email: [
        '', Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    })
  }

  ionViewDidLoad() {
  }

  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }

  goToPasswordReset(): void {
    this.navCtrl.push('PasswordResetPage');
  }

  async loginUser(): Promise<any> {
    if (!this.loginForm.valid) {
      console.log("Form not ready")
    } else {
      let loading: Loading = this.loadingCtrl.create();
      loading.present();

      const email: string = this.loginForm.value.email;
      const password: string = this.loginForm.value.password;

      try {
        await this.authProvider.loginUser(email, password);
        await loading.dismiss();
        this.navCtrl.setRoot(TabsPage);
      } catch (error) {
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{text: 'Ok', role: 'cancel'}]
        });
        alert.present();
      }
    }
  }
}
