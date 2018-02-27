import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { Session } from "../../components/sessions/sessions";
import { Student } from "../../components/student/student";
import { catchError, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class SessionService {
  constructor(private http: HttpClient) {}
  getAllSessions(): Observable<Session[]> {
    return this.http.get<Session[]>("api/sessions");
  }

  getSessionById(id: string): Session {
    const sessions = JSON.parse(sessionStorage.getItem("sessions"));
    for (let i = 0; i < sessions.length; i++) {
      const session: Session = sessions[i];
      console.log(session);
      if (session._id === id) {
        console.log("Found session");
        return session;
      }
    }
    return null;
  }

  getStudentsBySession(sessionId: string): Observable<Student[]>{
    return this.http.get<Student[]>(`api/sessions/students/${sessionId}`);
  }

  doAddSession(session: Session): Observable<any> {
    return this.http.post("/api/sessions/", session).pipe(
      tap(_ => {
        console.log(`Add new session`);
      }),
      catchError(this.handleError("addSession"))
    );
  }

  doUpdateSession(session: Session): Observable<any> {
    return this.http.put("/api/sessions/", session).pipe(
      tap(_ => {
        console.log(`Update session ${session._id}`);
      }),
      catchError(this.handleError("updateSession"))
    );
  }

  doDeleteSession(sessionId: any): Observable<any> {
    return this.http.delete(`/api/sessions/${sessionId}`).pipe(
      tap(_ => {
        console.log(`Delete session ${sessionId}`);
      }),
      catchError(this.handleError("deleteSession"))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.log("Lỗi rồi");
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
