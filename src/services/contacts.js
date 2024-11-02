import ContactCollection from "../db/models/Contacts.js";

export const getAllContacts = async() => {
    const contacts = await ContactCollection.find();
  return contacts;
};

export const getContactsById = async(contactId) => {
    const contact = await ContactCollection.findById(contactId);
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
