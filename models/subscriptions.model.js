import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,//remove empty space
        minLength:2,
        maxLength:50
    },
    price: {
        type: Number,
        required: [true, 'Subscription Price is required'],
        min: [0, 'Price must be greater than 0']
    },
    currency:{
        type: String,
        enum: ['SLR', 'USD', 'EUR', 'GBP'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily','weekly','monthly','yearly']
    },
    category:{
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true
    },
    paymentMethod:{
        type: String,
        required: true,
        trim: true,
    },
    status:{
        type: String,
        enum:['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate:{
        type:Date,
        required: true,
        validate: {
            validator: (value) => value < new Date(),
            message: 'Start date must be in the past'
        }
    },
    renewalDate:{
        type:Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, {timestamps: true});

// Auto-calculate renewal date if missing
subscriptionSchema.pre('save',function (next) {
    if (!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency])
    }

    //update status
    if (this.renewalDate < new Date()){
        this.status = 'expired'
    }

    next();
})