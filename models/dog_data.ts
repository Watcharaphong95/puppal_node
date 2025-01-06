// To parse this data:
//
//   import { Convert } from "./file";
//
//   const dogData = Convert.toDogData(json);

export interface DogData {
    did:           number;
    b_did:         number;
    u_did:         number;
    name:          string;
    gender:        string;
    color:         string;
    defect:        string;
    birth:         string;
    conDisease:    null | string;
    vacHistory:    null | string;
    sterilization: number | null;
    pic:           string;
    hair:          string;
    status:        number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toDogData(json: string): DogData[] {
        return JSON.parse(json);
    }

    public static dogDataToJson(value: DogData[]): string {
        return JSON.stringify(value);
    }
}
