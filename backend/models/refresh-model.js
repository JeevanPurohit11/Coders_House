const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const refreshSchema= new Schema(
    {
        token : {type : string , required : true},
        userId : { type : Schema.Types.ObjectId , ref : 'user'},
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Refresh',refreshSchema,'tokens');
