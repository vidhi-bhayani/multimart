import React,{useRef,useEffect} from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import "./header.css";

import {motion} from "framer-motion";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";


const nav__links = [
  {
    path:"home",
    display: 'Home'
  },
  {
    path:"shop",
    display: 'Shop'
  },
  {
    path:"cart",
    display: 'Cart'
  },
];

const Header = () => {

  const hederRef = useRef(null);
  const totalQuantity = useSelector(state=> state.cart.totalQuantity);
  const profileActionRef = useRef(null)
  useEffect(() => {
    profileActionRef.current.classList.
    add("profile__actions");
  },[])
  // let ji = false;
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const {currentUser} = useAuth()

  const stickyHeaderFunc = ()=>{
    window.addEventListener('scroll', ()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        hederRef.current.classList.add('sticky__header')
      } else{
        hederRef.current.classList.remove('sticky__header')
      }
    });
  };

  const logout = ()=>{

    signOut(auth).then(()=>{
      toast.success('Logged out');
      navigate("/home");
    }).catch(err=>{
        toast.error(err.message);
    })

  }

  useEffect(()=>{
      stickyHeaderFunc()

      return ()=> window.removeEventListener('scroll',stickyHeaderFunc)
  });

  const menuToggle = ()=> menuRef.current.classList.
  toggle("active__menu");

  const navigateToCart =()=> {
     navigate("/cart");
  };
let ki = true;
  const toggleProfileActions = (io)=> { 
    
    // if(ki){
    //   ki= false
    //   console.log(ki)
    // }else{
    //   ki= true
    //   console.log(ki)
    // }
    if(io){
      profileActionRef.current.classList.
      remove("show__profileActions");
      profileActionRef.current.classList.
      add("profile__actions");
      ki = true
    }else{
      if(ki){
        profileActionRef.current.classList.
        add("show__profileActions")
        profileActionRef.current.classList.
        remove("profile__actions")
       ki=false
      }else{
        profileActionRef.current.classList.
        remove("show__profileActions")
        profileActionRef.current.classList.
        add("profile__actions")
        ki = true
      }
    }
    // if(ki){
    // profileActionRef.current.classList.
    // add("show__profileActions")
    // }else{
    //   profileActionRef.current.classList.
    // remove("profile__actions")
    // }
  }

  return <header className="header" ref={hederRef}>
    <Container>
      <Row>
        <div className="nav__wrapper">
          <div className="logo">
            <img src={logo} alt="logo" />
            <div>
              <h1>Multimart</h1>
            </div>
          </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index)=>(
                    <li className="nav__item" key={index}>
                  <NavLink to={item.path} className={(navclass)=> navclass.isActive ? '.nav__active' : ''}>{item.display}</NavLink>
                </li>
                  ))}
               </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">2</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

              <div className="profile">
              
                 <motion.img whileTap={{scale: 1.2 }} 
                src={currentUser? currentUser.photoURL : userIcon} alt="" 
                onClick={() =>toggleProfileActions(false)}
                />
                {/* style={ji ? {display:"block"} : {display:"none"}} */}
                {/* className="profile__actions"  */}
                <div 
                ref={profileActionRef} 
                onClick={() =>toggleProfileActions(true)}>
                  { currentUser ? 
                    <span onClick={logout}>Logout</span> 
                    : 
                    <div className="d-flex align-items-center justify-content-center flex-lg-column">   
                      <Link to='/signup'>Signup</Link>
                      <Link to='/login'>Login</Link>
                      <Link to='/dashboard'>Dashboard</Link>
                    </div>
                    }
                </div>
              </div>
              <div className="mobile__menu">
              <span onClick={menuToggle}>
                <i className="ri-menu-line"></i></span>
            </div>
            </div>

            
          </div>
        </Row>
    </Container>
  </header>
};

export default Header;
