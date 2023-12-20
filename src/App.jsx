import { Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import Navbar from './pages/navbar/navbar';
import SignupPage from "./pages/signup/signupPage";
import LoginPage from "./pages/login/loginPage";
import UserProfile from "./pages/userProfilePage/UserProfile";
import HomePage from "./pages/homePage/HomePage";
import { Children, useEffect } from "react";
import OrganizationPage from "./pages/organizationPage/OrganizationPage";
import CalenderPage from "./pages/calendarPage/CalenderPage";
import Sidebar from "./pages/navbar/SideBar";
import MapPage from "./pages/mapPage/MapPage";
// import {createTheme ,ThemeProvider} from '@mui/material'
// import { CssBaseline } from "@mui/material";
import { ThemeProvider } from './providers/SwitchProvider';

function App() {

	const user = localStorage.getItem("token");
	// const [modeColor, setModeColor] = useState("dark");
    // const theme = createTheme({
    //     palette: {
    //         mode: modeColor,
    //         primary: modeColor === "dark" ? orange : deepPurple,
    //     },
    // });
    // const handleChange = () => {
    //     setModeColor((prevMode) => (prevMode === "light" ? "dark" : "light"));
    // };

	return (
		<>
		
			
		{user && <Sidebar/>}
		<Routes>
			<Route path="/signup" element={<SignupPage />} />
			<Route exact path="/login" element={<LoginPage />} />
  
			{!user && <Route path="*" element={<Navigate replace to="/login" />} />}
			
		{user &&<Route>

			  <Route path="/"  element={<HomePage />} />
			  <Route path="/calendar"  element={<CalenderPage />} />
			  <Route path="/map"  element={<MapPage />} />

			
			 <Route path="/users/:id" element={<UserProfile />} />
			 <Route path="/users/:userId/organization/:ordId" element={<OrganizationPage />} />
  
		</Route> }
		
		
	  </Routes>
	  
	  </>
	);

}

export default App
