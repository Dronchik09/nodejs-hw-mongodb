import ContactCollection from "../db/models/Contacts.js";

import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async({page = 1, perPage = 10, sortBy = "_id", sortOrder = "asc", filter = {},}) => {
  const query = ContactCollection.find();

  if(filter.userId){
    query.where("userId").equals(filter.userId);
  }

  const skip = (page - 1) * perPage;
    const data = await ContactCollection.find().skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
    const totalItems = await ContactCollection.countDocuments();
    const paginationData = calculatePaginationData({totalItems, page, perPage});
  return {
    data,
    ...paginationData,
  } ;
};

export const getContactsById = async(id) => {
    const contact = await ContactCollection.findById(id);
  return contact;
};

export const addContact = payload => ContactCollection.create(payload);

export const updateContact = async ({_id, payload, options={}}) =>{
  const rawResult = await ContactCollection.findOneAndUpdate({_id}, payload,
    {...options,
      new:true,
      includeResultMetadata: true,
    });
    if(!rawResult || !rawResult.value) return null;

  return{
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
};
};

export const deleteContact = async filter =>{
  return ContactCollection.findOneAndDelete(filter);
};
