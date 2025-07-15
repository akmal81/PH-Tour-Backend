import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./tour.interface";
import { number} from "zod";


const tourTypeSchema = new Schema<ITourType>({
name:{type:String, required:true, unique:true}
},{timestamps:true})

export const ToureType = model<ITourType>("ToureType", tourTypeSchema)

const tourSchema = new Schema<ITour>({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, },
    images: { type: [String], default: [] },
    location: { type: String },
    costFrom: { type: number },
    startDate: { type: Date },
    endDate: { type: Date },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    tourPlan: { type: [String], default: [] },
    maxGuest: { type: number },
    minAge: { type: number },
    division: {
        type: Schema.Types.ObjectId,
        ref:"Division",
        required:true
    },
    tourType: {
        type: Schema.Types.ObjectId,
        ref:ToureType,
        required:true
    }
},
    {
        timestamps: true
    })

   export const Tour = model<ITour>("Tour", tourSchema)