import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SessionService } from "../../../services/sessions/session.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { Session } from "../sessions";
import { Student } from "../../student/student";
import { DatePipe } from "@angular/common";
import { MyNumberPipe } from "../../../pipes/my-number.pipe";
import * as $ from "jquery";
import "datatables.net";
import "datatables.net-bs";

@Component({
  selector: "app-session-add",
  templateUrl: "./session-add.component.html",
  styleUrls: ["./session-add.component.css"]
})
export class SessionAddComponent implements OnInit {
  sessionAddForm: FormGroup;
  index: string;
  showSearch: boolean;
  // studentList: Student[];
  students: Student[];
  sessionStudents: Student[];
  optionStudentId: string;
  tableWidget: any;

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private myNumberPipe: MyNumberPipe // private cdRef: ChangeDetectorRef
  ) {
    this.showSearch = true;
    this.students = JSON.parse(sessionStorage.getItem("students"));
    //check for route Params
    this.route.params.subscribe(params => {
      this.index = params["id"];
      if (this.index && this.index != undefined) {
        console.log(`Update session: ${this.index}`);
        // this.sessionAddForm.value._id = id;
        this.getSessionDetail(this.index);
      } else {
        this.createForm(null);
      }
    });
  }

  initDatatable() {
    let studentListId: any = $("#studentTable");
    this.tableWidget = studentListId.DataTable({
      retrieve: true,
      language: {
        info: "Hiển thị _START_ - _END_ / _TOTAL_ học sinh",
        processing: "Đang xử lý...",
        search: "Tìm kiếm:&nbsp;",
        loadingRecords: "Đang cập nhật dữ liệu...",
        zeroRecords: "Chưa có học sinh nào",
        emptyTable: "Chưa có học sinh nào",
        infoFiltered: "(lọc trong tổng số _MAX_ học sinh)",
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

  onSelectStudent(id: string) {
    if (id === "") {
      return;
    }
    let student: Student;
    for (let i = 0; i < this.students.length; i++) {
      const s = this.students[i];
      if (s._id === id) {
        student = s;
        console.log("FOUND: ");
        console.log(this.sessionStudents.indexOf(student));
        for (let i = 0; i < this.sessionStudents.length; i++) {
          const curStudentList: Student = this.sessionStudents[i];
          if (curStudentList._id === student._id) {
            return;
          }
        }
        this.sessionStudents.push(student);
        return;
      }
    }
  }
  getSessionDetail(id: string) {
    var session: Session = this.sessionService.getSessionById(id);
    this.createForm(session);
    this.getStudentsBySession(id);
  }

  createForm(data: Session) {
    this.sessionAddForm = this.formBuilder.group({
      _id: [data === null ? "-1" : data._id],
      class_name: [
        data === null ? "" : data.class_name,
        [Validators.required, Validators.maxLength(50)]
      ],
      start_date: [
        data === null
          ? ""
          : this.datePipe.transform(data.start_date, "yyyy-MM-dd"),
        [Validators.required]
      ],
      end_date: [
        data === null
          ? ""
          : this.datePipe.transform(data.end_date, "yyyy-MM-dd")
      ],
      start_time: [
        data === null ? "18h00" : data.start_time,
        [Validators.pattern("\\d{1,2}(h){0,1}\\d{0,2}")]
      ],
      fee: [
        data === null ? "100.000" : this.myNumberPipe.transform(data.fee),
        [Validators.pattern("[0-9.]+")]
      ]
    });
  }

  removeStudent(student: Student) {
    let r = confirm(
      `Thầy/cô chắc chắn muốn xóa học sinh này khỏi lớp học ${this.className}`
    );
    if (r) {
      const index = this.sessionStudents.indexOf(student);
      this.sessionStudents.splice(index, 1);
      this.reInitDatatable();
    }
    // this.cdRef.detectChanges();
  }

  getStudentsBySession(sessionId: string) {
    this.sessionService.getStudentsBySession(sessionId).subscribe(students => {
      this.sessionStudents = students;
      this.reInitDatatable();
    });
  }

  get className() {
    return this.sessionAddForm.get("class_name");
  }

  get startDate() {
    return this.sessionAddForm.get("start_date");
  }

  get endDate() {
    return this.sessionAddForm.get("end_date");
  }

  get startTime() {
    return this.sessionAddForm.get("start_time");
  }

  get fee() {
    return this.sessionAddForm.get("fee");
  }

  doSubmit() {
    const fee: string = this.sessionAddForm.value.fee.toString();
    if (fee !== "0") {
      this.sessionAddForm.value.fee = fee.replace(".", "");
    } else {
      this.sessionAddForm.value.fee = 0;
    }

    let studentIds = [];
    // let students_bk = this.sessionAddForm.value.students;
    for (let i = 0; i < this.sessionStudents.length; i++) {
      const student: Student = this.sessionStudents[i];
      studentIds.push(student._id);
    }
    this.sessionAddForm.value.students = studentIds;
    if (!this.index) {
      this.sessionService
        .doAddSession(this.sessionAddForm.value)
        .subscribe(_ => {
          this.toastr.success("Thành công", "Thêm mới lớp học thành công");
        });
    } else {
      this.sessionService
        .doUpdateSession(this.sessionAddForm.value)
        .subscribe(_ => {
          this.toastr.success("Thành công", "Cập nhật lớp học thành công");
        });
    }

    // this.sessionAddForm.value.students = students_bk;
  }

  formatTime(value: number) {
    if (Number.isInteger(value)) {
      return value.toString() + " h";
    } else {
      let valStr = Math.floor(value).toString();
      return valStr + "h30";
    }
  }

  ngOnInit() {}
}
