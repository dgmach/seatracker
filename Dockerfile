FROM mhart/alpine-node:12 AS builder
WORKDIR /app
COPY . .
RUN yarn add react-scripts@3.4.1
RUN yarn run build


FROM mhart/alpine-node
RUN yarn install
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 80
CMD ["serve", "-p", "80", "-s", "."]