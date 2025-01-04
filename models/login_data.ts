// To parse this data:
//
//   import { Convert } from "./file";
//
//   const loginData = Convert.toLoginData(json);

export interface LoginData {
    email:    string;
    password: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toLoginData(json: string): LoginData[] {
        return JSON.parse(json);
    }

    public static loginDataToJson(value: LoginData[]): string {
        return JSON.stringify(value);
    }
}
