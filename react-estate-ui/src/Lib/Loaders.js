import { apiRequest } from "./Apirequest"

export const singlepageloader =async({request,params})=>{
    const res=await apiRequest.get("post/"+params.id)
    return res.data
}

export const listpageloader =async({request,params})=>{
    const query=request.url.split("?")[1]
   const res=await apiRequest.get("post?"+query)
    return res.data
   // console.log(res.data)
}


export const profilepageloader =async({request,params})=>{
  
   const res=await apiRequest.get("/post/profile/post")
    return res.data
   // console.log(res.data)
}