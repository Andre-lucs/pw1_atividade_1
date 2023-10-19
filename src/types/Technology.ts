import { UUID } from "crypto";

type Technologies = {
    id: UUID,
    title : String,
    studied : Boolean,
    deadline : Date,
    created_at: Date
};

export default Technologies;