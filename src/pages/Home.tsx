import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import { isPlatform } from '@ionic/react';
import classNames from 'classnames';
import {desktopUpdater, restartApp} from '../js/desktopUpdater';
import styles from './Home.module.css';

const Home: React.FC = () => {
  
  const [hidden, setHidden] = useState(true);

  // Hide notification box on close button
  const onCloseNotificationBox = () => {
    console.log('Close notification box');
    setHidden(true);
  };
  const onRestartDesktopApp = () => {
    console.log('Restart app');
    restartApp();
  };
  
  useIonViewDidEnter(async () => {    
    if (isPlatform('electron')) {
      // Call electron updater
      desktopUpdater();
    }
  });  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PILOT</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Crossplatform Pilot-test application 
        <p id="version"></p>    
        <div id="notification" className={classNames(styles.notification, hidden ? styles.hidden : '')}>
          <p id="message"></p>
          <IonButton id="close-button" color="primary" onClick={onCloseNotificationBox}>Close</IonButton>
          <IonButton id="restart-button" color="secondary" onClick={onRestartDesktopApp} className={styles.hidden}>Restart</IonButton>
        </div>        
      </IonContent>
    </IonPage>
  );
};

export default Home;