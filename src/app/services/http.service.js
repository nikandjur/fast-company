import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import localStorageService from "./localStorage";
import { httpAuth } from "../hooks/useAuth";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFirebase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";

            const expiresDate = localStorageService.getExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && expiresDate < Date.now()) {
                const { data } = await httpAuth.post('token', {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id,
                });
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
                // config = {...config, ...params, auth: accessToken };
            }
        }
        return config;
    },
    function (error) {

        return Promise.reject(error);
    }
);

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map(key => ({
            ...data[key]
        }))
        : data;
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFirebase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            console.log("!expectedErrors", error);
            toast.error("Somthing was wrong. Try it later");
            // toast.info("Try it later");
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
};
export default httpService;
