import { auth } from "@/lib/auth";
import db from "@/lib/db"
import { headers } from "next/headers";

export const currentUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session?.user?.id){
        return null;
    }
    try {
        const user = await db.user.findUnique({
            where:{
                id : session.user.id
            },
            select:{
                id:true,
                name:true,
                email:true,
                image:true,
                createdAt:true,
                updatedAt:true
            }
        })
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};