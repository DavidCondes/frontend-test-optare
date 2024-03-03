import { IpAddressModel } from "./ipAddress.model";

export interface ResponseModel {
    success: boolean;
    message: string;
    ipInfo: IpAddressModel | null;
}