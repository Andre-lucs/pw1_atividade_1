import { UUID } from "crypto";
import Technologies from "./Technology";

type User = {
    id : UUID,
    username : String,
    name : String,
    technologies : Technologies[]
};

export default User;