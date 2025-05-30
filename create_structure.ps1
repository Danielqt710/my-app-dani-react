# Script para crear estructura base React

cd src

# Crear carpetas
$folders = @(
  "assets",
  "components",
  "components\Navbar",
  "pages",
  "pages\Home",
  "pages\About",
  "services",
  "utils",
  "hooks",
  "context",
  "styles",
  "routes"
)

foreach ($folder in $folders) {
  if (-not (Test-Path $folder)) {
    mkdir $folder
  }
}

# Crear archivos vacíos
$files = @(
  "styles\global.css",
  "components\Navbar\Navbar.jsx",
  "components\Navbar\Navbar.module.css",
  "pages\Home\Home.jsx",
  "pages\Home\Home.module.css",
  "pages\About\About.jsx",
  "pages\About\About.module.css",
  "services\firebase.js",
  "utils\validateEmail.js",
  "hooks\useAuth.js",
  "context\AuthContext.jsx",
  "routes\AppRoutes.jsx"
)

foreach ($file in $files) {
  if (-not (Test-Path $file)) {
    New-Item -Path $file -ItemType File | Out-Null
  }
}
