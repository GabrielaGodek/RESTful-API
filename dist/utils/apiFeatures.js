"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIFeatures = void 0;
class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    filter() {
        const queryObj = Object.assign({}, this.queryStr);
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);
        for (const key in queryObj) {
            if (Object.prototype.hasOwnProperty.call(queryObj, key)) {
                queryObj[key] = JSON.parse(queryObj[key]);
            }
        }
        this.query = this.query.find(queryObj);
        return this;
    }
    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        return this;
    }
    fields() {
        if (this.queryStr.fields) {
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select('-__v');
        }
        return this;
    }
    pagination() {
        const page = this.queryStr.page || 1;
        const limit = this.queryStr.limit || 20;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
exports.APIFeatures = APIFeatures;
//# sourceMappingURL=apiFeatures.js.map