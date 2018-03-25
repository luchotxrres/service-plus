import { Component } from '@angular/core';
import { NavController,  ToastController, MenuController, ActionSheetController, AlertController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import * as firebase from 'firebase';
// import 'whatwg-fetch';

@Component({
  selector: 'page-img',
  templateUrl: 'img.html'
})


export class ImgPage {
  
  public photos: any;
  public base64Image: string;


  constructor(public navCtrl: NavController, public toastCtrl: ToastController , public camera: Camera , public  menuCtrl: MenuController, public actSheet: ActionSheetController, public alert: AlertController,) {
  
  }

  ngOnInit() {
    this.photos = [];
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  deletePhoto(index){
    let confirm = this.alert.create({
      title: '¿Estas seguro que queres eliminar esta imagen?',
      message: '',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.photos.splice(index,1);
          }
        }
      ]
    });
    confirm.present();
  }

  openGallery(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetHeight:1000,
      targetWidth:1000,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }).then((imageData) => {
      this.base64Image = `data:image/jpeg;base64,${imageData}`;
      this.photos.push(this.base64Image);
    }).catch(error => {
      this.presentToast('Error inesperado al abrir su galeria');
      console.log(error);
    })
  }


  makeFileBlob(_imageData){
    return fetch(_imageData).then((_response) =>{
      return _response.blob();
    }).then((_blob)=>{
      return _blob;
    });
  }
  

  uploadToFirebase(_imageBlob){
    var fileName = 'imagen-'+new Date().getTime() + '.jpeg';

    return new Promise((resolve, reject) => {
      var fileRef = firebase.storage().ref('images/' + fileName);

      var uploadTask = fileRef.put(_imageBlob);

      uploadTask.on('state_changed',(_snapshot) => {
      
      this.presentToast("Guardando" + _snapshot);

      }, (_error) => {
        reject(_error);
      }, () => {
        resolve(uploadTask.snapshot);
      });
    });
  }

  saveToDatabaseAssetList(_uploadSnapshot){
    var ref = firebase.database().ref('assets');

    return new Promise((resolve, reject)=>{
      var dataToSave = {
        'URL': _uploadSnapshot.downloadURL,
        'name': _uploadSnapshot.metadata.name,
        'owner': firebase.auth().currentUser.email,
        'lastUpdated': new Date().getTime(),
      };
   
      ref.push(dataToSave, (_response) => {
        resolve(_response);
      }).then((_error) => {
        reject(_error);
      });
    })
  }

   getPicture(){
     this
     .camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType : this.camera.PictureSourceType.CAMERA,
      targetHeight: 600,
      quality: 85,
      correctOrientation: true
     })
     .then(_imageData => {
       this.base64Image = `data:image/jpeg;base64,` + _imageData;
       this.photos.push(this.base64Image);
       return this.makeFileBlob(_imageData);
     }).then((_imageBlob)=>{
        this.uploadToFirebase(_imageBlob)
      }).then((_uploadSnapshot: any)=>{
      this.presentToast("Archivo guardado Correctamente" + _uploadSnapshot.downloadURL);
      this.saveToDatabaseAssetList(_uploadSnapshot)


    }).then((_uploadSnapshot: any)=>{
      this.presentToast("Archivo guardado en carpeta satisfactoriamente");

     },(_error) => {
       alert('error' + _error.message);
     });
   }  

    actionSheet() {
    let actionSheet = this.actSheet.create({
      title: 'Elija una opción',
      buttons: [
        {
          text: 'Cámara',
          icon:'camera',
          handler: () => {
            this.getPicture();
          }
        },
        {
          text: 'Galeria de Imagenes',
          icon:'images',
          handler: () => {
            this.openGallery();
           console.log('Se seleccion galeria');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon:'close',
          handler: () => {
 
            console.log('Se selecciono cancelar');
          }
        }
      ]
    });
 
    actionSheet.present();
 
  }

 }
  


   //  async getPicture(){
    
  //        try {
          
  //        let options: CameraOptions = {
  //          destinationType: this.camera.DestinationType.DATA_URL,
  //          targetWidth: 1000,
  //          targetHeight: 1000,
  //          quality: 100,
  //          encodingType: this.camera.EncodingType.JPEG,
  //          mediaType: this.camera.MediaType.PICTURE,
  //          correctOrientation: true
  //        }
  //        const result = await this.camera.getPicture(options);
    
  //        const image = `data:image/jpeg;base64,${result}`;
    
  //        const pictures = storage().ref('fotos/myPhoto');
  //        pictures.putString(image, 'data_url');
  //      }
  //        catch(e){
  //          this.presentToast('Ha ocurrido un error');    
  //          console.error(e);
  //        }
  //      }
  //  async getPicture(){
    
  //        try {
          
  //        let options: CameraOptions = {
  //          destinationType: this.camera.DestinationType.DATA_URL,
  //          targetWidth: 1000,
  //          targetHeight: 1000,
  //          quality: 100,
  //          encodingType: this.camera.EncodingType.JPEG,
  //          mediaType: this.camera.MediaType.PICTURE,
  //          correctOrientation: true
  //        }
  //        const result = await this.camera.getPicture(options);
    
  //        const image = `data:image/jpeg;base64,${result}`;
    
  //        const pictures = storage().ref('fotos/myPhoto');
  //        pictures.putString(image, 'data_url');
  //      }
  //        catch(e){
  //          this.presentToast('Ha ocurrido un error');    
  //          console.error(e);
  //        }
  //      }
