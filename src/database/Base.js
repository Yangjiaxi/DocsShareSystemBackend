import { Schema } from "mongoose";

export class RepositoryBase {
  constructor(model) {
    this.model = model;
  }

  create(item) {
    return new this.model(item);
  }

  insert(item) {
    return this.model.create(item);
  }

  createAndInsert(item) {
    return this.insert(this.create(item));
  }

  query(condition) {
    return this.model.find(condition);
  }

  queryById(id) {
    return this.model.findById(id);
  }

  update(condition, upgrade) {
    return this.model.findOneAndUpdate(condition, upgrade, { new: true });
  }

  updateById(id, upgrade) {
    return this.model.findByIdAndUpdate(id, upgrade, { new: true });
  }

  pushById(id, newItem) {
    return this.model.findByIdAndUpdate(id, { $push: newItem }, { new: true });
  }

  pullById(id, deleteItem) {
    return this.model.findByIdAndUpdate(
      id,
      { $pull: deleteItem },
      { new: true },
    );
  }

  delete(condition) {
    return this.model.findOneAndDelete(condition);
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  count(condition) {
    return this.model.countDocuments(condition);
  }
}

export const createSchema = (definition, withId = true) =>
  new Schema(definition, {
    versionKey: false,
    _id: withId,
  });
