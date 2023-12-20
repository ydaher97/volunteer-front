import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";

import { useAuth } from '../../providers/authCotext';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';

import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Sidebar = () => {
  const { token, removeToken } = useAuth();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = React.useState(!isMobile); 
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };

  const handleMobileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setAnchorEl(null);
  };

  const renderBottomNavigation = () => {
    if (isMobile) {
      return (
        <BottomNavigation style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1000 , background:'rgb(231 231 234)'}}>
          <BottomNavigationAction label="User Profile" icon={<PersonIcon />} component={Link} to={`/users/${token}`} />
          <BottomNavigationAction label="Map" icon={<MapIcon />} component={Link} to="/map" />
          <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to="/" />
          <BottomNavigationAction label="Calendar" icon={<EventIcon />} component={Link} to="/calendar" />
        </BottomNavigation>
      );
    }
    return null;
  };

  const renderMobileMenu = (
    <Menu  anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMobileMenuClose}>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <div  style={{backgroundColor:'rgb(231 231 234)'}}>
      {isMobile ? (
        <div>
          <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
            <IconButton onClick={handleMobileMenuOpen}>
              <MenuIcon />
            </IconButton>
            {renderMobileMenu}
          </div>
          {renderBottomNavigation()}
        </div>
      ) : (
        <Drawer className={styles.drawer} variant="permanent" sx={{ width: open ? '240px' : '60px', flexShrink: 0 ,background:'rgb(231 231 234)'}}>
          <div style={{backgroundColor:'rgb(231 231 234)'}}>
            <IconButton onClick={handleDrawerOpen}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <List >
            <ListItem button component={Link} to={`/users/${token}`} sx={{ padding: '10px', display: open ? 'flex' : 'none' }}>
              <ListItemIcon sx={{ fontSize: '1.8rem' }}>
                <PersonIcon sx={{ fontSize: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="User Profile" primaryTypographyProps={{ fontSize: '1.2rem' }} />
            </ListItem>
            <ListItem button component={Link} to={'/map'} sx={{ padding: '10px', display: open ? 'flex' : 'none' }}>
              <ListItemIcon sx={{ fontSize: '1.8rem' }}>
                <MapIcon sx={{ fontSize: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Map" primaryTypographyProps={{ fontSize: '1.2rem' }} />
            </ListItem>
            <ListItem button component={Link} to="/" sx={{ padding: '10px', display: open ? 'flex' : 'none' }}>
              <ListItemIcon sx={{ fontSize: '1.8rem' }}>
                <HomeIcon sx={{ fontSize: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Home" primaryTypographyProps={{ fontSize: '1.2rem' }} />
            </ListItem>
            <ListItem button component={Link} to="/calendar" sx={{ padding: '10px', display: open ? 'flex' : 'none' }}>
              <ListItemIcon sx={{ fontSize: '1.8rem' }}>
                <EventIcon sx={{ fontSize: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Calendar" primaryTypographyProps={{ fontSize: '1.2rem' }} />
            </ListItem>
            <ListItem button onClick={handleLogout} sx={{ padding: '10px', display: open ? 'flex' : 'none' }}>
              <ListItemIcon sx={{ fontSize: '1.8rem' }}>
                <LogoutIcon sx={{ fontSize: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '1.2rem' }} />
            </ListItem>
          </List>
        </Drawer>
      )}
    </div>
  );
};

export default Sidebar;
