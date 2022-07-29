class Tasks {
    constructor(id, name, status, createdAt, updatedAt, expiredAt) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.expiredAt = expiredAt;
    }
}

module.exports = { Tasks };
