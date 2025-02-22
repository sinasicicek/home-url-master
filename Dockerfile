
# Node.js temel imajını kullan
FROM node:20-alpine

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kaynak kodlarını kopyala
COPY . .

# Uygulamayı derle
RUN npm run build

# Uygulamayı başlat
CMD ["npm", "run", "dev"]

# Port 8080'i dışarıya aç
EXPOSE 8080
