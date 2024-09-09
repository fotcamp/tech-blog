FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME 0.0.0.0

EXPOSE 3000

CMD ["node", "-r", "./.pnp.cjs", "./.next/standalone/server.js"]