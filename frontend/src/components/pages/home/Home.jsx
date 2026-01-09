import React, { useState, useEffect } from 'react';
import SideNav from './sidenav/SideNav';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../slice/slice';


const Home = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(getAllUsers()); // call all users only for admin
    }
  }, [dispatch, user]);

  const handelSideNavShow = () => setShowSideNav(true);
  const handelSideNavNotShow = () => setShowSideNav(false);

  const handelClick = () => setShowSideNav(true);
  const handelCancel = (e) => {
    e.stopPropagation();
    setShowSideNav(false);
  };

  return (
    <div className='flex size-full'>
      <div
        className={`fixed w-80 h-full shadow-[0px_10px_15px_#0002_inset] duration-100 ${showSideNav ? "left-0" : "-left-70"}`}
        onClick={handelClick}
        onMouseEnter={handelSideNavShow}
        onMouseLeave={handelSideNavNotShow}
      >
        <SideNav
          toggle={toggle}
          setToggle={setToggle}
          handelCancel={handelCancel}
          showSideNav={showSideNav}
        />
      </div>
      <div className={`grow perspective-[1800px] bg-black/10 h-full duration-100 ${showSideNav ? "ml-80 max-md:hidden" : "ml-10 max-md:block"}`}>
        <div
          className={`size-full transform-3d duration-700`}
          style={{ transform: toggle ? "rotateY(360deg)" : "rotateY(0deg)" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
