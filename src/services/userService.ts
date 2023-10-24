import axios, {AxiosResponse} from "axios";
import {IPagination, IResult} from "@/interfaces";

type IRes<DATA> = Promise<AxiosResponse<DATA>>

const baseURL = 'https://technical-task-api.icapgroupgmbh.com/api'
const apiService = axios.create({baseURL})


const users = '/table/';
const userByID = (id: number) => `/table/${id}/`;

export const userService = {
    getAll: (params: { limit: number | undefined; url: string | null }): IRes<IPagination> => {
        const {url, limit} = params;
        if(url) {
            return apiService.get(`${url}&limit=${limit}`);
        }
        return apiService.get(`${users}?limit=${limit}`);
    },
    create: (data: IResult): IRes<IResult> => apiService.post(users, data),
    getById: (id: number): IRes<IResult> => apiService.get(userByID(id)),
    updateById: (id: number, data: IResult): IRes<IResult> => apiService.put(userByID(id), data),
    deleteById: (id: number): IRes<void> => apiService.delete(userByID(id)),
}
