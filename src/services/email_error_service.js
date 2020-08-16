let EmailError = require('../model/email_error_schema');
const { pick } = require('../helpers/objects');

class EmailErrorService {

    async readMany(query, options) {
        return EmailError.find(query)
            .limit(+options.limit || 10)
            .skip(+options.offset)
            .sort(options.sort);
    }

    async readOne(_id) {
        return EmailError.findOne({ _id });
    }

    async createOne(body) {
        return EmailError.create(body);
    }

    async createMany(body) {
        return EmailError.insertMany(body);
    }

    async updateOne(_id, body) {
        const newData = pick(body, ['code', 'command', 'type', 'msg', 'request_body']);

        return EmailError.findOneAndUpdate(
            { _id },
            newData,
            { useFindAndModify: false, new: true },
        );
    }

    async updateMany(body) {
        const newData = pick(body.updatingFields, ['code', 'command', 'type', 'msg', 'request_body']);

        const { nModified } = (await EmailError.updateMany(
            body.filter, // find criteria
            newData, // changing data
        ));

        return (nModified > 0);
    }

    async deleteOne(_id) {
        const { deletedCount } = (await EmailError.deleteOne({ _id }));

        return (deletedCount > 0);
    }

    async deleteMany(ids) {
        const { deletedCount } = (await EmailError.deleteMany({ _id: { $in: ids } }));

        return (deletedCount > 0);
    }

}

module.exports = new EmailErrorService();