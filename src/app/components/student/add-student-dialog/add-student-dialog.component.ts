import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { StudentService } from "../../../services/student/student.service";
import { Student } from "../student";
import { SessionService } from "../../../services/sessions/session.service";
import * as $ from "jquery";
import "datatables.net";
import "datatables.net-bs";

@Component({
  selector: "addStudentDialog",
  templateUrl: "./add-student-dialog.component.html",
  styleUrls: ["./add-student-dialog.component.css"]
})
export class AddStudentDialogComponent implements OnInit {
  _sessionId: string;
  students: Student[];
  sessionStudents: Student[];
  tableWidget: any;

  constructor(
    private studentService: StudentService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.getStudentList();
  }

  @Input()
  set sessionId(id) {
    // console.log(id);
    this._sessionId = id;
    if (
      this._sessionId &&
      this._sessionId != null &&
      this._sessionId !== undefined
    ) {
      this.getStudentsBySessionId();
    }
  }

  @Output("addStudent") update = new EventEmitter<any>();

  getStudentList() {
    this.studentService.getAllStudents().subscribe(
      students => {
        this.students = students;
        this.reInitDatatable();
        // sessionStorage.setItem("students", JSON.stringify(students));
      },
      err => {
        console.log(err);
        // this.toastr.error("Thất bại", "Không tải được danh sách học sinh");
      }
    );
  }

  getStudentsBySessionId() {
    this.sessionService
      .getStudentsBySession(this._sessionId)
      .subscribe(students => {
        this.sessionStudents = students;

        let existedStudent = [];
        this.sessionStudents.forEach(sessionStudent => {
          this.students.forEach(student => {
            if (student._id === sessionStudent._id) {
              existedStudent.push(student);
            }
          });
        });

        existedStudent.forEach(student => {
          let index = this.students.indexOf(student);
          console.log("Index: ", index);
          if (index != -1) this.students.splice(index, 1);
        });

        this.reInitDatatable();
      });
  }

  initDatatable() {
    let studentListId: any = $("#studentTab");
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
      console.log("ReinitDatatable");
    }
    setTimeout(() => this.initDatatable(), 0);
  }

  addStudent(student) {
    let data = {
      studentId: student._id,
      sessionId: this._sessionId
    };
    // this.sessionService.doAddStudent(data).subscribe(_ => {
    // this.toastr.success("Thành công", "Thêm lớp học thành công");
    let index = this.students.indexOf(student);
    if (index != -1) {
      this.update.emit(student);
      this.students.splice(index, 1);
    }
    // });
  }

  onRemoveStudentFromParent(student: Student){
    // console.log("Parent remove a student");
    this.students.push(student);
  }
}
