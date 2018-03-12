import {
  ValidationService,
  routerTransition
} from "../../../services/config/config.service";
import { SessionService } from "./../../../services/sessions/session.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Session } from "../sessions";
import * as $ from "jquery";
import "datatables.net";
import "datatables.net-bs";

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
  tableWidget: any;
  selectedId: any;
  constructor(
    private sessionService: SessionService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.getSessionList();
  }

  ngAfterViewInit() {
    this.initDatatable();
  }

  initDatatable() {
    let sessionListId: any = $("#sessionTable");
    this.tableWidget = sessionListId.DataTable({
      retrieve: true,
      language: {
        info: "Hiển thị _START_ - _END_ / _TOTAL_ học sinh",
        processing: "Đang xử lý...",
        search: "Tìm kiếm:&nbsp;",
        loadingRecords: "Đang cập nhật dữ liệu...",
        zeroRecords: "Chưa có lớp học nào",
        emptyTable: "Chưa có lớp học nào",
        infoFiltered: "(lọc trong tổng số _MAX_ lớp học)",
        lengthMenu: "Hiển thị _MENU_ bản ghi",
        paginate: {
          first: "Trang đầu",
          previous: "Trước ",
          next: " Tiếp",
          last: "Trang cuối"
        }
      }
    });
  }

  private reInitDatatable(): void {
    if (this.tableWidget) {
      this.tableWidget.destroy();
      this.tableWidget = null;
    }
    setTimeout(() => this.initDatatable(), 0);
  }

  getSessionList() {
    this.sessionService.getAllSessions().subscribe(items => {
      this.sessions = items;
      this.reInitDatatable();
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

  setCurrentId(id){
    this.selectedId = id;
    console.log(`SELECTED ID: ${this.selectedId}`);
  }
}
