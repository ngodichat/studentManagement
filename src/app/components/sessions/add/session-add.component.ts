import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SessionService } from "../../../services/sessions/session.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { Session } from "../sessions";
import { Student } from "../../student/student";
import { DatePipe } from "@angular/common";
import { MyNumberPipe } from "../../../pipes/my-number.pipe";

@Component({
  selector: "app-session-add",
  templateUrl: "./session-add.component.html",
  styleUrls: ["./session-add.component.css"]
})
export class SessionAddComponent implements OnInit {
  sessionAddForm: FormGroup;
  id: string;
  // studentList: Student[];

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private myNumberPipe: MyNumberPipe
  ) {
    //check for route Params
    this.route.params.subscribe(params => {
      this.id = params["id"];
      if (this.id && this.id != undefined) {
        console.log(`Update session: ${this.id}`);
        // this.sessionAddForm.value._id = id;
        this.getSessionDetail(this.id);
      } else {
        this.createForm(null);
      }
    });
  }

  getSessionDetail(id: string) {
    var session: Session = this.sessionService.getSessionById(id);
    // console.log(session._id);
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
      ],
      nStudents: [{ value: 0, disabled: true }],
      students: [[]]
    });
  }

  onRemoveStudent(student: Student) {
    let studentList: Student[] = this.sessionAddForm.value.students;
    const index = studentList.indexOf(student);
    studentList.splice(index, 1);
    this.sessionAddForm.value.students = studentList;
    this.sessionAddForm.value.nStudents = studentList.length;
  }

  getStudentsBySession(sessionId: string) {
    this.sessionService.getStudentsBySession(sessionId).subscribe(students => {
      // this.studentList = students;
      this.sessionAddForm.value.nStudents = students.length;
      this.sessionAddForm.value.students = students;
      console.log(this.sessionAddForm.value);
    });
    // console.log(studentList);
    // return studentList;
  }

  get className() {
    return this.sessionAddForm.get("class_name");
  }

  get startDate() {
    return this.sessionAddForm.get("start_date");
  }

  get endtDate() {
    return this.sessionAddForm.get("end_date");
  }

  get startTime() {
    return this.sessionAddForm.get("start_time");
  }

  get fee() {
    return this.sessionAddForm.get("fee");
  }

  get nStudents() {
    return this.sessionAddForm.get("nStudents");
  }

  doSubmit() {
    const fee: string = this.sessionAddForm.value.fee.toString();
    if (fee !== "0") {
      this.sessionAddForm.value.fee = fee.replace(".", "");
    } else {
      this.sessionAddForm.value.fee = 0;
    }

    let studentIds = [];
    let students_bk = this.sessionAddForm.value.students;
    for (let i = 0; i < this.sessionAddForm.value.students.length; i++) {
      const student: Student = this.sessionAddForm.value.students[i];
      studentIds.push(student._id);
    }
    this.sessionAddForm.value.students = studentIds;
    // let time: string = this.sessionAddForm.value.start_time;
    // const pos_of_h = time.indexOf("h");
    // if(pos_of_h !== -1){
    //   console.log(+time.substr(0,pos_of_h)+(+time.substr(pos_of_h-1)/60));
    // }

    if (!this.id) {
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

    this.sessionAddForm.value.students = students_bk;
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
