var keystone = require('keystone');

var User = new keystone.List('User');

User.add({
    displayName: { type: String },
    email: { type: keystone.Field.Types.Email, unique: true },
    password: { type: keystone.Field.Types.Password },
    // author: { type: Types.Relationship, ref: 'User' }, //single author for User
    // categories: { type: Types.Relationship, ref: 'PostCategory', many: true }
});

//TODO: Allows all users to access to keystone
User.schema.virtual('canAccessKeystone').get(function () {
    return true;
});
// `User.defaultColumns = 'id, displayName, email';`
User.register();
