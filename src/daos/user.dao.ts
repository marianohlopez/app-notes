import { UserModel } from "../models/user.model";
import MongoDao from "./mongo.dao";

let instance: any

export default class UserMongoDao extends MongoDao {
  constructor() {
    super(UserModel);
  }
  static getInstance() {
    if (!instance) instance = new UserMongoDao();

    return instance;
  }
}

