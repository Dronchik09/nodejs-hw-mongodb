import ContactCollection from "../db/models/Contacts.js";

import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async({page = 1, perPage = 10, sortBy = "_id", sortOrder = "asc", filter = {},}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const query = ContactCollection.find({ userId: filter.userId || undefined });

  if(filter.userId){
    query.where('userId').equals(filter.userId);
  }
  const contactsCount = await ContactCollection.find(
    query.getFilter(),
  ).countDocuments();

  const contacts = await query
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (_id, userId) => {
  const contact = await ContactCollection.findOne({ _id, userId });
  return contact;
};

export const addContact = payload => ContactCollection.create(payload);

export const updateContact = async ({_id, payload, userId, options={}}) =>{
  const rawResult = await ContactCollection.findOneAndUpdate({_id, userId}, payload,
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

export const deleteContact = async (_id, userId) =>{
  const contact = await ContactCollection.findOneAndDelete({
    _id,
    userId,
  });
  return contact;
};
