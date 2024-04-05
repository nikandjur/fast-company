import httpService from "./http.service";
const professionEndpoint = "profession/";

const professionService = {
  update: async (id, content) => {
    const { data } = await httpService.put(professionEndpoint + id, content);
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(professionEndpoint + id);
    return data;
  },
  fetchAll: async () => {
    const { data } = await httpService.get(professionEndpoint);
    return data;
  },
  create: async (content) => {
    const { data } = await httpService.post(professionEndpoint, content);
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(professionEndpoint + id);
    return data;
  },
};
export default professionService;
