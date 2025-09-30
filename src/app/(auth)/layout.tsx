import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
import { headers } from 'next/headers'
import React from 'react'

const layout = async({children}:{children:React.ReactNode}) => {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(session){
        redirect("/")
    }
  return (
    <div>{children}</div>
  )
}

export default layout