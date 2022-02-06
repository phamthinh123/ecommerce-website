import { CKEditor } from "ckeditor4-react";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  addProductToFirestore,
  deleteProductFromFirestore,
  editProductInFirestore,
  fetchProducts,
  fetchData,
} from "../../redux/Product/product.action";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Test from "../../assets/dia-su-chu-nhat-bon-mua-hoa-la-1.jpg";
import "./style.scss";
import Modal from "../../components/Modal";
function AdminPage(props) {
  const [modal, setModal] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const dispatch = useDispatch();

  // const products = useSelector((state) => state.product.products);

  const data = useSelector((state) => state.product.data);

  useEffect(() => {
    dispatch(fetchData());
  }, []);
  const addProduct = ({ title, des, price, img, category }) => {
    dispatch(addProductToFirestore({ title, des, price, img, category }));
  };
  const editProductByID = ({ idEdit, title, des, price, img, category }) => {
    dispatch(
      editProductInFirestore({ idEdit, title, des, price, img, category })
    );
  };
  const deleteProduct = (id) => {
    dispatch(deleteProductFromFirestore(id));
  };
  const openModalEdit = (id) => {
    openModal();
    setIdEdit(id);
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setIdEdit("");
  };

  const loadMore = () => {
    if (data !== undefined) {
      dispatch(fetchData(data.lastVisible, data.listProduct));
    }
  };
  const numberFormat = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="adminPage">
      <div>
        <button className="buttonAdd" onClick={openModal}>
          Thêm sản phẩm mới
        </button>
      </div>
      <div className="manageProduct">
        <table className="table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Thể loại</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data !== undefined &&
              data.listProduct.length !== 0 &&
              data.listProduct.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>
                      {product.img && (
                        <img src={product.img} alt="Ảnh sản phẩm" />
                      )}
                    </td>
                    <td>{product.title}</td>
                    <td>{numberFormat.format(product.price)}</td>
                    <td>{product.category}</td>
                    <td>
                      <div className="wrap">
                        <div>
                          <EditIcon
                            className="editIcon"
                            onClick={() => openModalEdit(product.id)}
                          />
                        </div>
                        <div>
                          <DeleteIcon
                            className="deleteIcon"
                            onClick={() => deleteProduct(product.id)}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {data !== undefined && !data.isLastPage && (
          <button onClick={loadMore} className="btnLoadMore">
            Tải thêm
          </button>
        )}
      </div>
      {modal && (
        <Modal
          addProduct={addProduct}
          editProductByID={editProductByID}
          modal={modal}
          closeModal={closeModal}
          idEdit={idEdit}
        />
      )}
    </div>
  );
}

export default AdminPage;
