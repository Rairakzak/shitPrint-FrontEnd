import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectProductDetails } from "../../store/productDetails/selectors";
import { BeatLoader } from "react-spinners";
import greyshirt from "../../images/grey-folded-t-shirt.jpg";
import whiteshirt from "../../images/folded-white.jpg";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";
import { postOrderProductItem } from "../../store/orderproductitem/actions";

const ProductDetail = ({ productId, onClose }) => {
  const productDetails = useSelector(selectProductDetails);
  const token = useSelector(selectToken);
  // const user = useSelector(selectUser);

  const [logInAsk, setlogInAsk] = useState(false);
  const [check, setCheck] = useState(false);
  // Selet items
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useDispatch();
  const addOrderHandler = () => {
    if (token) {
      if (size && color && type) {
        dispatch(
          postOrderProductItem({
            size,
            color,
            type,
            quantity: 1,
            productId,
          })
        );
        setSize("");
        setColor("");
        setType("");
        onClose();
      } else {
        setCheck(true);
      }
    } else {
      setlogInAsk(true);
    }
  };

  // shirt chose
  function isOdd(num) {
    return num % 2;
  }
  const shirtbg = isOdd(productDetails?.id) ? whiteshirt : greyshirt;

  return (
    <section className="productDetails">
      {productDetails === null ? (
        <div style={{ margin: "0 auto" }}>
          <BeatLoader />
        </div>
      ) : (
        <>
          <div className="closebtn" onClick={onClose}>
            x
          </div>
          <div
            className="image "
            loading="lazy"
            style={{ backgroundImage: `url(${shirtbg})` }}>
            <img src={productDetails.imageurl} alt="" loading="lazy" />
          </div>
          <div className="details">
            <div className="product-info">
              <h1>Title {productDetails.title}</h1>
              <h2>Designer: {productDetails.designer?.name}</h2>
              <p>Tag: {productDetails.tags}</p>
              <h3> Description:</h3>
              <p> {productDetails.description}</p>
            </div>
            <div className="typeselector">
              <label htmlFor="type">Type</label>

              <select
                id="type"
                style={{
                  border: type.length < 1 && check ? "1px solid red" : "",
                  color: type.length < 1 && check ? " red" : "",
                }}
                value={type}
                onChange={(e) => setType(e.target.value)}>
                <option value="" disabled>
                  Select
                </option>
                <option value="Short-sleeves">Short Sleeves</option>
                <option value="Hoodies">Hoodies</option>
                <option value="Long-sleeves">Long sleeves</option>
                <option value="Raglan-sleeves">Raglan Sleeves</option>
              </select>
            </div>
            <div className="colorselector">
              <label htmlFor="color">Color</label>
              <select
                id="color"
                value={color}
                style={{
                  border: color.length < 1 && check ? "1px solid red" : "",
                  color: color.length < 1 && check ? " red" : "",
                }}
                onChange={(e) => setColor(e.target.value)}>
                <option value="" disabled>
                  Select
                </option>
                <option value="White">White</option>
                <option value="Grey">Grey</option>
                <option value="Black">Black</option>
                <option value="Red">Red</option>
                <option value="Orange">Orange</option>
                <option value="Yellow">Yellow</option>
              </select>
            </div>
            <div className="sizeselector">
              <label htmlFor="size">size</label>
              <select
                style={{
                  border: size.length < 1 && check ? "1px solid red" : "",
                  color: size.length < 1 && check ? " red" : "",
                }}
                id="color"
                value={size}
                onChange={(e) => setSize(e.target.value)}>
                <option value="" disabled>
                  Select
                </option>
                <option value="XS">Xs</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div className="price-add">
              <button type="submit" onClick={addOrderHandler}>
                + <FiShoppingCart />
              </button>
              <h1> € {productDetails.cost + productDetails.addedcost}</h1>
            </div>
            {logInAsk ? (
              <div className="loginwarn">
                <h3>
                  *Your are not signed in: Please
                  <Link to="/user/login"> LOG IN </Link> or
                  <Link to="/user/signup"> SIGN UP </Link> first.
                </h3>
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default ProductDetail;
