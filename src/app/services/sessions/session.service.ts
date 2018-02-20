import { Injectable } from "@angular/core";

@Injectable()
export class SessionService {
  constructor() {}

  getAllSessions() {
    let sessionList: any;
    sessionList = {
      code: 200,
      message: "Session list fetched successfully",
      data: JSON.parse(localStorage.getItem("sessions"))
    };
    return sessionList;
  }
}
