import { Time } from "@angular/common";

export class Session{
    _id: any;
    class_name: string;
    start_date: Date;
    end_date: Date;
    start_time: number;
    fee: number;
    students: string[];
    filter_data: string;
}