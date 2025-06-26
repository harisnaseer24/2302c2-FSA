import Product from "../models/product.mjs"

const getAllProducts=async(req,res)=>{
try {
    const products= await Product.find();
if(products.length > 0){
    res.json({msg:"Showing our products!", myproducts:products})   
}else{   
    res.status(404).json({msg:"No products found"})
}  
} catch (error) {
    res.status(500).json({msg:error})
}
}
// single product details
const getProduct=async(req,res)=>{
try {
    const id= req.params.id;
    const product= await Product.findOne({_id:id});
if(product){
    res.json({msg:"Product Found!", products:product})
   
}else{
    res.status(404).json({msg:"No product found"})
} 
} catch (error) {
    res.status(500).json({msg:error})
}}

//adding a product in db
const addProduct=async(req,res)=>{

try {
    // let {title,description, price} = req.body
    let newProduct = {
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        discountPercentage:req.body.discountPercentage,
        rating:req.body.rating,
        brand:req.body.brand,
        category:req.body.category,
        stock:req.body.stock,
        images:[req.body.images],
    }
    const addProduct = await Product.insertOne(newProduct);
if(addProduct){
    res.json({msg:"Product added successfully!", addedProduct:addProduct})
    
}else{
    res.status(404).json({msg:"Failed to add product right now, try again"})
}
} catch (error) {
    res.status(500).json({msg:error})
}}
const controller= {getAllProducts, addProduct,getProduct}
export default controller