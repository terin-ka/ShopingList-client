import { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userProvider";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  CircularProgress,
} from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import LanguageIcon from '@mui/icons-material/Language';
import i18n from "../i18n";
import { ListOverviewContext } from '../contexts/listOverview.provider';

export default function Header() {
  const { userList, loggedInUser, setLoggedInUser , isLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
  const anchorRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Změna jazyka
    setCurrentLanguage(lng);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Stack 
          direction="row"
          alignItems="center"
          sx={{ width: "100%", justifyContent: "space-between" }} // Přidána mezera
        >
          <Stack onClick={() => {navigate(`/overview`);}} direction="row" alignItems="center">
            <LocalFloristIcon sx={{ display: { md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer", // Nastavení kurzoru na šipku
              }}
            >
              ShopList
            </Typography>
          </Stack>
          <Stack direction="row">
            <Button

              color="inherit"
              aria-label="change language"
              sx={{ ml: "auto", mr: 2 }}
              onClick={() => changeLanguage(currentLanguage === "en" ? "cs" : "en")} // Přepnutí mezi 'en' a 'cs'
            >
              <Typography>{currentLanguage.toUpperCase()}</Typography>
              <LanguageIcon />
            </Button>

            <Button
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: "auto" }}
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {loggedInUser ? loggedInUser.name : "LOGIN" }
              </Typography>
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        {userList.map((user) => (
                          <MenuItem
                            key={user._id}
                            onClick={(event) => {
                              localStorage.setItem("loggedInUser", JSON.stringify({ _id: user._id, name: user.name }));
                              setLoggedInUser({ _id: user?._id, name: user?.name });
                              handleClose(event);
                            }}
                          >
                            {user.name}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
