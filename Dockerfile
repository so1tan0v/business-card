# Builder
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

RUN npm run build

# Runner
FROM httpd:alpine AS runner

COPY --from=builder /app/dist /usr/local/apache2/htdocs
EXPOSE 80

CMD ["apachectl", "-D", "FOREGROUND"]