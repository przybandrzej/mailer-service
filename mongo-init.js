function getEnvValue(envVar) {
    let ret = run("sh", "-c", `printenv ${envVar} >/tmp/${envVar}.txt`);
    if (ret != 0) throw Error(`Environment ${envVar} is not set. Aborting...`);
    return cat(`/tmp/${envVar}.txt`).trim();
}

db.auth(getEnvValue("MONGO_INITDB_ROOT_USERNAME"), getEnvValue("MONGO_INITDB_ROOT_PASSWORD"));
db = db.getSiblingDB(getEnvValue("MAILER_DATABASE"));

db.createUser({
    user: getEnvValue("MAILER_USERNAME"),
    pwd: getEnvValue("MAILER_PWD"),
    roles: [
        {
            role: "readWrite",
            db: getEnvValue("MAILER_DATABASE")
        }
    ]
});