import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast

const Add = ({ url, token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  
  const handleFileChange = (setter, file) => {
    setter(file);
  };
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);
      
      const response = await axios.post(`${url}/api/product/add`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      
      if (response.data.success) {
        // Use toast for success message from backend
        toast.success(response.data.message);
        
        // Reset only the fields shown in the screenshot
        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        // Use toast for error message from backend
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleSizeChange = (size) => {
    setSizes(prevSizes => 
      prevSizes.includes(size)
        ? prevSizes.filter(item => item !== size)
        : [...prevSizes, size]
    );
  };
  
  return (
    <form className="flex flex-col w-full items-start gap-8 px-4 sm:px-8 py-6" onSubmit={onSubmitHandler}>
      {/* Upload Image Section */}
      <div>
        <p className="mb-2 text-lg font-medium">Upload Images</p>
        <div className="flex flex-wrap gap-4">
          {[setImage1, setImage2, setImage3, setImage4].map((setter, idx) => (
            <label key={idx} htmlFor={`image${idx + 1}`} className="cursor-pointer">
              <img
                className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 hover:border-blue-500 transition-all duration-300"
                src={
                  [image1, image2, image3, image4][idx]
                    ? URL.createObjectURL([image1, image2, image3, image4][idx])
                    : assets.upload_area
                }
                alt=""
              />
              <input
                onChange={(e) => handleFileChange(setter, e.target.files[0])}
                type="file"
                id={`image${idx + 1}`}
                hidden
                accept="image/*"
              />
            </label>
          ))}
        </div>
      </div>
      
      {/* Product Name & Description */}
      <div className="w-full flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-1/2">
          <p className="mb-2 text-lg font-medium">Product Name</p>
          <input
            className="w-full max-w-[500px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="name"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="w-full sm:w-1/2">
          <p className="mb-2 text-lg font-medium">Product Description</p>
          <textarea
            className="w-full max-w-[500px] px-4 py-2 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="description"
            placeholder="Write product description here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Product Category & Sub Category */}
      <div className="w-full flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-1/2">
          <p className="mb-2 text-lg font-medium">Product Category</p>
          <select
            className="w-full max-w-[500px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="w-full sm:w-1/2">
          <p className="mb-2 text-lg font-medium">Sub Category</p>
          <select
            className="w-full max-w-[500px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="subCategory"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
      </div>
      
      {/* Product Price */}
      <div className="w-full">
        <p className="mb-2 text-lg font-medium">Product Price</p>
        <input
          className="w-full sm:w-[120px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          name="price"
          placeholder="25"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      {/* Product Sizes & Bestseller Checkbox */}
      <div className="w-full flex flex-col gap-6">
        <div>
          <p className="mb-2 text-lg font-medium">Product Sizes</p>
          <div className="flex gap-3">
            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <p 
                key={size}
                className={`py-2 px-4 rounded-full border cursor-pointer transition-all duration-300 ${
                  sizes.includes(size) ? 'bg-blue-500 text-white border-blue-500' : 'bg-slate-200 text-gray-800 hover:bg-slate-300'
                }`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="bestseller"
            name="bestseller"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            checked={bestseller}
            onChange={(e) => setBestseller(e.target.checked)}
          />
          <label htmlFor="bestseller" className="cursor-pointer text-base">
            Add to bestseller
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full sm:w-auto px-10 py-3 mt-4 text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-300"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;