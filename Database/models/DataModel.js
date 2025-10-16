import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    name: { type:String, required: true },
    department: { type:String, required: true },
    phone: { type:String, required: true },
    mail: { type:String, required: true },
});

const DataModel = mongoose.models.DataModel || mongoose.model('DataModel', dataSchema);

export default DataModel;