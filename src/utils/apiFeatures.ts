import { Document, Query } from "mongoose";

class APIFeatures<T extends Document> {
    query: Query<T[], T>;
    queryStr: any;

    constructor(query: Query<T[], T>, queryStr: any) {
        this.query = query;
        this.queryStr = queryStr;
    }

    filter(): this {
        const queryObj: any = { ...this.queryStr };
        const excludedFields: string[] = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el: string) => delete queryObj[el]);

        for (const key in queryObj) {
            if (Object.prototype.hasOwnProperty.call(queryObj, key)) {
                queryObj[key] = JSON.parse(queryObj[key]);
            }
        }

        this.query = this.query.find(queryObj);

        return this;
    }

    sort(): this {
        if (this.queryStr.sort) {
            const sortBy: string = (this.queryStr.sort as string).split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        return this;
    }

    fields(): this {
        if (this.queryStr.fields) {
            const fields: string = (this.queryStr.fields as string).split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    pagination(): this {
        const page: number = (this.queryStr.page as number) || 1;
        const limit: number = (this.queryStr.limit as number) || 20;
        const skip: number = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

export { APIFeatures }