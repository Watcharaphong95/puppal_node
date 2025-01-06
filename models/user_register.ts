// To parse this data:
//
//   import { Convert } from "./file";
//
//   const userRegister = Convert.toUserRegister(json);

export interface UserRegister {
    username:    string;
    nameSurname: string;
    phone:       string;
    email:       string;
    password:    string;
    profilePic:  string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toUserRegister(json: string): UserRegister[] {
        return JSON.parse(json);
    }

    public static userRegisterToJson(value: UserRegister[]): string {
        return JSON.stringify(value);
    }
}
