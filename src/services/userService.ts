import axios, {AxiosResponse} from "axios";
import {IPagination, IResult, IUsersParams} from "@/interfaces";

type IRes<DATA> = Promise<AxiosResponse<DATA>>

const baseURL = 'https://technical-task-api.icapgroupgmbh.com/api'
const apiService = axios.create({baseURL})

const users = '/table/';
const userByID = (id: number) => `/table/${id}/`;

export const userService = {
    getAll: (params: IUsersParams): IRes<IPagination> => {
        const {url, limit} = params;
        if (url) {
            return apiService.get(`${url}&limit=${limit}`);
        }
        return apiService.get(`${users}?limit=${limit}`);
    },
    getById: (id: number): IRes<IResult> => apiService.get(userByID(id)),
    updateById: (id: number, data: IResult): IRes<IResult> => apiService.put(userByID(id), data),
    deleteById: (id: number): IRes<void> => apiService.delete(userByID(id))
}
