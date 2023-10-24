export interface IUserLogin {
    username: string,
    password: string
}

export interface IResult {
    id: number,
    name: string,
    email: string,
    birthday_date: string,
    phone_number: string,
    address: string,
}

export interface IPagination {
    count: number,
    next: string,
    previous: string,
    results: IResult[],
}

export interface IUser extends IPagination {
    isLogin: boolean,
    page: number,
    isLoading: boolean,
    limit?: number,
    currentUser: IResult | null,
}


