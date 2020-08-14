module.exports = function timestamp(schema) {

    // Add the fields to the schema
    schema.add({
        createdAt: Date
    });

    // Create a pre-save hook
    schema.pre('save', function (next) {
        let now = Date.now();

        if (!this.createdAt) {
            this.createdAt = now;
        }
        // Call the next function in the pre-save chain
        next();
    });
};