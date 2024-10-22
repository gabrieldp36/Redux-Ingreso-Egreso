import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  public usuarioAutenticado: Usuario|null = null;
  public authSubscription!: Subscription;

  public constructor( private store:Store<AppState> ) {};
 
  public ngOnInit(): void {
    this.authSubscription = this.store.select('auth').subscribe( usuarioAuth => this.usuarioAutenticado = usuarioAuth.usuario );
  };

  public ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  };
}
