export default class MongoDao {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  async create(documentToCreate: any) {
    try {
      const createdDocument = await this.model.create(documentToCreate);

      return createdDocument;
    } catch (err) {
      console.log("Error creating document", err);
    }
  }

  async update(filter: any, updateData: any) {
    try {
      const updatedDocument = await this.model.updateOne(filter, updateData);
      console.log(updatedDocument);
      return updatedDocument;
    } catch (err) {
      console.log("Error updating document", err);
    }
  }

  async getAll() {
    try {
      const allDocuments = await this.model.find();

      return allDocuments;
    } catch (err) {
      console.log("Error getting all documents", err);
    }
  }

  async getById(id: any) {
    try {
      const document = await this.model.findById(id);

      return document;
    } catch (err) {
      console.log("Error getting document by id", err);
    }
  }

  async getByFilter(filters: any) {
    try {
      const document = await this.model.findOne(filters).lean();

      return document;
    } catch (err) {
      console.log("Error getting document by filters", err);
    }
  }

  async delete(id: any) {
    try {
      const deletedDocument = await this.model.deleteOne(id);

      return deletedDocument;
    } catch (err) {
      console.log("Error creating document", err);
    }
  }
}
