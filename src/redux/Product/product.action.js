import { firestore } from "../../firebase/utils";
import { productConstant } from "./product.constant";
export const addProductToFirestore =
  ({ title, des, price, img, category }) =>
  async (dispatch) => {
    const sizes = ["XL", "L", "M", "XM", "LX"];
    const timestamp = new Date();
    // const numberFormat = new Intl.NumberFormat("vi-VN", {
    //   style: "currency",
    //   currency: "VND",
    // });
    // const priceFormat = numberFormat.format(price);
    const productRef = firestore.collection("products");
    const numberPrice = parseInt(price);
    try {
      await productRef.add({
        title,
        des,
        price: numberPrice,
        img,
        sizes,
        category,
        createdAt: timestamp,
      });

      dispatch(fetchProducts());
      dispatch(fetchData());
    } catch (err) {}
  };
export const editProductInFirestore =
  ({ idEdit, title, des, price, img, category }) =>
  async (dispatch) => {
    // const numberFormat = new Intl.NumberFormat("vi-VN", {
    //   style: "currency",
    //   currency: "VND",
    // });

    // const priceFormat = numberFormat.format(price);
    const productRef = firestore.collection("products").doc(idEdit);
    try {
      await productRef.update({
        title,
        des,
        price,
        img,
        category,
      });

      dispatch(fetchProducts());
      dispatch(fetchData());
    } catch (err) {}
  };
export const deleteProductFromFirestore = (id) => async (dispatch) => {
  firestore.collection("products").doc(id).delete();

  dispatch(fetchProducts());
  dispatch(fetchData());
};

export const fetchProducts = () => async (dispatch) => {
  const productRef = firestore
    .collection("products")
    .orderBy("createdAt", "desc");

  await productRef
    .get()
    .then((snap) => {
      return [
        ...snap.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }),
      ];
    })
    .then((res) => {
      dispatch(setProducts(res));
    });
};
export const setProducts = (products) => {
  return {
    type: productConstant.SET_PRODUCTS,
    payload: products,
  };
};
export const fetchData =
  (
    lastVisible,
    data = [],
    productsPerPage = 3,
    category = "all",
    orderPrice = "none",
    min = 0,
    max = 999999999,
    firstProduct = null
  ) =>
  async (dispatch) => {
    let productRef = firestore.collection("products");
    if (orderPrice !== "none") {
      productRef = productRef
        .orderBy("price", orderPrice)
        .where("price", ">=", parseInt(min))
        .where("price", "<=", parseInt(max));
      // .limit(productsPerPage);
    } else {
      productRef = productRef.orderBy("createdAt", "desc");

      // .limit(productsPerPage);
    }
    let isFirstPage = false;
    if (lastVisible !== undefined) {
      isFirstPage = false;
      productRef = productRef.startAfter(lastVisible).limit(productsPerPage);
    } else {
      productRef = productRef.limit(productsPerPage);
      isFirstPage = true;
    }
    if (firstProduct !== null) {
      productRef = productRef
        .endBefore(firstProduct)
        .limitToLast(productsPerPage);
      isFirstPage = false;
    } else {
    }
    let title;
    if (category === "kitchen") {
      title = "Đồ dùng nhà bếp";
    } else if (category === "decoration") {
      title = "Trang trí nhà cửa";
    } else {
      title = "Tất cả sản phẩm";
    }
    if (category !== "all") {
      productRef = productRef.where("category", "==", title);
    }

    await productRef
      .get()
      .then((snap) => {
        const lastVisible = snap.docs[snap.docs.length - 1];
        const firstProduct = snap.docs[0];

        return {
          lastVisible,
          firstProduct,
          isLastPage: snap.docs.length < productsPerPage,
          isFirstPage,
          listProduct: [
            ...data,
            ...snap.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            }),
          ],
        };

        // [
        //   ...snap.docs.map((doc) => {
        //     return {
        //       id: doc.id,
        //       ...doc.data(),
        //     };
        //   }),
        // ];
      })
      .then((res) => {
        dispatch(setData(res));
      });
  };
export const setData = (data) => {
  return {
    type: productConstant.SET_DATA,
    payload: data,
  };
};
export const fetchProduct = (id) => async (dispatch) => {
  const productRef = firestore.collection("products").doc(id);

  await productRef
    .get()
    .then((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    })

    .then((res) => {
      dispatch(setProduct(res));
    });
};
export const setProduct = (product) => {
  return {
    type: productConstant.SET_PRODUCT,
    payload: product,
  };
};
