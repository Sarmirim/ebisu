FROM golang:1.16-alpine as build
WORKDIR /src/
COPY . /src
RUN GO111MODULE=on CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /src/out/ebisu .

FROM scratch
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=build /src/assets /assets
COPY --from=build /src/resources /resources
COPY --from=build /src/out/ebisu /
ENTRYPOINT ["./ebisu"]