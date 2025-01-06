// To parse this data:
//
//   import { Convert } from "./file";
//
//   const clinicRegister = Convert.toClinicRegister(json);

export interface ClinicRegister {
    uid:              number;
    clinicname:       string;
    nameSurname:      string;
    phone:            string;
    email:            string;
    password:         string;
    profileClinicPic: string;
    lat:              string;
    lng:              string;
    doctorPic:        null;
    followersClinic:  number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toClinicRegister(json: string): ClinicRegister[] {
        return JSON.parse(json);
    }

    public static clinicRegisterToJson(value: ClinicRegister[]): string {
        return JSON.stringify(value);
    }
}
