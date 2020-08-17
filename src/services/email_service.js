let Email = require('../model/email_schema');
const { pick } = require('../helpers/objects');

class EmailService {

    async readMany(query, options) {
        return Email.find(query)
            .limit(+options.limit || 10)
            .skip(+options.offset)
            .sort(options.sort);
    }

    async readOne(_id) {
        return Email.findOne({ _id });
    }

    async createOne(body) {
        return Email.create(body);
    }

    async createMany(body) {
        return Email.insertMany(body);
    }
    /*
        async updateOne(_id, body) {
            const newData = pick(body, ['from', 'to', 'text', 'html', 'subject']);
    
            return Email.findOneAndUpdate(
                { _id },
                newData,
                { useFindAndModify: false, new: true },
            );
        }
    
        async updateMany(body) {
            const newData = pick(body.updatingFields, ['from', 'to', 'text', 'html', 'subject']);
    
            const { nModified } = (await Email.updateMany(
                body.filter, // find criteria
                newData, // changing data
            ));
    
            return (nModified > 0);
        }
    */
    async deleteOne(_id) {
        const { deletedCount } = (await Email.deleteOne({ _id }));

        return (deletedCount > 0);
    }

    async deleteMany(ids) {
        const { deletedCount } = (await Email.deleteMany({ _id: { $in: ids } }));

        return (deletedCount > 0);
    }

}

module.exports = new EmailService();