import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../db/db.js";

// prevent UUID and ID being sent in response.

// class User extends Model {}

const User = sequelize.define(
  "users",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    role: {
      type: Sequelize.STRING,
      default: "standard",
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

// HERE: http://sequelize.org/master/manual/model-basics.html#taking-advantage-of-models-being-classes

// HERE HERE HERE
/*

// Middlware - HashPass
UserSchema.pre("save", async function () {
  // console.log(this.password)
  //// returns value that are being modified during save/update PATCHes
  //console.log(this.modifiedPaths());
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// Add JWT creation method to UserSchema
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_LIFETIME}`,
  });
};
// Add password comparison method to UserSchema
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
// HERE HERE HERE
*/

export default User;

/*

class User extends Model {
  static classLevelMethod() {
    return 'foo';
  }
  instanceLevelMethod() {
    return 'bar';
  }
  getFullname() {
    return [this.firstname, this.lastname].join(' ');
  }
}
User.init({
  firstname: Sequelize.TEXT,
  lastname: Sequelize.TEXT
}, { sequelize });

console.log(User.classLevelMethod()); // 'foo'
const user = User.build({ firstname: 'Jane', lastname: 'Doe' });
console.log(user.instanceLevelMethod()); // 'bar'
console.log(user.getFullname()); // 'Jane Doe'

*/
