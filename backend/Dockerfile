FROM node:18-alpine

WORKDIR /app

# Copia apenas package.json e package-lock.json primeiro
COPY package*.json ./

# Instala dependências
RUN npm install --production

# Copia o restante do código
COPY . .

# Cria volumes para uploads e logs (opcional)
VOLUME ["/app/uploads", "/app/app.log"]

EXPOSE 4000
CMD ["node", "index.js"]
