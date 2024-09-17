import { ApiResponse } from "@/types/Types";
import axios from "axios";

export async function ApiResponseHandler(title: string): Promise<string[]> {
  try {
    const res: ApiResponse = await axios.post("/api/generatetag", { title });

    if (res && res.data && res.data.tags) {
      return res.data.tags;
    } else {
      return Promise.reject(new Error("No tags found in the response."));
    }
  } catch (error) {
    const errorMessage = "Failed to fetch tags. Please try again.";

    console.error("Error in ApiResponseHandler:", errorMessage);

    return Promise.reject(new Error(errorMessage));
  }
}
