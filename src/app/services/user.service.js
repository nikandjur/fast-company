import httpService from "./http.service";
import localStorageService from "./localStorage";
const userEndpoint = "user/";

const userService = {
    // update: async (id, content) => {
    //     const { data } = await httpService.put(userEndpoint + id, content);
    //     return data;
    // },
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    // fetchAll: async () => {
    //     const { data } = await httpService.get(userEndpoint);
    //     return data;
    // },
    create: async (payLoad) => {
        const { data } = await httpService.put(
            userEndpoint + payLoad._id,
            payLoad
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        return data
    },
    update: async (payLoad) => {
        const { data } = await httpService.patch(
            userEndpoint + localStorageService.getUserId(), payLoad
        );
        return data;
    },

    // delete: async (id) => {
    //     const { data } = await httpService.delete(userEndpoint + id);
    //     return data;
    // },
};
export default userService;
