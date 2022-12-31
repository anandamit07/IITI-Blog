import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context';
import './topbar.css'
import logo from '../../assets/logo.png'
export default function TopBar() {
    const {user, dispatch} = useContext(Context);
    const PF = "http://localhost:5000/images/"
    const handleLogout = () =>{
        dispatch({type: "LOGOUT"});
    };
  return (
    <div className='top'>
        <div className="topLeft">
            <Link className='link' to={'/'}><span className='topIcon' style={{color:'#FF4545', fontSize:'15px'}}>IITI BLOGS</span></Link>
            <i className="topIcon fa-brands fa-square-facebook fa-lg"></i>
            <i className="topIcon fa-brands fa-square-twitter fa-lg"></i>
            <a href='https://www.instagram.com/amit.anand.07/' target='_blank'><i className="topIcon fa-brands fa-square-instagram fa-lg"></i></a>
            <a href='https://www.linkedin.com/in/amit-anand-iiti/' target='_blank'><i className="topIcon fa-brands fa-linkedin fa-lg"></i></a>
        </div>
        <div className="topCenter">
            <ul className='topList'>
                <li className='topListItem'><Link className='link' to={"/"}>HOME</Link></li>
                <li className='topListItem'><Link className='link' to={"/about"}>ABOUT</Link></li>
                <li className='topListItem'><Link className='link' to={"/contact"}>CONTACT</Link></li>
                <li className='topListItem'><Link className='link' to={"/write"}>WRITE</Link></li>
                <li className='topListItem' onClick={handleLogout}>{user && "LOGOUT"}</li>
            </ul>
            
        </div>
        <div className="topRight">
            {
                user ? (<> 
                <Link to={'/settings'}>
                    <img className='topImg' src={user.profilePic?user.profilePic:"https://wallpaperaccess.com/full/4595683.jpg"} alt="" />
                </Link>
                <i className="topSearchIcon fa-solid fa-magnifying-glass fa-lg"></i>
                </>)
                :
                (<ul className='topList'>
                    <li className="topListItem"><Link className='link' to={"/login"}>LOGIN</Link></li>
                    <li className="topListItem"><Link className='link' to={"/register"}>REGISTER</Link></li>
                </ul>)
            }
            
        </div>
    </div>
  )
}

