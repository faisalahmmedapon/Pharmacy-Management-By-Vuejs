import { axiosPrivate } from "./axiosInstance";

export default {
  getVendors() {
    return axiosPrivate.get("/vendor");
  },

  addVendor(payload) {
    return axiosPrivate.post("/vendor", payload);
  },

  editVendor(payload) {
    return axiosPrivate.put("/vendor/" + payload.id, payload);
  },

  deleteVendor(id) {
    return axiosPrivate.delete("/vendor/" + id);
  },

  getDrugs() {
    return axiosPrivate.get("/drug");
  },

  addDrug(payload) {
    return axiosPrivate.post("/drug", payload);
  },

  editDrug(payload) {
    return axiosPrivate.put("/drug/" + payload.id, payload);
  },

  deleteDrug(id) {
    return axiosPrivate.delete("/drug/" + id);
  },

  searchDrug(searchString) {
    return axiosPrivate.post("/drug/search", {
      searchString: searchString
    });
  },
  sellDrug(payload) {
    return axiosPrivate.post("/sell", payload);
  },
  getHistory() {
    return axiosPrivate.get("/sell");
  },
  deleteHistory(id) {
    return axiosPrivate.delete("/sell/" + id);
  },
  getOverview() {
    return axiosPrivate.get("/overview");
  },
  getAccountSettings() {
    return axiosPrivate.get("/account-settings");
  },

  updateAccountSettings(payload) {
    return axiosPrivate.put("/account-settings", payload);
  },
  getWebsiteSettings() {
    return axiosPrivate.get("/website-settings");
  },

  updateWebsiteSettings(payload) {
    return axiosPrivate.put("/website-settings", payload);
  }
};
