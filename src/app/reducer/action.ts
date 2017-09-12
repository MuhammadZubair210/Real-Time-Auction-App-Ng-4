// export const UserType = {
//     User: "User",
// }

// let tmpArr = [];
// for (var key in UserType) {
//     tmpArr.push(UserType[key])
// }
// export const UserTypeArr = tmpArr;

interface UserModel {
    name: String,
    email: String,
    password: String,
    type: String
}
export default UserModel;
