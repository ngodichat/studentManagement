/**
 * Created By : Pham Nguyen Binh
 */

import { Component, OnInit } from "@angular/core";
import { RouterModule, Routes, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

// Components
import { StudentListComponent } from "../student/list/student-list.component";
import { StudentDetailsComponent } from "../student/details/student-details.component";
import { StudentAddComponent } from "../student/add/student-add.component";
import { SessionAddComponent } from "../sessions/add/session-add.component";
import { SessionListComponent } from "../sessions/list/session-list.component";

// Services
import { routerTransition } from "../../services/config/config.service";
import { TransactionListComponent } from "../transaction-history/list/transaction-list.component";
import { TransactionAddComponent } from "../transaction-history/add/transaction-add.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  animations: [routerTransition()],
  host: { "[@routerTransition]": "" }
})
export class HomeComponent implements OnInit {
  active: string;
  constructor(private router: Router, private toastr: ToastrService) {
    // Detect route changes for active sidebar menu
    this.router.events.subscribe(val => {
      this.routeChanged(val);
    });
  }

  ngOnInit() {}

  // Detect route changes for active sidebar menu
  routeChanged(val) {
    this.active = val.url;
  }
}

// Define and export child routes of HomeComponent
export const homeChildRoutes: Routes = [
  {
    path: "",
    component: StudentListComponent
  },
  {
    path: "students",
    component: StudentListComponent
  },
  {
    path: "detail/:id",
    component: StudentDetailsComponent
  },
  {
    path: "addStudent",
    component: StudentAddComponent
  },
  {
    path: "updateStudent/:id",
    component: StudentAddComponent
  },
  {
    path: "sessions",
    component: SessionListComponent
  },
  {
    path: "addSession",
    component: SessionAddComponent
  },
  {
    path: "updateSession/:id",
    component: SessionAddComponent
  },
  {
    path: "transactions",
    component: TransactionListComponent
  },
  {
    path: "addTransactions",
    component: TransactionAddComponent
  }
];

/**
 * Created By : Pham Nguyen Binh
 */
