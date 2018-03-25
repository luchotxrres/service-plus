import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from "../../app/models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private toastCtrl: ToastController) {
  }


  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }


  async register(user: User){
    try {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    this.presentToast("Usuario Registrado Satisfactoriamente")
    console.log(result);
    }
    catch (e) {
      this.presentToast("Error")      
      console.error(e);
    }  
  } 
}
