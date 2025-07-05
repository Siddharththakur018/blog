const contact = require('../model/contactModel');

const submitContact = async(req,res) => {
    try {
    const {inquiryPurpose, descriptionType, fullName, email, organization, phoneNumber, message} = req.body;

    const newContact = new contact({
        inquiryPurpose, descriptionType, fullName, email, organization, phoneNumber, message
    }) 

    await newContact.save();

    res.status(200).json("Form Submitted Sucessfully");
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

const getAllContacts = async(req,res) => {
    try {
        const contacts = await contact.find().sort({createdAt: -1});
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const dropdownOptions = async(req,res) => {
    try {
        const inquiryOption = contact.schema.path('inquiryPurpose').enumValues;
        const desciptionOption = contact.schema.path('descriptionType').enumValues;

        res.status(200).json({
            inquiryOption,
            desciptionOption
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {submitContact, getAllContacts, dropdownOptions}