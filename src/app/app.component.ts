import { Component } from '@angular/core';

import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Subjects',
      url: '/home',
      icon: 'home'
    },
    // {
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
       private fcm: FCM,
    private router: Router,

    // private firebase: Firebase,
                private afs: AngularFirestore,
                private toastController :ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup(); 
    });
  }
   private notificationSetup() {
    this.getToken();
    this.onNotifications().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
//this.presentToast(msg.aps.alert);
        } else {
          console.log('on notify', msg)
           if (msg.wasTapped) {
          console.log('Received in background');
        //  this.router.navigate(['/tabs/tab1/profile', msg.price]);
         //  this.router.navigate(['/tabs/tab2']);
        }

        
        // this.presentToast(msg.body);

        }
      });
  }
   onNotifications() {
    return this.fcm.onNotification();
   // return this.firebase.onNotificationOpen();
  }
  async getToken() {
    let token;

    if (this.platform.is('android')) { 
      token = await this.fcm.getToken();
    }

    // if (this.platform.is('ios')) {
    //   token = await this.fcm.getToken();
    //   await this.fcm.grantPermission();
    // }

    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices');
    console.log('device', devicesRef)
    const data = {
      token,
      userId: 'kamalms'
    };

    return devicesRef.doc(token).set(data);
  }
}
