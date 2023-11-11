import { getUser } from "@/stores/user";
import axios, { type AxiosInstance } from "axios";
//https://www.jstoolset.com/jwt
export const useAxiosRequestWithToken = (token?:string) : AxiosInstance  =>{
    const useAxios: AxiosInstance = axios.create({
        baseURL               : "http://213.136.74.84:50/api/",
        headers   : {
          "Content-type"      :   "application/json",
          "X-Requested-With"  :   "XMLHttpRequest",
          "Authorization"     :   `Bearer ${getUser()?.token as string}`
        },
      })
      return useAxios
}

export const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3JlZ2lzdGVyIiwiaWF0IjoxNjk4ODQzNjEwLCJleHAiOjE3MDA2NTgwMTAsIm5iZiI6MTY5ODg0MzYxMCwianRpIjoibmFXeHQ0VWlFYW0xeDBuYyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YM-CrzHoZ7Bk15bXK5db5WAm-vW_UZPjJ93rzSzmwLM"

const categories = [
  { "CategoryID": 1, "CategoryName": "Beverages" },
  { "CategoryID": 2, "CategoryName": "Condiments" },
  { "CategoryID": 3, "CategoryName": "Confections" },
  { "CategoryID": 4, "CategoryName": "Dairy Products" },
  { "CategoryID": 5, "CategoryName": "Grains/Cereals" },
  { "CategoryID": 6, "CategoryName": "Meat/Poultry" },
  { "CategoryID": 7, "CategoryName": "Produce" },
  { "CategoryID": 8, "CategoryName": "Seafood" }
];

export { categories as categoriesData };

const products = [
  { "Numero": 1, "ProductName": "Tea", "CategoryID": 1, "QuantityPerUnit": "10 boxes x 20 bags", "UnitPrice": 18.0, "UnitsInStock": 39, "Discontinued": false },

  { "Numero": 7, "ProductName": "Dried Pears", "CategoryID": 7, "QuantityPerUnit": "12 - 1 lb pkgs.", "UnitPrice": 30.0, "UnitsInStock": 15, "Discontinued": false },

];

export { products as productsData };
