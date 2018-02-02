/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */

import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Student Management By Sangwin Gawande";

  // Add few students for initial listing
  studentsList = [
    {
      id: 1,
      first_name: "Phạm Văn",
      last_name: "A",
      class: "8A",
      school: "Nghĩa Tân",
      phone: "01689947900",
      department: "Science",
      parent_name: "Phạm Duy Nhất",
      parent_id: 1
    },
    {
      id: 1,
      first_name: "Phạm Văn",
      last_name: "B",
      class: "8A",
      school: "Nghĩa Tân",
      phone: "01689947900",
      department: "Science",
      parent_name: "Phạm Duy Nhị",
      parent_id: 1
    },
    {
      id: 2,
      first_name: "Phạm Văn",
      last_name: "Tài",
      class: "8D",
      school: "Lê Quý Đôn",
      phone: "01689947981",
      department: "Science",
      parent_name: "Phạm Tuyên",
      parent_id: 1
    },
    {
      id: 1,
      first_name: "Lê Đức",
      last_name: "Thọ",
      class: "8B",
      school: "Nghĩa Tân",
      phone: "01689947982",
      department: "Science",
      parent_name: "Lê Dân Trí",
      parent_id: 1
    },
  ];

  constructor() {
    // Save students to localStorage
    localStorage.setItem("students", JSON.stringify(this.studentsList));
  }
}

/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */
