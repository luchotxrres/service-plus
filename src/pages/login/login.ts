import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../app/models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ProfilePage } from '../profile/profile';

 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  
  user = {} as User;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public toastCtrl: ToastController) {
  }

  pass(){
    alert("...")
    console.log("Forgot Password")
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Espere por favor...",
      duration: 1000
    });
    loader.present();
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  async login(user: User){
    
    this.presentLoading();    

    try {
      const result =  await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      
      if (result)  {
      this.navCtrl.setRoot('ProfilePage');
      console.log(result);
      }        
    }    

  catch (e) {
    this.presentToast("El correo electronico o la contraseña son incorrectas")
    console.log("EL correo electronico o la contraseña son incorrectas");
   }
   
  }
  
  register(){
    this.navCtrl.push('RegisterPage')
  }

}
