import { API } from "../../Backend";
//categories calls

//CREATE: category 
export const createCategory=(userId,token,category)=>{
    return fetch(`${API}/category/create/${userId}`,  
    {
        method:"POST",
        headers:{
            Accept:"aplication/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    }
    ).then(response=>{
        return response.json()
    })
    .catch(error=>console.log("error found"))
}

//get all category
export const getAllCategory=()=>{
    return fetch(`${API}/categories`,
    {
        method:"GET"
    }).then(response=>{
        return response.json()
    }).catch(error=>{
        return console.log(error)
    })
}

// get a category
export const getCategory=(categoryId)=>{
    return fetch(`${API}/category/${categoryId}`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    }).catch(error=>console.log(error))
}

//update category
export const UpdateCategory=(categoryId,userId,token,category)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"put",
        headers:{
            Accept:"aplication/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    }).then(response=>{
        return response.json
    }).catch(error=>console.log(error))
}

//delete category

export const deleteCategory=(categoryId,userId,token)=>{
    return fetch (`${API}/category/${categoryId}/${userId}`,{
        method:"delete",
        headers:{
            Accept:"aplication/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    })
    .then(response=>{
        return response.json()
    })
    .catch(error=>{console.log(error)})
}


//PRODUCT calls

//create product
export const createProduct=(userId,token,product)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    }).then(response=>{
        return response.json();
    }).catch(error=>{
        return console.log(error)
    })
}

//getAllProduct

export const getAllProduct=()=>{
    return fetch(`${API}/products`,{
        method:"GET",
    }).then(response=>{
        return response.json();
    }).catch(error=>{
        return console.log(error)
    })
}

//get a Product

export const getProduct=(productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET",
    }).then(response=>{
        return response.json()
    }).catch(error=>{
        return console.log(error)
    })
}

//update prodcuct
export const updateProduct=(productId,userId,token,product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    }).then(response=>{
        return response.json();
    }).catch(error=>{
        return console.log(error)
    })
}

// delete prodcut
export const deleteProduct=(productId,userId,token)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{  
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(response=>{
        return response.json();
    }).catch(error=>{
        return console.log(error)
    })
}