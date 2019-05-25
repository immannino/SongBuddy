import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StateService } from 'src/lib/service/state.service';
import { AppRoutingModule } from './app-routing.module';
import { SafeUrlPipe } from 'src/lib/utils/safeurl.pipe';
import { AppConfig } from './app.config';
import { SpotifyService } from 'src/lib/service/spotify.service';
import { TrackDetailsComponent } from './dashboard/components/track-details/track-details.component';
import { DesignerComponent } from './dashboard/components/designer/designer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TrackDetailsComponent,
    DesignerComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    StateService,
    SpotifyService,
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
