import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import "./Navbar_btn.css";
// import brand from "../images/logo.jpg";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../redux/userRedux";
import { clearCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  background-color: #cbdce8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 1.5em;
  font-family: serif;
  color: #21212a;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Button = styled.button`
  border-radius: 40px;
  padding: 10px;
  margin-left: 10px;
  font-size: 13px;
  width: 89px;
  border: black;
  height: 37px;
  background-color: #f7e8e2;
  cursor: pointer;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    // localStorage.removeItem("persist:root");
    localStorage.clear();
    // e.preventDefault();
    dispatch(clearCart());
    dispatch(Logout());
    // console.log("Logout triggered");
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Logo>
              <Link to="/">
                SafeShop
                {/* <a href="/" rel="noopener noreferrer">
                <img src={brand} alt="logo" style={{ fontSize: '37rem', height: '2.5rem', display: 'flex' }}/>
              </a> */}
              </Link>
            </Logo>
          </Left>
          <Right>
            {/* {localStorage.getItem("persist:root" || null) ? ( */}
            {currentUser ? (
              <Link to="/">
                <Button className="logout_btn" onClick={handleLogout}>
                  LOGOUT
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <button className="btn"> REGISTER </button>
                </Link>
                <Link to="/login">
                  <button className="btn">SIGN IN</button>
                </Link>
              </>
            )}
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
