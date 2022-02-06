import { CKEditor } from "ckeditor4-react";
import { useState, useEffect, useRef } from "react";
import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
function Modal({ addProduct, editProductByID, modal, closeModal, idEdit }) {
  const products = useSelector((state) => state.product.products);
  const editProduct = products.find((product) => product.id === idEdit);
  const [title, setTitle] = useState(() => {
    if (editProduct) {
      return editProduct.title;
    } else {
      return "";
    }
  });
  const [price, setPrice] = useState(() => {
    if (editProduct) {
      // return Number(
      //   editProduct.priceFormat
      //     .slice(0, editProduct.priceFormat.length - 1)
      //     .replaceAll(".", "")
      // );
      return editProduct.price;
    } else {
      return 0;
    }
  });
  const [des, setDes] = useState("");
  const [img, setImage] = useState(() => {
    if (editProduct) {
      return editProduct.img;
    } else {
      return "";
    }
  });
  const [category, setCategory] = useState(() => {
    if (editProduct) {
      return editProduct.category;
    } else {
      return "Tất cả";
    }
  });
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (modal && ref.current && !ref.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [modal]);
  const resetForm = () => {
    setTitle("");
    setPrice(0);
    setImage("");
    setDes("Tất cả");
    setCategory("");
  };
  return (
    <div className="modal">
      <div className="wrap" ref={ref}>
        <form className="form">
          <h3 className="form__title">
            {editProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          </h3>
          <label htmlFor="title" className="label">
            Tên sản phẩm
          </label>
          <input
            name="title"
            id="title"
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
          <label htmlFor="des" className="label">
            Mô tả
          </label>
          <CKEditor
            name="des"
            id="des"
            value={editProduct ? editProduct.des : des}
            onChange={(evt) => setDes(evt.editor.getData())}
          />
          <label htmlFor="price" className="label">
            Giá
          </label>
          <input
            name="price"
            id="price"
            type="number"
            min={0}
            max={10000000}
            step={1000}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            className="input"
          />
          <label htmlFor="image" className="label">
            Ảnh sản phẩm
          </label>
          <input
            name="image"
            id="image"
            type="url"
            value={img}
            onChange={(e) => setImage(e.target.value)}
            className="input"
          />
          <label htmlFor="category" className="label">
            Loại
          </label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Đồ dùng nhà bếp">Đồ dùng nhà bếp</option>
            <option value="Trang trí nhà cửa">Trang trí nhà cửa</option>
          </select>

          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              if (editProduct) {
                resetForm();
                closeModal();
                editProductByID({ idEdit, title, des, price, img, category });
              } else {
                resetForm();
                closeModal();
                addProduct({ title, des, price, img, category });
              }
            }}
          >
            {editProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
