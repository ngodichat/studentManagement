import { MyNumberPipe } from "./../../../pipes/my-number.pipe";
/**
 * Created By : Pham Nguyen Binh
 */
import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { RouterModule, Routes, Router, ActivatedRoute } from "@angular/router";

// Services
import { ValidationService } from "../../../services/config/config.service";
import { StudentService } from "../../../services/student/student.service";
import { routerTransition } from "../../../services/config/config.service";

import { ToastrService } from "ngx-toastr";
import { DatePipe, DecimalPipe } from "@angular/common";
import { PhonePipe } from "./../../../pipes/phone.pipe";
import { Student } from "../student";

@Component({
  selector: "app-student-add",
  templateUrl: "./student-add.component.html",
  styleUrls: ["./student-add.component.css"],
  animations: [routerTransition()]
  // host: { "[@routerTransition]": "" }
})
export class StudentAddComponent implements OnInit {
  // create studentAddForm of type FormGroup
  studentAddForm: FormGroup;
  index: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private toastr: ToastrService,
    private phonePipe: PhonePipe,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    private myNumberPipe: MyNumberPipe
  ) {
    // Check for route params
    this.route.params.subscribe(params => {
      this.index = params["id"];
      // console.log("INDEX " + this.index);
      // check if ID exists in route & call update or add methods accordingly
      if (this.index && this.index !== null && this.index !== undefined) {
        this.getStudentDetails(this.index);
      } else {
        this.createForm(null);
      }
    });
  }

  ngOnInit() {}

  // Submit student details form
  doRegister() {
    if (this.index && this.index != null && this.index !== undefined) {
      this.studentAddForm.value._id = this.index;
    } else {
      this.index = null;
    }
    const total_money: string = this.studentAddForm.value.total_money;
    if (total_money !== "0") {
      this.studentAddForm.value.total_money = total_money.replace(".", "");
    } else {
      this.studentAddForm.value.total_money = 0;
    }
    const student: Student = this.studentAddForm.value;
    if (this.index) {
      this.studentService.doUpdateStudent(student).subscribe(
        data => {
          this.toastr.success("Thành công", "Lưu chỉnh sửa thành công");
        },
        err => {
          this.toastr.error("Thất bại", "Không thể lưu chỉnh sửa");
        }
      );
    } else {
      this.studentService.doAddStudent(student).subscribe(
        data => {
          this.toastr.success("Thành công", "Thêm mới học sinh thành công");
        },
        err => {
          this.toastr.error("Thất bại", "Không thêm mới được học sinh");
        }
      );
    }
  }

  // If this is update form, get user details and update form
  getStudentDetails(index: any) {
    this.studentService.getStudentDetails(index).subscribe(
      data => {
        const studentDetail = data[0];
        // this.toastr.success("Thành công", "Xóa học sinh thành công");
        // console.log(data);
        this.createForm(studentDetail);
      },
      err => {
        console.log(err);
        // this.toastr.error("Thất bại", "Không xóa được học sinh");
      }
    );
  }

  get firstName() {
    return this.studentAddForm.get("first_name");
  }
  get surMiddleName() {
    return this.studentAddForm.get("sur_middle_name");
  }
  get class() {
    return this.studentAddForm.get("class");
  }
  get school() {
    return this.studentAddForm.get("school");
  }
  get referral() {
    return this.studentAddForm.get("referral");
  }
  get totalMoney() {
    return this.studentAddForm.get("total_money");
  }
  get parentName() {
    return this.studentAddForm.get("parent_name");
  }
  get phone() {
    return this.studentAddForm.get("phone");
  }
  get startDate() {
    return this.studentAddForm.get("start_date");
  }
  get note() {
    return this.studentAddForm.get("note");
  }
  // If this is update request then auto fill form
  createForm(data) {
    if (data !== null) {
      // console.log("index" + data.id);
    } else {
      console.log("DATA NULL");
    }
    this.studentAddForm = this.formBuilder.group({
      _id: [data === null ? -1 : data._id],
      sur_middle_name: [
        data === null ? "" : data.sur_middle_name,
        [Validators.required]
      ],
      first_name: [
        data === null ? "" : data.first_name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
      ],
      class: [data === null ? "" : data.class],
      school: [data === null ? "" : data.school],
      referral: [data === null ? "" : data.referral],
      parent_name: [
        data === null ? "" : data.parent_name,
        [Validators.required]
      ],
      phone: [
        data === null ? "" : data.phone,
        [Validators.pattern("(\\+)?[0-9]*"), Validators.maxLength(13)]
      ],
      total_money: [
        data === null ? 0 : this.myNumberPipe.transform(data.total_money),
        [Validators.pattern("(-)?[0-9.]+")]
      ],
      start_date: [
        data === null
          ? ""
          : this.datePipe.transform(data.start_date, "yyyy-MM-dd")
      ],
      note: [data === null ? "" : data.note]
    });
  }
}
