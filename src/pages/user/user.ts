import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {FirebaseObjectObservable} from "angularfire2/database-deprecated";
import { Profile } from '../../app/models/profile';
import { HomePage } from '../home/home';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ProfilePage } from '../profile/profile';


@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  profileData: AngularFireObject<Profile>

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase, private toast: ToastController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
      this.toast.create({
        message: `Service Plus, ${data.email}`,
        duration: 3000,
      }).present();

    this.profileData = this.afDatabase.object(`Perfil de:/${data.uid}`)

    }
    else {
      this.toast.create({
        message: `Service Plus, ${data.email}`,
        duration: 3000
      }).present();        
    }
   })
  }
   
  goProfile(){
    this.navCtrl.setRoot(ProfilePage);
  }
 
}
