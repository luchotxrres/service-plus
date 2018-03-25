import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../app/models/profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { HomePage } from '../home/home';
  
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage{

  picData: any;
  picUrl: any;
  myPic: any;

  profile = {} as Profile;

  public photos: any;
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth,
  private afDatabase: AngularFireDatabase, private camera: Camera, private loadingCtrl: LoadingController,
  private toastCtrl: ToastController) {
  
    this.myPic = firebase.storage().ref('/')

  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }


  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Espere por favor...",
      duration: 3000
    });
    loader.present();
  }

  createPerfil(){
      this.afAuth.authState.take(1).subscribe(auth => {
        this.presentLoading()
        this.afDatabase.object(`Perfil de/${auth.uid}`).set(this.profile)
          .then(() => this.navCtrl.setRoot('HomePage'));
      }) 
  }

  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 85
    }
    this
    .camera.getPicture( options )
    .then(imageData => {
      this.base64Image = `data:image/jpeg;base64,` + imageData;
      this.photos.push(this.base64Image);
    })
    .catch(error =>{
      this.presentToast('Error inesperado al abrir la cámara');    
      console.error( error );
    });
  }  
  }


