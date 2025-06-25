FROM node:22.16.0-alpine AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY nest-cli.json .
COPY src ./src

RUN npm ci --no-audit --no-fund

RUN npm run build

FROM node:22.16.0-alpine

WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
COPY --from=build /app/dist /app/src

RUN npm ci --no-audit --no-fund --omit=dev

RUN rm -rf .npmrc
RUN rm -rf package.json
RUN rm -rf package-lock.json

EXPOSE 3000

CMD ["node", "src/main.js"]