/**
 * Created By : Pham Nguyen Binh
 */

import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

// Services
import { StudentService } from "../../../services/student/student.service";
import { routerTransition } from "../../../services/config/config.service";
import { Student } from "../student";
import { Router } from "@angular/router";
import * as $ from "jquery";
import "datatables.net";
import "datatables.net-bs";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"],
  animations: [routerTransition()],
  host: { "[@routerTransition]": "" }
})
export class StudentListComponent implements OnInit {
  studentList: any;
  students: Student[];
  selectedId: any;
  private tableScript: any;
  tableWidget: any;
  constructor(
    private studentService: StudentService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  // Call student list function on page load
  ngOnInit() {
    this.getStudentList();
    // console.log(this.router.url);
  }

  ngAfterViewInit() {
    this.initDatatable();
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

  // Get student list from services
  getStudentList() {
    this.studentService.getAllStudents().subscribe(
      students => {
        // this.toastr.success("Thành công", "Tải danh sách học sinh thành công");
        // console.log(students);
        this.students = students;
        this.reInitDatatable();
        this.success();
        sessionStorage.setItem("students", JSON.stringify(students));
      },
      err => {
        console.log(err);
        this.toastr.error("Thất bại", "Không tải được danh sách học sinh");
      }
    );
  }

  // Get student list success
  success() {
    // this.students = abc.data;
    for (let i = 0; i < this.students.length; i++) {
      this.students[i].filter_data =
        this.students[i].sur_middle_name + " " + this.students[i].first_name;
    }
  }

  // Delete a student with its index
  deleteStudent(index: number) {
    // get confirm box for confirmation
    const r = confirm("Thầy/cô muốn xóa học sinh này?");
    if (r === true) {
      this.studentService.deleteStudent(index).subscribe(
        data => {
          console.log(data);
          this.toastr.success("Thành công", "Xóa học sinh thành công");
        },
        err => {
          this.toastr.error("Thất bại", "Xóa học sinh thất bại");
        }
      );
      this.getStudentList();
    }
  }

  setCurrentId(id){
    this.selectedId = id;
    console.log(`SELECTED ID: ${this.selectedId}`);
  }
}
/**
 * Created By : Pham Nguyen Binh
 */
