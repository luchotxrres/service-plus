import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage} from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(private streamingMedia: StreamingMedia, public navCtrl: NavController, public toastCtrl: ToastController) {
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottomy'
    });
    toast.present();
  }
  startVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { 
        this.presentToast("El video finalizó")
        console.log('Finished Video') },
      errorCallback: (e) => { 
        this.presentToast("Erorr")
        console.log('Error: ', e) },
    };
 
    // http://www.sample-videos.com/
    this.streamingMedia.playVideo('https://youtu.be/-VdZRGsKZn4', options);
  }
 
  startAudio() {
    let options: StreamingAudioOptions = {
      successCallback: () => {
        this.presentToast("La prueba de sonido finalizó") 
        console.log('Finished Audio') },
      errorCallback: (e) => { 
        this.presentToast("Error")
        console.log('Error: ', e) },
      initFullscreen: false // iOS only!
    };
 
    //http://soundbible.com/2196-Baby-Music-Box.html
    this.streamingMedia.playAudio('http://soundbible.com/grab.php?id=2196&type=mp3', options);
  }
 
  stopAudio() {
    this.streamingMedia.stopAudio();
  }
 
 }
  
