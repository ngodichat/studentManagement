import {
  ValidationService,
  routerTransition
} from "../../../services/config/config.service";
import { SessionService } from "./../../../services/sessions/session.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Session } from "../sessions";

@Component({
  selector: "app-session-list",
  templateUrl: "./session-list.component.html",
  styleUrls: ["./session-list.component.css"],
  animations: [routerTransition()],
  host: { "[@routerTransition]": "" }
})
export class SessionListComponent implements OnInit {
  sessionList: any;
  sessions: Session[];

  constructor(
    private sessionService: SessionService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.getSessionList();
  }

  getSessionList() {
    this.sessionService.getAllSessions().subscribe(items => {
      // console.log(items);
      this.sessions = items;
      sessionStorage.setItem("sessions", JSON.stringify(this.sessions));
    });
  }

  deleteSession(id: string) {
    const r = confirm("Thầy/cô có muốn xóa lớp học này?");
    console.log("Delete sessionID " + id);
    if (r) {
      this.sessionService.doDeleteSession(id).subscribe(
        _ => {
          this.toastService.success("Thành công", "Xóa lớp học thành công");
          this.getSessionList();
        },
        err => {
          this.toastService.error("Thất bại", "Không xóa được lớp học");
        }
      );
    }
  }
}
