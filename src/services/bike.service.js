import http from "../http-common";

class BikeDataService {
    getAll() {
        return http.get("/bikes");
    }

    get(id) {
        return http.get(`/bikes/${id}`);
    }

    create(data) {
        return http.post("/bikes", data);
    }

    update(id, data) {
        return http.put(`/bikes/${id}`, data);
    }

    delete(id) {
        return http.delete(`/bikes/${id}`);
    }

    deleteAll() {
        return http.delete(`/bikes`);
    }

    findByParameter(parameter) {
        return http.get(`/bikes?parameter=${parameter}`);
    }
}

export default new BikeDataService();