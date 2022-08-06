// axiosApi.post('/api/~') と書けるようにする（prefixみたいな）。

import axios from "axios";

export const axiosApi = axios.create({
    baseURL: 'http://localhost:80',
    withCredentials: true,  // AxiosによるAPIリクエストの際に、Cookieも送信する
});