import { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
  Button,
  Stack,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Head from "next/head";

const heroBg = "/images/cook.jpg";

export default function LandingPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const aboutRef = useRef(null);

  const toggleDrawer = (state) => () => setOpen(state);

  const goTo = (target) => {
    setOpen(false);
    if (target === "page4") router.push("/page4");
    else if (target === "page5") router.push("/page5");
    else if (target === "about") {
      // smooth scroll to “Your kitchen, everywhere.”
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Box
        sx={{
          fontFamily: "'Poppins', sans-serif",
          backgroundColor: "#FFE9F0"
        }}
      >
        {/* ===== Top Bar ===== */}
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: "#FFE9F0",
            boxShadow: "none",
            borderBottom: "1px solid #F3D9E2"
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: "#B23A48", fontWeight: 600 }}
            >
              🍰 Cooklet
            </Typography>
            <IconButton edge="end" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: "#B23A48" }} />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* ===== Slide Menu Drawer ===== */}
        <Drawer
          anchor="right"
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: 260,
              backgroundColor: "#FAE4EE",
              color: "#555"
            }
          }}
        >
          <Box sx={{ textAlign: "right", p: 2 }}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon sx={{ color: "#E57391" }} />
            </IconButton>
          </Box>

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => goTo("page5")}>
                <ListItemText primary="Log in" />
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <LoginIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => goTo("page4")}>
                <ListItemText primary="Create an Account" />
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <EditIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => goTo("about")}>
                <ListItemText primary="About us" />
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <InfoIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        {/* ===== HERO Section ===== */}
        <Box
          sx={{
            height: "90vh",
            background: `url(${heroBg}) center/cover no-repeat`,
            position: "relative",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.45)"
            }}
          />
          <Stack spacing={2} sx={{ zIndex: 1, px: 2, maxWidth: 600 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              A shared home for the recipes we love.
            </Typography>
            <Typography variant="body1">
              Cook, save, and share because every recipe has a story.
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={2} sx={{ pt: 2 }}>
              <Button
                variant="contained"
                onClick={() => goTo("page4")}
                sx={{
                  bgcolor: "#fff",
                  color: "#333",
                  borderRadius: "25px",
                  px: 3,
                  "&:hover": { bgcolor: "#f0f0f0" }
                }}
              >
                Create an Account
              </Button>
              <Button
                variant="outlined"
                onClick={() => goTo("page5")}
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  borderRadius: "25px",
                  px: 3,
                  "&:hover": { borderColor: "#eee", color: "#eee" }
                }}
              >
                Login
              </Button>
            </Stack>
            <Typography variant="caption" sx={{ color: "#fff", pt: 1 }}>
              More about our site ↓
            </Typography>
          </Stack>
        </Box>

        {/* ===== Section 1 ===== */}
        <Container ref={aboutRef} sx={{ py: 8 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Your kitchen, everywhere.
              </Typography>
              <Typography sx={{ color: "#555" }}>
                Collect and enjoy recipes anytime, whether they’re family
                treasures or new discoveries.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/create.png"
                alt="create"
                sx={{
                  width: "100%",
                  borderRadius: "25px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }}
              />
            </Grid>
          </Grid>
        </Container>

        {/* ===== Section 2 ===== */}
        <Container sx={{ py: 8 }}>
          <Grid
            container
            spacing={4}
            alignItems="center"
            sx={{ flexDirection: { xs: "column", md: "row-reverse" } }}
          >
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                A home for recipes you can share, search, and enjoy together.
              </Typography>
              <Typography sx={{ color: "#555" }}>
                Find inspiration in others’ kitchens while keeping your own
                recipes safe and easy to share.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/search.png"
                alt="share"
                sx={{
                  width: "100%",
                  borderRadius: "25px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }}
              />
            </Grid>
          </Grid>
        </Container>

        {/* ===== Section 3 ===== */}
        <Container sx={{ py: 8 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                From your pantry to the community’s recipes.
              </Typography>
              <Typography sx={{ color: "#555" }}>
                Keep track of what’s in your kitchen and search through all
                recipes to discover dishes you can cook right now.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/dashboard.png"
                alt="dashboard"
                sx={{
                  width: "100%",
                  borderRadius: "25px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }}
              />
            </Grid>
          </Grid>
        </Container>

        {/* ===== Footer ===== */}
        <Box sx={{ py: 4, textAlign: "center", bgcolor: "#fff" }}>
          <Typography variant="body2" sx={{ color: "#555" }}>
            © {new Date().getFullYear()} Cooklet. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
