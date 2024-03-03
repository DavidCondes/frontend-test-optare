import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { IpAddressModel } from '../models/ipAddress.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IpAddressService {

  private url = "https://optare-test-dacl-8b01a367ad61.herokuapp.com/ip-address/";

  constructor(private httpClient: HttpClient) { }

  getAllIpAddresses(){
    return this.httpClient.get(this.url + "get-all");
  }

  saveIpAddress(ip: string){
    let params = new HttpParams().set('ip', ip);

    return this.httpClient.get<ResponseModel>(this.url + "add", {params: params})
                          .pipe(map((response: any) => {
                            
                            let ipAddress: IpAddressModel | null = null;
                            if(response.ipAddress){
                              ipAddress = {
                                id: response.ipAddress.id,
                                ip: response.ipAddress.ip,
                                type: response.ipAddress.type,
                                continent: response.ipAddress.continent,
                                country: response.ipAddress.country,
                                region: response.ipAddress.region,
                                city: response.ipAddress.city,
                                latitude: response.ipAddress.latitude,
                                longitude: response.ipAddress.longitude,
                                org: response.ipAddress.org
                              };
                            }


                            return {
                              success: response.success,
                              message: response.message,
                              ipInfo: ipAddress
                            };
                          }));
  }

  deleteIpAddress(id: Int32Array){
    let params = new HttpParams().set('id', id.toString());

    return this.httpClient.delete<ResponseModel>(this.url + "delete", {params: params})
                          .pipe(map((response: any) => {
                            return {
                              success: response.success,
                              message: response.message
                            };
                          }));
  }

}
