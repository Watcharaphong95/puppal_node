// To parse this data:
//
//   import { Convert, ReserveInput } from "./file";
//
//   const reserveInput = Convert.toReserveInput(json);

export interface ReserveInput {
    u_rid: number;
    d_rid: number;
    date:  string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toReserveInput(json: string): ReserveInput {
        return JSON.parse(json);
    }

    public static reserveInputToJson(value: ReserveInput): string {
        return JSON.stringify(value);
    }
}
