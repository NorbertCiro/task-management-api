#!/bin/bash

# Variables
REPO_URL="https://github.com/NorbertCiro/task-management-api" # Reemplaza con la URL del repositorio Git
FRONTEND_DIR="front-api" # Reemplaza con el directorio del frontend en el proyecto
BACKEND_DIR="back-api" # Reemplaza con el directorio del backend en el proyecto

# Clonar el repositorio
# echo "Clonando el repositorio..."
# git clone "$REPO_URL" proyecto-clon
# cd proyecto-clon || { echo "No se pudo entrar en el directorio del proyecto"; exit 1; }

# Inicializar Docker Compose
echo "Inicializando Docker Compose..."
docker compose up -d || { echo "No se pudo iniciar Docker Compose"; exit 1; }
# sleep 30

# Instalar dependencias del frontend
if [ -d "$FRONTEND_DIR" ]; then
  echo "Instalando dependencias del frontend..."
  cd "$FRONTEND_DIR" || { echo "No se pudo entrar en el directorio del frontend"; exit 1; }
  npm install || { echo "No se pudieron instalar las dependencias del frontend"; exit 1; }
  echo "Iniciando el frontend..."
  npm run dev & # Ejecutar en segundo plano
  FRONTEND_PID=$! # Obtener el PID del proceso del frontend
  # sleep 10
  cd ..
else
  echo "Directorio del frontend no encontrado."
fi

# Instalar dependencias del backend
if [ -d "$BACKEND_DIR" ]; then
  echo "Instalando dependencias del backend..."
  cd "$BACKEND_DIR" || { echo "No se pudo entrar en el directorio del backend"; exit 1; }
  npm install || { echo "No se pudieron instalar las dependencias del backend"; exit 1; }
  echo "Iniciando el backend..."
  npm start || { echo "No se pudo iniciar el backend"; exit 1; }
  cd ..
else
  echo "Directorio del backend no encontrado."
fi

# Opcional: Esperar a que los servicios se inicien completamente
echo "Esperando a que los servicios se inicien..."
# sleep 10 # Ajusta el tiempo de espera según sea necesario

# Opcional: Puedes finalizar el proceso del frontend después de que Docker Compose esté iniciado si es necesario
kill $FRONTEND_PID

echo "Proceso completado."
