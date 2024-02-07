import  mongoose, { model }  from 'mongoose';

export interface User extends mongoose.Document {
username: string;
email: string;
location: string;
recipes: string[];
posts: string[];

}

const userSchema = new mongoose.Schema<User>(
{
    username: String,
    location: String,
    posts: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
    },
    ],
    recipes: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipe',
    },
    ],
},
{
    toJSON: {
    virtuals: true,
    },
    id: false,
}
);

const User = model('user', userSchema);

module.exports = User;
