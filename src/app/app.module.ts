import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {routes} from "./app-routing.module";
import {AppComponent} from './app.component';
import {SignInComponent} from './view/user/sign-in/sign-in.component';
import {SignUpComponent} from './view/user/sign-up/sign-up.component';
import {HomeComponent} from './view/home/home.component';
import {ToolbarComponent} from './shared/component/toolbar/toolbar.component';
import {InputComponent} from './shared/component/input/input.component';
import {ButtonComponent} from './shared/component/button/button.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from "@angular/material/list";
import {MessageComponent} from './shared/component/modal/message/message.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ModalService} from "./shared/component/modal/modal.service";
import {ErrorInterceptor} from "./exception/error-interceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SpinnerComponent } from './shared/component/spinner/spinner.component';

@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        SignUpComponent,
        HomeComponent,
        ToolbarComponent,
        InputComponent,
        ButtonComponent,
        MessageComponent,
        SpinnerComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule,
        HttpClientModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatDialogModule,
        HttpClientModule,
        MatProgressSpinnerModule
    ],
    providers: [
        ModalService,
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
