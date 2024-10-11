
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants";
import { Ingredient } from "@prisma/client";

// 5:56:00
export const getAll = async (): Promise<Ingredient[]> => {
    const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);
    return data
}

