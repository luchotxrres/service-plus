import { Component, ViewChild, Inject } from '@angular/core';
import { Platform, Nav, IonicPage} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { UserPage } from '../pages/user/user';
import { ImgPage } from '../pages/img/img';
import { AcercaPage } from '../pages/acerca/acerca';
import { AngularFireAuth } from 'angularfire2/auth';
import { IonicApp } from 'ionic-angular/components/app/app-root';
import { Ion } from 'ionic-angular/components/ion';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav;
  
  // rootPage:any = HomePage;

  public rootPage: any;
  public pages: Array<{titulo: string, component: any, icon: string}>;

  constructor(@Inject(Platform) platform, statusBar: StatusBar, splashScreen: SplashScreen, private faAuth: AngularFireAuth,public ionic: IonicApp) {
    
    this.rootPage = LoginPage;
    this.pages = [
      {titulo: 'Inicio',      component: HomePage, icon:'home'},
      {titulo: 'Mis Datos',   component: UserPage, icon:'contact'},
      {titulo: 'Imagenes',    component: ImgPage, icon:'images'},
      {titulo: 'Acerca de',   component: AcercaPage, icon:'information-circle'},
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  } 

  goToPage(page){
    this.nav.setRoot(page);
  }

  logOut(){
    alert("Gracias vuelva Pronto");
    console.log("Sesión Cerrada");
  }
        
}

 
//   goHome(){
//     this.nav.push(HomePage)
//     this.rootPage(HomePage)
//   }

//    goImagenes(){
//      this.nav.push(ImgPage)
//    }

//   goDatos(){
//     this.nav.push(UserPage)
//   }

// }

