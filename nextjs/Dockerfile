FROM node:20-alpine

WORKDIR /app

# Prevent interactive prompts
ENV CI=true

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
