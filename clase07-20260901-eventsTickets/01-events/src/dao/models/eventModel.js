import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
        date: { type: Date, required: true },
        location: { type: String, required: true, trim: true },
        capacity: { type: Number, required: true, min: 1 },
        price: { type: Number, default: 0, min: 0 },
        status: { type: String, enum: ['draft', 'published', 'cancelled', 'finished'], default: 'draft' },
        organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    },
    { timestamps: true }
)

export const EventModel = mongoose.model('Event', eventSchema)