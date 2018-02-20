import {
  ValidationService,
  routerTransition
} from "../../../services/config/config.service";
import { SessionService } from "./../../../services/sessions/session.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-session-list",
  templateUrl: "./session-list.component.html",
  styleUrls: ["./session-list.component.css"],
  animations: [routerTransition()],
  host: { "[@routerTransition]": "" }
})
export class SessionListComponent implements OnInit {
  sessionList: any;
  sessionListData: any;

  constructor(
    private sessionService: SessionService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.getSessionList();
  }

  getSessionList() {
    this.sessionList = this.sessionService.getAllSessions();
    this.sessionListData = this.sessionList.data;
  }
}
