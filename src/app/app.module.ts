import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from "../app/app.firebase.config";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';
import { Camera } from '@ionic-native/camera';
import { ImgPage } from '../pages/img/img';
import { AcercaPage } from '../pages/acerca/acerca';
import { StreamingMedia } from '@ionic-native/streaming-media';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    UserPage,
    ImgPage,
    AcercaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    UserPage,
    ImgPage,
    AcercaPage
  ],
  providers: [
    StreamingMedia,
    StatusBar,
    SplashScreen,
    Facebook,
    Camera,  
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
