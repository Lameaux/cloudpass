# CloudPass - Password Vault in the Cloud

LastPass clone using JAM stack

## MongoDB Setup

Create unique index for `email` on `users`:

`db.users.createIndex( { email: 1 }, { unique: true } )`
