import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { AuthGuard } from './app/auth.guard';
import { provideRouter, Routes } from '@angular/router';
import { InMomoryDataService } from './app/in-momory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import("./app/pokemon/pokemon.routes"),
    },
    {
        path: 'login',
        loadComponent: () => import("./app/login/login.component").then((module) => module.LoginComponent),
    },
    {
        path: '**',
        loadComponent: () => import("./app/page-not-found/page-not-found.component").then((module) => module.PageNotFoundComponent),
    },
];


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(BrowserModule, FormsModule, HttpClientInMemoryWebApiModule.forRoot(InMomoryDataService, {
            dataEncapsulation: false,
        })),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));
