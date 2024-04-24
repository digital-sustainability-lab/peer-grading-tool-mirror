FROM node:18 as backendBuild
LABEL stage=build

COPY backend/ /backend

WORKDIR /backend

RUN npm install && npm run build

FROM node:18 as frontendBuild
LABEL stage=build

COPY frontend/ /frontend

WORKDIR /frontend

RUN npm install && npm run build

FROM node:18 as prod

COPY --from=backendBuild /backend/dist /dist

COPY --from=backendBuild /backend/node_modules/ /dist/node_modules

COPY --from=frontendBuild /frontend/dist /frontend

WORKDIR /dist

CMD ["node", "/dist/main.js"]
