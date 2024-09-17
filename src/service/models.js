// models.js
export class User {
    constructor(id, firstName, lastName, email, token) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.token = token;
    }
}

export class Profile {
    constructor(firstName, lastName, email, createdAt) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.createdAt = createdAt;
    }
}
