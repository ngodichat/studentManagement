import { SessionService } from "./services/sessions/session.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule} from "@angular/core";
import { enableProdMode } from "@angular/core";

// Modules
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

// Services
import { AuthService } from "./services/auth/auth.service";
import { UserService } from "./services/user/user.service";
import { StudentService } from "./services/student/student.service";

// Pipes
import { FilterPipe } from "./pipes/filter.pipe";
import { PhonePipe } from "./pipes/phone.pipe";
import { DatePipe, DecimalPipe } from "@angular/common";

// Components
import { AppComponent } from "./components/index/app.component";
import { StudentListComponent } from "./components/student/list/student-list.component";
import { StudentDetailsComponent } from "./components/student/details/student-details.component";
import { StudentAddComponent } from "./components/student/add/student-add.component";
import { LoginComponent } from "./components/login/login.component";
import {
  HomeComponent,
  homeChildRoutes
} from "./components/home/home.component";
import { HighlightStudentDirective } from "./directives/highlight-student.directive";

// Material package
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatFormFieldModule
} from "@angular/material";

import {
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from "@angular/material/core";

import { MomentDateAdapter } from "@angular/material-moment-adapter";
// Pagination
import { NgxPaginationModule } from "ngx-pagination";
import { SessionListComponent } from "./components/sessions/list/session-list.component";

// Parent Routes
const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: homeChildRoutes,
    canActivate: [AuthService]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

// Custom Date Format
import * as _moment from "moment";
import { MyNumberPipe } from './pipes/my-number.pipe';
// import { default as _rollupMoment } from "moment";
const moment = _moment;
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: "LL"
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MM YYYY"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentDetailsComponent,
    StudentAddComponent,
    LoginComponent,
    HomeComponent,
    FilterPipe,
    PhonePipe,
    HighlightStudentDirective,
    SessionListComponent,
    MyNumberPipe
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true
    })
  ],
  providers: [
    AuthService,
    UserService,
    StudentService,
    SessionService,
    PhonePipe,
    MyNumberPipe,
    DatePipe,
    DecimalPipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})

// enableProdMode();
export class AppModule {}
