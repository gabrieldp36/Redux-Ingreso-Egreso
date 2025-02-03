// Módulos.
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './store/app.reducer';

// Firebase.
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Cambiar el Locale de la app.
import { registerLocaleData } from '@angular/common';
import localesAR from '@angular/common/locales/es-AR';
registerLocaleData(localesAR);

// Componentes.
import { AppComponent } from './app.component';

// Enviroments.
import { environment } from '../environments/environment';

@NgModule({
  
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
  ],

  providers: [
    provideFirebaseApp(() => initializeApp( environment.firebaseConfig) ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    { provide: LOCALE_ID, useValue: 'es-AR' },
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
