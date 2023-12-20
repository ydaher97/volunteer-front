import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from '../../providers/authCotext';

 const Navbar = () => {
	const { token,  removeToken } = useAuth();
	console.log(token)


	
    const handleLogout = () => {
		removeToken();
		window.location.reload();
	};

	  

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				
				<Link to={`/users/${token}`}><button>User Profile</button></Link>
				<Link to={'/'}><button>home</button></Link>
				<Link to={`/calendar`}><button>calendar</button></Link>


			</nav>

		</div>
	);
}

export default Navbar